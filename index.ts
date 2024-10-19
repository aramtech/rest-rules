import fs from "fs";
const env = (await import("$/server/env.js")).default;
const path = await import("path");

// rules
import { local_log_decorator } from "$/server/utils/log/index.js";
import ObjectError from "../ObjectError/index.js";

import type { ModulesType } from "$/server/modules/index.js";
import root_paths from "../../dynamic_configuration/root_paths.js";
import { resolve_ts } from "../common/index.js";
import { t as _t } from "../internationalization/index.js";
import type { GeneralOptions, MultirulesFunction, RuleName, RuleSetterParameters, RuleValidationParameters } from "./multirules.js";
const log = await local_log_decorator("rule utility", "yellow", true, "Info");

let client = null as null | ModulesType;
export function set_client(client_instance) {
    client = client_instance;
}


log("starting Building");
const rules_modules = {} as {[key: string]: { new (...args: any[]): Rule }[]};
const rules_files_names = fs.readdirSync(path.join(root_paths.src_path, "utils", "rules", "rules"));
for (const rule_file_name of rules_files_names) {
    const index = rule_file_name.endsWith(".rules.js") ? rule_file_name.indexOf(".rules.js") : rule_file_name.indexOf(".rules.ts");
    if (index != -1) {
        rules_modules[rule_file_name.slice(0, index)] = (await import(resolve_ts(`./rules/${rule_file_name}`))).default;
    }
}
log("finished Building");
export type InternalGeneralOptions = (import("./multirules.js").GeneralOptions & { multirule: MultirulesFunction; });

export type Translate = (phrase: string) => string

export type Rule = {
    status_code?: number;
    recursive?: boolean;
    rule: (
        value: any,
        params: any[] | null,
        general_options: InternalGeneralOptions,
        t: Translate
    ) => (boolean | undefined) | Promise<(boolean | undefined)>;
    msg: (field: string, options: InternalGeneralOptions, t: Translate ) => string;
    set: (value: any, source_obj: {
        key: string; 
        obj: any; 
    })=>any; 
    client?: (ModulesType & {[key: string]: any}) | null
}
export type PassedRule = {
    status_code?: number;
    recursive?: boolean;
    rule: (
        value: any,
        general_options: InternalGeneralOptions,
        t: Translate
    ) => (boolean | undefined) | Promise<(boolean | undefined)>;
    msg: (field: string, options: InternalGeneralOptions, t: Translate ) => string;
    set: (value: any)=>any; 
    client?: (ModulesType & {[key: string]: any}) | null;
    [key: string]: any;
}



export interface Options {
    _rules: (RuleName | PassedRule)[];
    value: any;
    field_name: string;
    args?: RuleValidationParameters;
    source_obj?: RuleSetterParameters;
    recursive?: boolean;
    multirule?: MultirulesFunction | null;
    general_options?: import('./multirules.js').GeneralOptions | null;
}

export async function validate(
    _rules: (RuleName | PassedRule)[] | Options,
    value?: any,
    field_name?: string,
    args?: RuleValidationParameters,
    source_obj?: RuleSetterParameters,
    recursive: boolean = false,
    multirule: MultirulesFunction | null = null,
    general_options: GeneralOptions | null = null
): Promise<{
    msg: string;
    valid: boolean;
}> {
    const t = (phrase: string): string => {
        return _t(phrase, general_options?.lang) || phrase;
    };
    if (!Array.isArray(_rules)) {
        const options: Options = _rules;
        _rules = options._rules;
        value = options.value;
        field_name = options.field_name;
        args = options.args;
        source_obj = options.source_obj;
        recursive = !!options.recursive;
        multirule = options.multirule || null;
        general_options = options.general_options || null;
    }

    if (!general_options) {
        general_options = {}
    }
    const internal_general_options: InternalGeneralOptions = {
        ...general_options,
        multirule: multirule as any,
    }

    const rules = [] as (RuleName | PassedRule)[];
    if (
        typeof _rules == "string" ||
        (typeof _rules == "object" && !Array.isArray(_rules) && typeof (_rules as any)?.rule == "function" && typeof (_rules as any)?.msg == "function")
    ) {
        rules.push(_rules);
    } else if (Array.isArray(_rules)) {
        rules.push(..._rules);
    } else {
        throw new ObjectError({
            status_code: env.response.status_codes.server_error,
            error: {
                msg: t("invalid arguments at rule validation"),
                rules: _rules,
            },
        });
    }
    const required_validator = new rules_modules["required"][0]();
    required_validator.client = client;
    const is_value_empty = !(await required_validator.rule(value, args?.["required"] as any, internal_general_options, t));

    if (is_value_empty) {
        if (rules.includes("required")) {
            throw new ObjectError({
                status_code: env.response.status_codes.invalid_data,
                error: {
                    msg: await required_validator.msg(t(field_name || "Field"), internal_general_options, t),
                    name: `${t(field_name as any) || t("element")} ${t("is required")}`,
                    value,
                },
            });
        } else {
            return {
                msg: "",
                valid: true,
            };
        }
    } else {
        for (const rule of rules) {
            if (typeof rule == "string") {
                if (rules_modules[rule]) {
                    const rule_collection = rules_modules[rule];
                    for (const rule_class of rule_collection) {
                        const rule_validator = new rule_class(multirule) as Rule;
                        rule_validator.client = client as ModulesType;
                        if (rule_validator.recursive && recursive) {
                            throw new ObjectError({
                                status_code: env.response.status_codes.server_error,
                                error: {
                                    msg: "Recursive Conflict on recursive rule",
                                    rule: rule,
                                    value: value,
                                },
                            });
                        }
                        const valid = await rule_validator.rule(value, args?.[rule] as any, internal_general_options, t);
                        if (!valid) {
                            throw new ObjectError({
                                status_code: rule_validator.status_code || env.response.status_codes.invalid_data,
                                error: {
                                    msg: await rule_validator.msg(t(field_name as any) || "Field", internal_general_options, t),
                                    name: `${t(field_name as any) || t("element")} ${t("is not valid")}`,
                                    value,
                                    rule: rule,
                                },
                            });
                        }
                        if (rule_validator.set && source_obj?.[rule]?.key && source_obj?.[rule]?.obj) {
                            source_obj[rule].obj[source_obj[rule].key as any] = await rule_validator.set(value, source_obj[rule] as any);
                        }
                    }
                } else {
                    log.warning("rule not found", rule);
                }
            } else if (typeof rule == "object" && typeof rule.rule == "function" && typeof rule.msg == "function") {
                if (rule.recursive && recursive) {
                    throw new ObjectError({
                        status_code: env.response.status_codes.server_error,
                        error: {
                            msg: "Recursive Conflict on recursive rule",
                            rule: rule,
                            value: value,
                        },
                    });
                }
                const valid = await rule.rule(value, internal_general_options, t);
                if (!valid) {
                    throw new ObjectError({
                        status_code: rule.status_code || env.response.status_codes.invalid_data,
                        error: {
                            msg: await rule.msg(t(field_name as any) || "Field", internal_general_options, t),
                            name: `${t(field_name as any) || t("element")} ${t("is not valid")}`,
                            value,
                        },
                    });
                }
                if (rule.set) {
                    await rule.set(value);
                }
            } else {
                log("invalid rule, rule not found", rule);
            }
        }
        return { msg: "", valid: true };
    }
}

export default validate;

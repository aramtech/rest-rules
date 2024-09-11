import fs from "fs";
const env = (await import("$/server/env.js")).default;
const path = await import("path");

// rules
import { local_log_decorator } from "$/server/utils/log/index.js";
import ObjectError from "../ObjectError/index.js";

import { t as _t } from "../internationalization/index.ts";
import root_paths from "../../dynamic_configuration/root_paths.ts";

const log = await local_log_decorator("rule utility", "yellow", true, "info");

let client = null;
export function set_client(client_instance) {
    client = client_instance;
}

log("starting Building");
const rules_modules = {};
const rules_files_names = fs.readdirSync(path.join(root_paths.src_path, "utils", "rules", "rules"));
for (const rule_file_name of rules_files_names) {
    const index = rule_file_name.indexOf(".rules.js");
    if (index != -1) {
        rules_modules[rule_file_name.slice(0, index)] = (await import(`./rules/${rule_file_name}`)).default;
    }
}
log("finished Building");
/**
 * @typedef {(import("./multirules.js").GeneralOptions & {multirule: Function})} InternalGeneralOptions
 * 
 */

/**
 * @typedef {object} Options
 * @property {Array<import("./multirules.js").RuleName>} _rules
 * @property {*} value
 * @property {string} field_name
 * @property {import("./multirules.js").RuleValidationParameters} [args]
 * @property {import("./multirules.js").RuleSetterParameters} [source_obj]
 * @property {boolean} [recursive]
 * @property {Function} [multirule]
 * @property {import('./multirules.js').GeneralOptions} [general_options]
 */

/**
 *
 * @param {Options|Array<import("./multirules.js").RuleName>} _rules
 * @param {*} value
 * @param {string} field_name
 * @param {import("./multirules.js").RuleValidationParameters} args
 * @param {import("./multirules.js").RuleSetterParameters} source_obj
 * @param {boolean} [recursive]
 * @param {Function} [multirule]
 * @param {import('./multirules.js').GeneralOptions} [general_options]
 * @returns {Promise<{
 *      msg: string;
 *      value: boolean;
 * }>}
 */
async function validate(_rules, value, field_name, args, source_obj, recursive = false, multirule = null, general_options = null) {
    const t = (phrase) => {
        return _t(phrase, general_options?.lang);
    };
    if (arguments.length == 1) {
        /**
         * @type {Options}
         */
        const options = arguments[0];
        _rules = options._rules;
        value = options.value;
        field_name = options.field_name;
        args = options.args;
        source_obj = options.source_obj;
        recursive = options.recursive;
        multirule = options.multirule;
        general_options = options.general_options;
    }

    if(!general_options){
        general_options = {}
    }
    general_options = {
        ...general_options, 
        multirule,
    }

    const rules = [];
    if (
        typeof _rules == "string" ||
        (typeof _rules == "object" && !Array.isArray(_rules) && typeof _rules?.rule == "function" && typeof _rules?.msg == "function")
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
    const is_value_empty = !(await required_validator.rule(value, args?.["required"], general_options, t));

    if (is_value_empty) {
        if (rules.includes("required")) {
            throw new ObjectError({
                status_code: env.response.status_codes.invalid_data,
                error: {
                    msg: await required_validator.msg(t(field_name) || "Field", general_options, t),
                    name: `${t(field_name) || t("element")} ${t("is required")}`,
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
                        const rule_validator = new rule_class(multirule);
                        rule_validator.client = client;
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
                        const valid = await rule_validator.rule(value, args?.[rule], general_options, t);
                        if (!valid) {
                            throw new ObjectError({
                                status_code: rule_validator.status_code || env.response.status_codes.invalid_data,
                                error: {
                                    msg: await rule_validator.msg(t(field_name) || "Field", general_options, t),
                                    name: `${t(field_name) || t("element")} ${t("is not valid")}`,
                                    value,
                                    rule: rule,
                                },
                            });
                        }
                        if (rule_validator.set && source_obj?.[rule]?.key && source_obj?.[rule]?.obj) {
                            source_obj[rule].obj[source_obj[rule].key] = await rule_validator.set(value, source_obj[rule]);
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
                const valid = await rule.rule(value, args, general_options, t);
                if (!valid) {
                    throw new ObjectError({
                        status_code: rule.status_code || env.response.status_codes.invalid_data,
                        error: {
                            msg: await rule.msg(t(field_name) || "Field", general_options, t),
                            name: `${t(field_name) || t("element")} ${t("is not valid")}`,
                            value,
                        },
                    });
                }
                if (rule.set && source_obj?.key && source_obj?.obj) {
                    source_obj.obj[source_obj.key] = await rule.set(value, source_obj);
                }
            } else {
                log("invalid rule, rule not found", rule);
            }
        }
        return { msg: "", valid: true };
    }
}

export default validate;

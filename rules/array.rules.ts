import { recursive_select } from "../../common/index.js";
import type { InternalGeneralOptions, Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class array_validation_rule implements RuleBase{
    error_msg = "";
    msg(field = "Field", _globalOptions: InternalGeneralOptions, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid array")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }


    async rule(value: any, args: array_validator_parameters, general_options: import("../index.js").InternalGeneralOptions, t: Translate) {
        if (!Array.isArray(value)) {
            return false;
        } else {
            if (Array.isArray(args) && args.length) {
                return value.every((el) => args.includes(typeof el as any));
            } else if (typeof args == "object" && !Array.isArray(args)) {
                const options = args;

                if (Array.isArray(options.allowed_types) && options.allowed_types?.length) {
                    const allowed_types = options.allowed_types;
                    if (!value.every((el) => allowed_types.includes(typeof el as any))) {
                        this.error_msg =
                            `${t("there is invalid types in")} [field], ${t("expected types are")}: ` + String(allowed_types);
                        return false;
                    }
                }

                if (options.unique_values) {
                    const set = [...new Set(value)];
                    if (set.length != value.length) {
                        this.error_msg = `${t("there is duplicate values in")} [field]`;
                        return false;
                    }
                }

                if (options.apply_rules?.length) {
                    const _rules: import("../multirules.js").RuleArray[] = options.apply_rules;
                    await Promise.all(
                        value?.map(async (item, index) => {
                            const rules = [] as any[];
                            for (const rule of _rules) {
                                const rule_copy = [...rule];
                                if (typeof rule_copy[1] == "string") {
                                    rule_copy[1] = recursive_select(rule_copy[1], item);
                                } else {
                                    rule_copy[1] = item;
                                }
                                console.log("Rules Copy", rule, rule_copy);
                                rule_copy[2] = `item index ${index}: ${rule[2]}`;
                                rules.push(rule_copy);
                            }

                            await general_options.multirule(rules, general_options, true);
                        }),
                    );
                }
                return true;
            } else {
                return true;
            }
        }
    }
}

export type AllowedTypes = ("object" | "string" | "number" | "undefined")[];

export type ArrayValidationOptions = {
    allowed_types?: AllowedTypes;
    unique_values?: boolean;
    apply_rules?: import("../multirules.js").RuleArray[];
};

export type array_validator_parameters = AllowedTypes | ArrayValidationOptions;
export type array_setter_parameters = null;
export default [array_validation_rule];

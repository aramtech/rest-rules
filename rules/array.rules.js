import { recursive_select } from "../../common/index.js";

class array_validation_rule {
    error_msg = "";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid array`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }

    /**
     *
     * @param {*} value
     * @param {array_validator_parameters} args
     * @param {import("../index.js").InternalGeneralOptions} general_options
     * @returns
     */
    async rule(value, args, general_options) {
        if (!Array.isArray(value)) {
            return false;
        } else {
            if (Array.isArray(args) && args.length) {
                return value.every((el) => args.includes(typeof el));
            } else if (typeof args == "object") {
                const options = args;

                const allowed_types = options.allowed_types;
                if (Array.isArray(allowed_types) && allowed_types.length) {
                    if (!value.every((el) => allowed_types.includes(typeof el))) {
                        this.error_msg =
                            "there is invalid types in [field], expected types are: " + String(allowed_types);
                        return false;
                    }
                }

                if (options.unique_values) {
                    const set = [...new Set(value)];
                    if (set.length != value.length) {
                        this.error_msg = "there is duplicate values in [field]";
                        return false;
                    }
                }

                if (options.apply_rules?.length) {
                    /**
                     * @type {import("../multirules.js").RuleArray[]}
                     */
                    const _rules = options.apply_rules;
                    await Promise.all(
                        value?.map(async (item, index) => {
                            const rules = [];
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

/**
 * @typedef {Array<"object"|"string"|"number"|"undefined">} AllowedTypes
 */

/**
 * @typedef {{
 *  allowed_types?: AllowedTypes;
 *  unique_values?: boolean;
 *  apply_rules?: import("../multirules.js").RuleArray[]
 * }} ArrayValidationOptions
 */

/**
 * @typedef {AllowedTypes|ArrayValidationOptions} array_validator_parameters
 */
/**
 * @typedef {null} array_setter_parameters
 */
export default [array_validation_rule];

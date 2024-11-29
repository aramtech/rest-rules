import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class required_validation_rule implements RuleBase {
    rule(value: any) {
        if (typeof value == "object" && Array.isArray(value)) {
            if (value?.length == 0) {
                return false;
            } else {
                return true;
            }
        } else {
            if (typeof value === "undefined" || value === null || value === "" || Number.isNaN(value)) {
                return false;
            } else {
                return true;
            }
        }
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is Required")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

export type required_validator_parameters = null;
export type required_setter_parameters = null;
export default [
    // required
    required_validation_rule,
];

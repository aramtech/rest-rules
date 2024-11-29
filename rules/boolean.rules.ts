import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class boolean_validation_rule implements RuleBase {
    set(value: any) {
        if (parseInt(value) === 0 || parseInt(value) === 1) {
            return Boolean(parseInt(value));
        } else {
            return value;
        }
    }
    rule(value: any) {
        if (parseInt(value) === 0 || parseInt(value) === 1 || value === true || value === false) {
            return true;
        } else {
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid boolean")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

export type boolean_validator_parameters = null;
export interface boolean_setter_parameters {
    obj: Object;
    key: String;
}
export default [
    // boolean
    boolean_validation_rule,
];

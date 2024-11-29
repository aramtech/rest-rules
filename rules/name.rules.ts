import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class name_validation_rule implements RuleBase {
    rule(value: any, _, __, t: Translate) {
        try {
            return !!value.trim().match(/^(?:\p{Letter}{3,20})(?:\p{Z}{1,2}\p{Letter}{1,20}){1,3}$/iu);
        } catch {
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid name")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

export type name_validator_parameters = null;
export type name_setter_parameters = null;
export default [name_validation_rule];

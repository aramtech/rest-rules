import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

export class password_validation_rule implements RuleBase {
    rule(value: any) {
        try {
            return !!value.match(/^[a-zA-Z0-9_\-\!\@\#\$\%\^\&\*\(\)\+\<\>\.\?\,\;\|]{4,20}$/);
        } catch {
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid password")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

export type password_validator_parameters = null;
export type password_setter_parameters = null;
export default [password_validation_rule];

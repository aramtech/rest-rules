import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class username_validation_rule implements RuleBase {
    max_length = 250;
    rule(value: any) {
        try {
            return !!value.match(/^[a-zA-z_][a-zA-z0-9_\-]{3,}$/);
        } catch {
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid username")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

export type username_validator_parameters = null;
export type username_setter_parameters = null;
export default [username_validation_rule];

import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class url_validation_rule implements RuleBase {
    max_length = 250;
    rule(value: any) {
        try {
            return !!value.trim().match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/);
        } catch {
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid url")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

export type url_validator_parameters = null;
export type url_setter_parameters = null;
export default [url_validation_rule];

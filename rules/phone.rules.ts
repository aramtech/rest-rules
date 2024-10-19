import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class phone_validation_rule implements RuleBase {
    rule(value: any) {
        try {
            return !!value.trim().match(/^((\+|00)\s?\d{1,3}\s?)?(\(?\d{2,3}\)?)(\-|\s)?(\d{3}(\-|\s)?\d{4})$/);
        } catch {
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid Phone Number")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

export type phone_validator_parameters = null;
export type phone_setter_parameters = null;
export default [phone_validation_rule];

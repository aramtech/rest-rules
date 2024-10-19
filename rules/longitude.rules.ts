import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class longitude_validation_rule implements RuleBase {
    rule(value: any, _, __, t: Translate) {
        if (typeof value != "string" && typeof value != "number") {
            this.error_msg = t("Longitude must be either a string or number");
            return false;
        }
        const longitude = Number(value);
        if (!longitude) {
            this.error_msg = t("longitude must be a valid float number");
            return false;
        }
        if (longitude > 180 || longitude < -180) {
            this.error_msg = t("longitude must be between -180.0 and 180.0 degree");
            return false;
        }
        return true;
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid longitude")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

export type longitude_validator_parameters = null;
export type longitude_setter_parameters = null;
export default [longitude_validation_rule];

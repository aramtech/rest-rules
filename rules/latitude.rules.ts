import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class latitude_validation_rule implements RuleBase {
    rule(value: any, _, __, t: Translate) {
        if (typeof value != "string" && typeof value != "number") {
            this.error_msg = `${t("Latitude must be either a string or number")}`;
            return false;
        }
        const latitude = Number(value);
        if (!latitude) {
            this.error_msg = t("latitude must be a valid float number");
            return false;
        }
        if (latitude > 90 || latitude < -90) {
            this.error_msg = t("latitude must be between -90.0 and 90.0 degree");
            return false;
        }
        return true;
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid latitude")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

export type latitude_validator_parameters = null;
export type latitude_setter_parameters = null;
export default [latitude_validation_rule];

export { latitude_validation_rule };

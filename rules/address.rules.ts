import type { InternalGeneralOptions, Translate } from "../index.js";
import { RuleBase } from "./base.js";
class address_validation_rule implements RuleBase {
    error_msg = "";
    max = 2000;

    msg = (field: string = "Field", options: InternalGeneralOptions, t: Translate) => {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid address")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    };

    rule(value: any, params: null,  globalOptions: InternalGeneralOptions, t: Translate){
        if (typeof value != "string") {
            this.error_msg = "[field] must be a string";
            return false;
        }
        if (value.length > this.max) {
            this.error_msg = `[field] cant be longer then ${this.max}`;
            return false;
        }
        return true;
    }
}

export type address_validator_parameters = null;
export type address_setter_parameters = null;
export default [address_validation_rule];

import type { RuleBase } from "./base.js";

class address_validation_rule implements RuleBase{
    error_msg = "";

    values = [];
    allowed_case: hexadecimal_validator_parameters['allowed_characters'] = "Both";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid hexadecimal ${
                this.allowed_case == "LowerCase" || this.allowed_case == "UpperCase" ? this.allowed_case : ""
            } string`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }

    rule(value: any, params: hexadecimal_validator_parameters) {
        if (typeof value != "string") {
            this.error_msg = "[field] is not a string";
            return false;
        }
        if(!params){
            params = {}
        }
        if (!params?.allowed_characters) {
            params.allowed_characters = "Both";
        }

        this.allowed_case = params.allowed_characters;
        if (params?.allowed_characters == "Both") {
            return !!value.match(/^[0-9abcdefABCDEF]{0,}$/);
        } else if (params.allowed_characters == "LowerCase") {
            return !!value.match(/^[0-9abcdef]{0,}$/);
        } else if (params.allowed_characters == "UpperCase") {
            return !!value.match(/^[0-9ABCDEF]{0,}$/);
        }
        return true;
    }
}

export type hexadecimal_validator_parameters = { allowed_characters?: ("UpperCase" | "LowerCase" | "Both"); };
export type hexadecimal_setter_parameters = null;
export default [address_validation_rule];

class address_validation_rule {
    error_msg = "";

    values = [];
    /**
     * @type {hexadecimal_validator_parameters['allowed_characters']}
     */
    allowed_case = "Both";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid hexadecimal ${
                this.allowed_case == "LowerCase" || this.allowed_case == "UpperCase" ? this.allowed_case : ""
            } string`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }

    /**
     *
     * @param {*} value
     * @param {hexadecimal_validator_parameters} params
     * @returns
     */
    rule(value, params) {
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

/**
 * @typedef {{allowed_characters?: ("UpperCase"| "LowerCase"| "Both")}} hexadecimal_validator_parameters
 */
/**
 * @typedef {null} hexadecimal_setter_parameters
 */
export default [address_validation_rule];

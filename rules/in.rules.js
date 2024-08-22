import env from "../../../env.js";
import ObjectError from "../../ObjectError/index.js";

class address_validation_rule {
    error_msg = "";

    values = [];
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a value in the given probable values ${this.values.length > 50 ? ", values are too long to be provided in this error message" : this.values}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
    rule(value, params) {
        if (!["number", "string"].includes(typeof value)) {
            this.error_msg = "[field] is not a number or string";
            return false;
        }
        if (!Array.isArray(params)) {
            throw new ObjectError({
                status_code: env.response.status_codes.server_error,
                error: {
                    msg: "Array to check against is not array in `in` rule, provided array " + params,
                },
            });
        }
        this.values = params;
        if (!params.includes(value)) {
            return false;
        }

        return true;
    }
}

/**
 * @typedef {(string|number)[]} in_validator_parameters
 *
 */
/**
 * @typedef {null} in_setter_parameters
 */
export default [address_validation_rule];

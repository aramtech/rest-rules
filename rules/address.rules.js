// @ts-nocheck
class address_validation_rule {
    error_msg = "";
    max = 2000;
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid address`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
    rule(value) {
        if (typeof value != "string") {
            this.error_msg = "[field] must be a string";
            return false;
        }
        if (value.length > this.max) {
            this.error_msg = `[field] cant be longer then ${max}`;
            return false;
        }
        return true;
    }
}

/**
 * @typedef {null} address_validator_parameters
 */
/**
 * @typedef {null} address_setter_parameters
 */
export default [address_validation_rule];

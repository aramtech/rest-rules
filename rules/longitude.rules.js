// @ts-nocheck
class longitude_validation_rule {
    rule(value) {
        if (typeof value != "string" && typeof value != "number") {
            this.error_msg = "Longitude must be either a string or number";
            return false;
        }
        const longitude = parseFloat(value);
        if (!longitude) {
            this.error_msg = "longitude must be a valid float number";
            return false;
        }
        if (longitude > 180 || longitude < -180) {
            this.error_msg = "longitude must be between -180.0 and 180.0 degree";
            return false;
        }
        return true;
    }
    error_msg = "";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid longitude`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

/**
 * @typedef {null}  longitude_validator_parameters
 */
/**
 * @typedef {null}  longitude_setter_parameters
 */
export default [longitude_validation_rule];

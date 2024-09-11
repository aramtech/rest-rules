// @ts-nocheck
class latitude_validation_rule {
    rule(value) {
        if (typeof value != "string" && typeof value != "number") {
            this.error_msg = "Latitude must be either a string or number";
            return false;
        }
        const latitude = parseFloat(value);
        if (!latitude) {
            this.error_msg = "latitude must be a valid float number";
            return false;
        }
        if (latitude > 90 || latitude < -90) {
            this.error_msg = "latitude must be between -90.0 and 90.0 degree";
            return false;
        }
        return true;
    }
    error_msg = "";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid latitude`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

/**
 * @typedef {null}  latitude_validator_parameters
 */
/**
 * @typedef {null}  latitude_setter_parameters
 */
export default [latitude_validation_rule];

export { latitude_validation_rule };

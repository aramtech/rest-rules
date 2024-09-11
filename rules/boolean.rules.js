class boolean_validation_rule {
    set(value) {
        if (parseInt(value) === 0 || parseInt(value) === 1) {
            return Boolean(parseInt(value));
        } else {
            return value;
        }
    }
    rule(value, params) {
        if (parseInt(value) === 0 || parseInt(value) === 1 || value === true || value === false) {
            return true;
        } else {
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid boolean`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

/**
 * @typedef {null} boolean_validator_parameters
 */
/**
 * @typedef {Object} boolean_setter_parameters
 * @property {Object} obj
 * @property {String} key
 *
 */
export default [
    // boolean
    boolean_validation_rule,
];

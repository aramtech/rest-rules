class required_validation_rule {
    rule(value) {
        if (typeof value == "object" && Array.isArray(value)) {
            if (value?.length == 0) {
                return false;
            } else {
                return true;
            }
        } else {
            if (typeof value === "undefined" || value === null || value === "" || Number.isNaN(value)) {
                return false;
            } else {
                return true;
            }
        }
    }
    error_msg = "";
    msg(field = "Field", general_options, t) {
        if (!this.error_msg) {
            return `${field} ${t("is Required")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

/**
 * @typedef {null}  required_validator_parameters
 */
/**
 * @typedef {null}  required_setter_parameters
 */
export default [
    // required
    required_validation_rule,
];

class phone_validation_rule {
    rule(value) {
        try {
            return !!value.trim().match(/^((\+|00)\s?\d{1,3}\s?)?(\(?\d{2,3}\)?)(\-|\s)?(\d{3}(\-|\s)?\d{4})$/);
        } catch {
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field", general_options, t) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid Phone Number")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

/**
 * @typedef {null}  phone_validator_parameters
 */
/**
 * @typedef {null}  phone_setter_parameters
 */
export default [phone_validation_rule];

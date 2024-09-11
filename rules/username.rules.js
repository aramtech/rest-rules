class username_validation_rule {
    max_length = 250;
    rule(value) {
        try {
            return !!value.match(/^[a-zA-z_][a-zA-z0-9_\-]{3,}$/);
        } catch {
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field", general_options, t) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid username")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

/**
 * @typedef {null}  username_validator_parameters
 */
/**
 * @typedef {null}  username_setter_parameters
 */
export default [username_validation_rule];

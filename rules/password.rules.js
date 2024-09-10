class password_validation_rule {
    rule(value) {
        try {
            return !!value.match(/^[a-zA-Z0-9_\-\!\@\#\$\%\^\&\*\(\)\+\<\>\.\?\,\;\|]{4,20}$/);
        } catch {
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field", general_options, t) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid password")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

/**
 * @typedef {null}  password_validator_parameters
 */
/**
 * @typedef {null}  password_setter_parameters
 */
export default [password_validation_rule];

class url_validation_rule {
    max_length = 250;
    rule(value) {
        try {
            return !!value.trim().match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/);
        } catch {
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid url`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

/**
 * @typedef {null}  url_validator_parameters
 */
/**
 * @typedef {null}  url_setter_parameters
 */
export default [url_validation_rule];

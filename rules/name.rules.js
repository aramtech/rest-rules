class name_validation_rule {
    rule(value) {
        try {
            return !!value.trim().match(/^(?:\p{Letter}{3,20})(?:\p{Z}{1,2}\p{Letter}{1,20}){1,3}$/iu);
        } catch {
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field", general_options, t) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid name")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

/**
 * @typedef {null} name_validator_parameters
 */
/**
 * @typedef {null}  name_setter_parameters
 */
export default [name_validation_rule];


class description_validation_rule {
    error_msg = "";
    max = 2000;
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid description`;
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
            this.error_msg = `[field] cant be longer then ${this.max}`;
            return false;
        }
        return true;
    }
}

export type description_validator_parameters = null;
export type description_setter_parameters = null;
export default [description_validation_rule];

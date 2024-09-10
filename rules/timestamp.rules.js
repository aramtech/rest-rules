// @ts-nocheck
class timestamp_validation_rule {
    rule(value, params) {
        try {
            if (typeof value != "string" && typeof value != "number") {
                this.error_msg = `[field] must be either a string or a number, given type is ${typeof value}`;
                return false;
            }
            value = parseInt(value);
            if (Number.isNaN(value)) {
                this.error_msg = `[field] must be a valid number`;
                return false;
            }

            const date = new Date(value);
            if (date.toString() == "Invalid Date") {
                this.error_msg = `[field] must be a valid timestamp`;
                return false;
            }
            if (!!params?.startdate) {
                params.startdate = new Date(params?.startdate);
            }
            if (!!params?.startdate && date.getTime() < params.startdate.getTime()) {
                this.error_msg = `[field] must be after ${params.startdate.toString()}`;
                return false;
            }

            if (!!params?.enddate) {
                params.enddate = new Date(params?.enddate);
            }
            if (!!params?.enddate && date.getTime() > params.enddate.getTime()) {
                this.error_msg = `[field] must be before ${params.enddate.toString()}`;
                return false;
            }

            return true;
        } catch (error) {
            console.log("Date validation Error", error);
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid timestamp`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
    set(value) {
        value = parseInt(value);
        const date = new Date(value);
        return date;
    }
}

/**
 *  @typedef {Object} timestamp_validator_parameters
 *  @property {Date} [startdate]
 *  @property {Date} [enddate]
 */
/**
 * @typedef {Object} timestamp_setter_parameters
 * @property {Object} obj
 * @property {String} key
 *
 */
export default [timestamp_validation_rule];

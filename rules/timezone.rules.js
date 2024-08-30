import env_obj from "$/server/env.js";

class timestring {
    timezone_number = null;
    rule(value) {
        if (typeof value == "number") {
            if (value > env_obj.datetime.timezone.max || value < env_obj.datetime.timezone.min) {
                this.error_msg = `[field] as Timezone number in minutes must be between ${env_obj.datetime.timezone.min} and ${env_obj.datetime.timezone.max}`;
                return false;
            }
            this.timezone_number = value;
        } else {
            if (typeof value != "string") {
                this.error_msg = "[field] as a timezone must be either a number (in minutes) or a string (HH:MM)";
                return false;
            }

            const match = value.match(/^(\+|\-)?([0-9]*?)$/);
            if (match) {
                let sign = 1;
                if (match[1] === "-") {
                    sign = -1;
                }
                const timezone_number = sign * parseInt(match[2]);
                if (timezone_number > env_obj.datetime.timezone.max || timezone_number < env_obj.datetime.timezone.min) {
                    this.error_msg = `[field] as Timezone number in minutes must be between ${env_obj.datetime.timezone.min} and ${env_obj.datetime.timezone.max}`;
                    return false;
                }
                this.timezone_number = timezone_number;
            } else {
                const parts = value.split(":");
                if (parts.length != 2) {
                    this.error_msg = `[field] must be in the form of HH:MM`;
                    return false;
                }
                const HH = parseInt(parts[0]);
                if (Number.isNaN(HH) || HH > 23 || HH < 0) {
                    this.error_msg = `[field] Hours must be between 00 -> 23`;
                    return false;
                }

                const MM = parseInt(parts[1]);
                if (Number.isNaN(MM) || MM > 59 || MM < 0) {
                    this.error_msg = `[field] Minutes must be between 00 -> 23`;
                    return false;
                }

                const timezone_number = MM + 60 * HH;
                if (timezone_number > env_obj.datetime.timezone.max || timezone_number < env_obj.datetime.timezone.min) {
                    this.error_msg = `[field] as Timezone number in minutes must be between ${env_obj.datetime.timezone.min} and ${env_obj.datetime.timezone.max}`;
                    return false;
                }
                this.timezone_number = timezone_number;
            }
        }

        return true;
    }
    error_msg = "";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid timezone`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }

    set(value, params) {
        return this.timezone_number;
    }
}

/**
 * @typedef {null}  timezone_validator_parameters
 */

/**
 * @typedef {Object} timezone_setter_parameters
 * @property {Object} obj
 * @property {String} key
 *
 */
export default [timestring];

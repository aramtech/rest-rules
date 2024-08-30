class timestring {
    time = {};
    rule(value) {
        if (typeof value != "string") {
            this.error_msg = "[field] as Time-String must be a string in the form of HH:MM:SS";
            return false;
        }
        const parts = value.split(":");
        if (parts.length != 3) {
            this.error_msg = `[field] must be in the form of HH:MM:SS`;
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

        const SS = parseInt(parts[2]);
        if (Number.isNaN(SS) || SS > 59 || SS < 0) {
            this.error_msg = `[field] Seconds must be between 00 -> 23`;
            return false;
        }

        this.time = {
            HH: HH,
            MM: MM,
            SS: SS,
        };

        return true;
    }
    error_msg = "";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid timestring`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }

    set(value, params) {
        return this.time;
    }
}

/**
 * @typedef {null}  timestring_validator_parameters
 */
/**
 * @typedef {Object}  latitude_setter_parameters
 * @property {Object} obj
 * @property {string} key
 *
 */
export default [timestring];

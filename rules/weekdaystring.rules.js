class weekday_string_validation_rule {
    weekday_number = null;
    set() {
        return this.weekday_number;
    }
    weekday_map = {
        sun: 0,
        sunday: 0,
        mon: 1,
        monday: 1,
        tue: 2,
        tuesday: 2,
        wed: 3,
        wednesday: 3,
        thu: 4,
        thursday: 4,
        fri: 5,
        friday: 5,
        sat: 6,
        saturday: 6,
    };
    rule(value, params, general_options, t) {
        if (typeof value == "number") {
            this.weekday_number = parseInt(value);
            if (this.weekday_number > 6 || this.weekday_number < 0) {
                this.error_msg = t("week day index must be between 0 (sun) -> 6 (sat)");
                return false;
            }
        } else if (typeof value == "string") {
            this.weekday_number = parseInt(value);
            if (!Number.isNaN(this.weekday_number)) {
                if (this.weekday_number > 6 || this.weekday_number < 0) {
                    this.error_msg = t("week day index must be between 0 (sun) -> 6 (sat)");
                    return false;
                }
            } else {
                this.weekday_number = this.weekday_map[value];
                if (!this.weekday_number) {
                    this.error_msg = `${t("week day string must be one of")}:\n${JSON.stringify(this.weekday_map, null, 4)}`;
                    return false;
                }
            }
        } else {
            this.error_msg = `[field] ${t("must be a string or a number as a week day")}`;
            return false;
        }
        return true;
    }
    error_msg = "";
    msg(field, general_options, t) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid weekday string")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

/**
 * @typedef {null}  weekdaystring_validator_parameters
 */
/**
 * @typedef {Object} weekdaystring_setter_parameters
 * @property {Object} obj
 * @property {String} key
 *
 */
export default [weekday_string_validation_rule];

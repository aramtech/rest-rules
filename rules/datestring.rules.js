// @ts-nocheck
import { dash_date_formater } from "$/server/utils/common/index.ts";

class datestring_validation_rule {
    date = new Date();
    set(value) {
        return this.date;
    }
    rule(value, params) {
        if (!value || typeof value != "string") {
            this.error_msg = "[field] must be of type string";
            return false;
        }

        const format = params?.format || "yyyy-mm-dd";
        if (format.toLowerCase() === "dd/mm/yyyy") {
            const parts = value?.split("/");
            if (parts?.length != 3) {
                this.error_msg = "invalid date";
                return false;
            }
            const dd = parseInt(parts[0]);
            if (Number.isNaN(dd)) {
                this.error_msg = "[field] date day (dd) is not valid number";
                return false;
            }
            const mm = parseInt(parts[1]);
            if (Number.isNaN(mm)) {
                this.error_msg = "[field] date month (mm) is not valid number";
                return false;
            }
            const yyyy = parseInt(parts[2]);
            if (Number.isNaN(yyyy)) {
                this.error_msg = "[field] date year (yyyy) is not valid number";
                return false;
            }
            this.date = new Date();
            this.date.setHours(0);
            this.date.setMinutes(0);
            this.date.setSeconds(0);
            this.date.setMilliseconds(0);
            this.date.setMonth(mm - 1);
            this.date.setDate(dd);
            this.date.setYear(yyyy);
            if (this.date.getMonth() != mm - 1 || this.date.getDate() != dd || this.date.getFullYear() != yyyy) {
                this.error_msg = "[field] date is not valid";
                return false;
            }
        } else if (format.toLowerCase() === "yyyy-mm-dd") {
            const parts = value?.split("-");
            if (parts?.length != 3) {
                this.error_msg = "invalid date";
                return false;
            }
            const dd = parseInt(parts[2]);
            if (Number.isNaN(dd)) {
                this.error_msg = "[field] date day (dd) is not valid number";
                return false;
            }
            const mm = parseInt(parts[1]);
            if (Number.isNaN(mm)) {
                this.error_msg = "[field] date month (mm) is not valid number";
                return false;
            }
            const yyyy = parseInt(parts[0]);
            if (Number.isNaN(yyyy)) {
                this.error_msg = "[field] date year (yyyy) is not valid number";
                return false;
            }
            this.date = new Date();
            this.date.setHours(0);
            this.date.setMinutes(0);
            this.date.setSeconds(0);
            this.date.setMilliseconds(0);
            this.date.setMonth(mm - 1);
            this.date.setDate(dd);
            this.date.setYear(yyyy);
            if (this.date.getMonth() != mm - 1 || this.date.getDate() != dd || this.date.getFullYear() != yyyy) {
                this.error_msg = "[field] date is not valid";
                return false;
            }
        } else if (format.toLowerCase() === "mm/dd/yyyy") {
            const parts = value?.split("/");
            if (parts?.length != 3) {
                this.error_msg = "invalid date";
                return false;
            }
            const dd = parseInt(parts[1]);
            if (Number.isNaN(dd)) {
                this.error_msg = "[field] date day (dd) is not valid number";
                return false;
            }
            const mm = parseInt(parts[0]);
            if (Number.isNaN(mm)) {
                this.error_msg = "[field] date month (mm) is not valid number";
                return false;
            }
            const yyyy = parseInt(parts[2]);
            if (Number.isNaN(yyyy)) {
                this.error_msg = "[field] date year (yyyy) is not valid number";
                return false;
            }
            this.date = new Date();
            this.date.setHours(0);
            this.date.setMinutes(0);
            this.date.setSeconds(0);
            this.date.setMilliseconds(0);
            this.date.setFullYear(yyyy);
            this.date.setMonth(mm - 1);
            this.date.setDate(dd);
            if (this.date.getMonth() != mm - 1 || this.date.getDate() != dd || this.date.getFullYear() != yyyy) {
                this.error_msg = "[field] date is not valid";
                return false;
            }
        } else {
            this.error_msg = "[field] date format must be either 'dd/mm/yyyy' or 'mm/dd/yyyy' or 'yyyy-mm-dd'";
            return false;
        }

        if (params.max) {
            const max_date = new Date(dash_date_formater(new Date(params.max), true, false));
            const date = this.date;
            if (max_date.getTime() < date.getTime()) {
                this.error_msg = "[field] date must be equal to or less than " + dash_date_formater(new Date(params.max), true, false);
                return false;
            }
        }
        if (params.min) {
            const min_date = new Date(dash_date_formater(new Date(params.min), true, false));
            const date = this.date;
            if (min_date.getTime() > date.getTime()) {
                this.error_msg = "[field] date must be equal to or greater than " + dash_date_formater(new Date(params.min), true, false);
                return false;
            }
        }

        return true;
    }
    error_msg = "";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid datestring`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}
/**
 * @typedef {Object} datestring_validator_parameters
 * @property {"mm/dd/yyyy"|"dd/mm/yyyy"|"yyyy-mm-dd"} [format]
 * @property {Date|string} [max]
 * @property {Date|string} [min]
 */
/**
 * @typedef {Object} datestring_setter_parameters
 * @property {Object} obj
 * @property {String} key
 *
 */
export default [datestring_validation_rule];

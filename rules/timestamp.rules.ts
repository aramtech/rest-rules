import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class timestamp_validation_rule implements RuleBase {
    rule(value: any, params: timestamp_validator_parameters, _, t: Translate) {
        try {
            if (typeof value != "string" && typeof value != "number") {
                this.error_msg = `[field] ${t("must be either a string or a number, given type is")} ${typeof value}`;
                return false;
            }
            value = Math.floor(Number(value));
            if (Number.isNaN(value)) {
                this.error_msg = `[field] ${t("must be a valid number")}`;
                return false;
            }

            const date = new Date(value);
            if (date.toString() == "Invalid Date") {
                this.error_msg = `[field] ${t("must be a valid timestamp")}`;
                return false;
            }
            if (!!params?.startdate) {
                params.startdate = new Date(params?.startdate);
            }
            if (!!params?.startdate && date.getTime() < params.startdate.getTime()) {
                this.error_msg = `[field] ${t("must be after")} ${params.startdate.toString()}`;
                return false;
            }

            if (!!params?.enddate) {
                params.enddate = new Date(params?.enddate);
            }
            if (!!params?.enddate && date.getTime() > params.enddate.getTime()) {
                this.error_msg = `[field] ${t("must be before")} ${params.enddate.toString()}`;
                return false;
            }

            return true;
        } catch (error) {
            console.log("Date validation Error", error);
            return false;
        }
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid timestamp")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
    set(value: any) {
        value = parseInt(value);
        const date = new Date(value);
        return date;
    }
}

export interface timestamp_validator_parameters {
    startdate?: Date;
    enddate?: Date;
}
export interface timestamp_setter_parameters {
    obj: Object;
    key: String;
}
export default [timestamp_validation_rule];

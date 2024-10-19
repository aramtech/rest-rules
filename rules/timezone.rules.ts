import env_obj from "$/server/env.js";
import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class timestring implements RuleBase {
    timezone_number = null as any;
    rule(value: any, _, __, t: Translate) {
        if (typeof value == "number") {
            if (value > env_obj.datetime.timezone.max || value < env_obj.datetime.timezone.min) {
                this.error_msg = `[field] ${t("as Timezone number in minutes must be between")} ${env_obj.datetime.timezone.min} ${t("and")} ${env_obj.datetime.timezone.max}`;
                return false;
            }
            this.timezone_number = value;
        } else {
            if (typeof value != "string") {
                this.error_msg = `[field] ${t("as a timezone must be either a number (in minutes) or a string (HH:MM)")}`;
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
                    this.error_msg = `[field] ${t("as Timezone number in minutes must be between")} ${env_obj.datetime.timezone.min} ${t("and")} ${env_obj.datetime.timezone.max}`;
                    return false;
                }
                this.timezone_number = timezone_number;
            } else {
                const parts = value.split(":");
                if (parts.length != 2) {
                    this.error_msg = `[field] ${t("must be in the form of HH:MM")}`;
                    return false;
                }
                const HH = parseInt(parts[0]);
                if (Number.isNaN(HH) || HH > 23 || HH < 0) {
                    this.error_msg = `[field] ${t("Hours must be between 00 -> 23")}`;
                    return false;
                }

                const MM = parseInt(parts[1]);
                if (Number.isNaN(MM) || MM > 59 || MM < 0) {
                    this.error_msg = `[field] ${t("Minutes must be between 00 -> 23")}`;
                    return false;
                }

                const timezone_number = MM + 60 * HH;
                if (timezone_number > env_obj.datetime.timezone.max || timezone_number < env_obj.datetime.timezone.min) {
                    this.error_msg = `[field] ${t("as Timezone number in minutes must be between")} ${env_obj.datetime.timezone.min} ${t("and")} ${env_obj.datetime.timezone.max}`;
                    return false;
                }
                this.timezone_number = timezone_number;
            }
        }

        return true;
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid timezone")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }

    set() {
        return this.timezone_number;
    }
}

export type timezone_validator_parameters = null;
export interface timezone_setter_parameters {
    obj: Object;
    key: String;
}
export default [timestring];

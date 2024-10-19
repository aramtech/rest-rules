import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class timestring implements RuleBase {
    time = {} as any;
    rule(value: any,__,  _,t: Translate ) {
        if (typeof value != "string") {
            this.error_msg = `[field] ${t("as Time-String must be a string in the form of HH:MM:SS")}`;
            return false;
        }
        const parts = value.split(":");
        if (parts.length != 3) {
            this.error_msg = `[field] ${t("must be in the form of HH:MM:SS")}`;
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

        const SS = parseInt(parts[2]);
        if (Number.isNaN(SS) || SS > 59 || SS < 0) {
            this.error_msg = `[field] ${t("Seconds must be between 00 -> 23")}`;
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
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid timestring")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }

    set() {
        return this.time;
    }
}

export type timestring_validator_parameters = null;
export interface timestring_setter_parameters {
    obj: Object;
    key: string;
}
export default [timestring];

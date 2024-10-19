import env from "../../../env.js";
import ObjectError from "../../ObjectError/index.js";
import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class address_validation_rule implements RuleBase {
    error_msg = "";

    values = [] as (string | number)[];
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a value in the given probable values")} ${this.values.length > 50 ? `, ${t("values are too long to be provided in this error message")}` : this.values}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
    rule(value: any, params: in_validator_parameters, _, t: Translate) {
        if (!["number", "string"].includes(typeof value)) {
            this.error_msg = `[field] ${t("is not a number or string")}`;
            return false;
        }
        if (!Array.isArray(params)) {
            throw new ObjectError({
                status_code: env.response.status_codes.server_error,
                error: {
                    msg: `${t("Array to check against is not array in `in` rule, provided array")}` + params,
                },
            });
        }
        this.values = params;
        if (!params.includes(value)) {
            return false;
        }

        return true;
    }
}

export type in_validator_parameters = (string | number)[];
export type in_setter_parameters = null;
export default [address_validation_rule];

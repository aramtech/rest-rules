import { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class title_validation_rule implements RuleBase {
    max_length = 250;

    rule(value: any, params: title_validator_parameters, _, t: Translate) {
        if (typeof value != "string") {
            this.error_msg = `[field] ${t("must be a string")}`;
            return false;
        }
        if (!(params?.max === false) && value.length > (params?.max || this.max_length)) {
            this.error_msg = `[field] ${t("must be less then")} ${params?.max || this.max_length} ${t("in length")}`;
            return false;
        }
        if (params?.min && value.length < params?.min) {
            this.error_msg = `[field] ${t("must be more then")} ${params?.min} ${t("in length")}`;
            return false;
        }
        if (params?.eq && value.length != params?.eq) {
            this.error_msg = `[field] ${t("must be equal to")} ${params?.eq} ${t("in length")}`;
            return false;
        }
        if (
            params?.reserved?.length
        ) {
            if (params?.sensitive_case_reserved && params.reserved.some((item) => item == value)) {
                this.error_msg = `[field] ${t("must not be one the following values (sensitive case)")} ${String(params.reserved)}`;
                return false;
            } else if (!params?.sensitive_case_reserved && params.reserved.some((item) => item.toUpperCase() == value.toUpperCase())) {
                this.error_msg = `[field] ${t("must not be one the following values (insensitive case)")} ${String(params.reserved)}`;
                return false;
            }
        }
        if (params?.equals_to && value != params.equals_to) {
            this.error_msg = `[field] is not equal to required value`;
            return false;
        }
        if (
            params?.in?.length
        ) {
            if (params?.sensitive_case_in && !params.in.some((item) => item == value)) {
                this.error_msg = `[field] ${t("must be one the following values (sensitive case)")} ${String(params.in)}`;
                return false;
            } else if (!params?.sensitive_case_in && !params.in.some((item) => item.toUpperCase() == value.toUpperCase())) {
                this.error_msg = `[field] ${t("must be one the following values (insensitive case)")} ${String(params.in)}`;
                return false;
            }
        }


        return true;
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid title")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

export interface title_validator_parameters {
    max?: number | false;
    min?: number;
    sensitive_case_reserved?: boolean;
    sensitive_case_in?: boolean;
    eq?: number;

    equals_to?: string;
    reserved?: Array<String>;
    in?: Array<String>;
}
export type title_setter_parameters = null;
export default [title_validation_rule];

import { Translate } from "../index.js";

const math = (await import("$/server/utils/common/index.js")).math;

class number_validation_rule {
    rule(value: any, params: number_validator_parameters, _, t: Translate) {
        const valid_number = !Number.isNaN(parseInt(value));
        if (!valid_number) {
            this.error_msg = `[field] ${t("must be valid number")}`;
            return false;
        }

        if (!Number.isNaN(Number(params?.max)) && math.fixed(value) > math.fixed(params.max)) {
            this.error_msg = `[field] ${t("must be less then")} ${math.fixed(params.max)}`;
            return false;
        }

        if (!Number.isNaN(Number(params?.min)) && math.fixed(value) < math.fixed(params.min)) {
            this.error_msg = `[field] ${t("must be greater then")} ${math.fixed(params.max)}`;
            return false;
        }

        return true;
    }
    set(value: any, params: number_setter_parameters) {
        if (params?.float) {
            return math.fixed(parseFloat(value));
        } else {
            return parseInt(value);
        }
    }
    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid number")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

export interface number_validator_parameters {
    max?: number;
    min?: number;
}
export interface number_setter_parameters {
    obj: Object;
    key: String;
    float: Boolean;
}
export default [number_validation_rule];

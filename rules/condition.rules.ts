import type { InternalGeneralOptions, Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class condition_validation_rule implements RuleBase {
    translate_condition_to = "";
    condition = "";
    conditions_symbols = ["<", ">", "<=", ">=", "==", "!=", "!in", "in"];
    conditions = {
        prisma: {
            "<": "lt",
            ">": "gt",
            "<=": "lte",
            ">=": "gte",
            "==": "equals",
            "!=": "not",
            "!in": "notIn",
            in: "in",
        },
        regular: {
            "<": "<",
            ">": ">",
            "<=": "<=",
            ">=": ">=",
            "==": "==",
            "!=": "!=",
            "!in": "!in",
            in: "in",
        },
    };

    error_msg = "";
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid condition symbol")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
    set(value: any) {
        return this.conditions[this.translate_condition_to][this.condition];
    }
    rule(value: any, params: condition_validator_parameters,  _globalParams: InternalGeneralOptions, t: Translate) {
        if (!params) {
            params = {};
        }
        if (!params?.translate_condition_to) {
            params.translate_condition_to = "regular";
        }
        const conditions_set = this.conditions[params.translate_condition_to];
        const all_conditions_symbols = params.allow_list || Object.keys(conditions_set);
        if (!all_conditions_symbols.includes(value)) {
            this.error_msg = `${t("condition provided for")} [field] ${t("is not valid")}, ${t("the condition must be one of")} ${all_conditions_symbols}`;
            return false;
        }
        this.condition = value;
        this.translate_condition_to = params.translate_condition_to;
        return true;
    }
}

export interface condition_validator_parameters {
    translate_condition_to?: "prisma" | "regular";
    allow_list?: Array<"<" | ">" | "<=" | ">=" | "==" | "!=" | "!in" | "in">;
}
export interface condition_setter_parameters {
    obj: Object;
    key: String;
}
export default [condition_validation_rule];

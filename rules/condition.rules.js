class condition_validation_rule {
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
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid condition symbol`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
    set(value) {
        return this.conditions[this.translate_condition_to][this.condition];
    }
    rule(value, params) {
        if (!params) {
            params = {};
        }
        if (!params?.translate_condition_to) {
            params.translate_condition_to = "regular";
        }
        const conditions_set = this.conditions[params.translate_condition_to];
        const all_conditions_symbols = params.allow_list || Object.keys(conditions_set);
        if (!all_conditions_symbols.includes(value)) {
            this.error_msg = `condition provided for [field] is not valid, the condition must be one of ${all_conditions_symbols}`;
            return false;
        }
        this.condition = value;
        this.translate_condition_to = params.translate_condition_to;
        return true;
    }
}

/**
 * @typedef {Object} condition_validator_parameters
 * @property {"prisma"|"regular"} [translate_condition_to]
 * @property {Array<"<"|">"|"<="|">="|"=="|"!="|"!in"|"in">}  [allow_list]
 */
/**
 * @typedef {Object} condition_setter_parameters
 * @property {Object} obj
 * @property {String} key
 *
 */
export default [condition_validation_rule];

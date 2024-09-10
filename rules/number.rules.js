const math = (await import("$/server/utils/common/index.ts")).math;

class number_validation_rule {
    rule(value, params) {
        const valid_number = !Number.isNaN(parseInt(value));
        if (!valid_number) {
            this.error_msg = "[field] must be valid number";
            return false;
        }

        if (!Number.isNaN(Number(params?.max)) && math.fixed(value) > math.fixed(params.max)) {
            this.error_msg = `[field] must be less then ${math.fixed(params.max)}`;
            return false;
        }

        if (!Number.isNaN(Number(params?.min)) && math.fixed(value) < math.fixed(params.min)) {
            this.error_msg = `[field] must be greater then ${math.fixed(params.max)}`;
            return false;
        }

        return true;
    }
    set(value, params) {
        if (params?.float) {
            return math.fixed(parseFloat(value));
        } else {
            return parseInt(value);
        }
    }
    error_msg = "";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid number`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

/**
 * @typedef {Object} number_validator_parameters
 * @property {number} [max]
 * @property {number} [min]
 */
/**
 * @typedef {Object} number_setter_parameters
 * @property {Object} obj
 * @property {String} key
 * @property {Boolean} float
 *
 */
export default [number_validation_rule];

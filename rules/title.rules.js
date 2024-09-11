class title_validation_rule {
    max_length = 250;

    /**
     *
     * @param {*} value
     * @param {title_validator_parameters} params
     * @param {*} general_options
     * @param {*} t
     * @returns
     */
    rule(value, params, general_options, t) {
        if (typeof value != "string") {
            this.error_msg = "[field] must be a string";
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
            params?.reserved?.length &&
            params.reserved.map((item) => item.toUpperCase()).includes(value.toUpperCase()) &&
            (!params?.sensetive_case_reserved || params.reserved.includes(value))
        ) {
            this.error_msg = `[field] ${t("must not be one the following values")} ${String(params.reserved)}`;
            return false;
        }
        if (params?.equals_to && value != params.equals_to) {
            this.error_msg = `[field] is not equalt to required value`;
            return false;
        }
        if (
            params?.in?.length &&
            !params.in.map((item) => item.toUpperCase()).includes(value.toUpperCase()) &&
            (!params?.sensetive_case_in || !params.in.includes(value))
        ) {
            this.error_msg = `[field] ${t("must be one the following values")} ${String(params.in)}`;
            return false;
        }
        return true;
    }
    error_msg = "";
    msg(field = "Field", general_options, t) {
        if (!this.error_msg) {
            return `${field} ${t("is not a valid title")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

/**
 * @typedef {Object} title_validator_parameters
 * @property {number | false} [max]
 * @property {number} [min]
 * @property {number} [eq]
 * @property {string} [equals_to]
 * @property {Array<String>} [reserved]
 * @property {Array<String>} [in]
 */
/**
 * @typedef {null} title_setter_parameters
 *
 */
export default [title_validation_rule];

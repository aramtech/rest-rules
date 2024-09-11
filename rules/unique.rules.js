import env from "$/server/env.js";

const client = (await import("$/server/database/prisma.ts")).default;

class unique_validation_rule {
    error_msg = "";
    item = null;
    status_code = env.response.status_codes.conflict;
    msg(field = "Field", general_options, t) {
        if (!this.error_msg) {
            return `${field} ${t("is not unique")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
    async rule(value, params) {
        const tx = params?.tx || client;

        const item = await tx[params.model].findFirst({
            where: {
                deleted: false,
                [params.unique_key]: (() => {
                    if (params.parseInt === false) {
                        return value;
                    } else {
                        return parseInt(value) || value;
                    }
                })(),
                ...(params.where || {}),
            },
        });
        if (params?.except_id && params.except_id == item?.[params?.id_key]) {
            return true;
        }
        if (item) {
            return false;
        }
        return true;
    }
}

/**
 * @typedef {import("$/server/utils/JsDoc/assets/where.js").Where} Where
 */

/**
 *
 *
 * @typedef {Object} __unique_validator_parameters
 * @property {import("$/server/utils/JsDoc/assets/models.js").Model} model
 * @property {String} unique_key
 * @property {number|string} [except_id]
 * @property {*} [tx]
 * @property {String} [id_key]
 * @property {boolean} [parseInt]
 * @property {Where}  [where] The where clause.
 *
 */

/**
 * @typedef {null} __unique_setter_parameters
 */
export default [unique_validation_rule];

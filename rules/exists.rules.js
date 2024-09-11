// @ts-nocheck
import env from "$/server/env.js";
import db_models from "../../../dynamic_configuration/db_models.ts";
const client = (await import("$/server/database/prisma.ts")).default;

class exists_validation_rule {
    error_msg = "";
    item = null;
    client = null;
    status_code = env.response.status_codes.not_found;
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} with given identifier is not found`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
    /**
     *
     * @param {*} value
     * @param {exists_validator_parameters} params
     * @returns
     */
    async rule(value, params) {
        if (params.include) {
            for (const key of Object.keys(params.include)) {
                if (db_models.db.cap_models_array.includes(key)) {
                    params.include = {
                        ...params.include,
                        ...params.include[key],
                        [key]: undefined,
                    };
                    delete params.include[key];
                }
            }
        }
        if (params.select) {
            for (const key of Object.keys(params.select)) {
                if (db_models.db.cap_models_array.includes(key)) {
                    params.select = {
                        ...params.select,
                        ...params.select[key],
                        [key]: undefined,
                    };
                    delete params.select[key];
                }
            }
        }
        if (params.where) {
            for (const key of Object.keys(params.where)) {
                if (db_models.db.cap_models_array.includes(key)) {
                    params.where = {
                        ...params.where,
                        ...params.where[key],
                        [key]: undefined,
                    };
                    delete params.where[key];
                }
            }
        }

        const tx = params?.tx || params?.tx || client;

        const item = await tx[params.model].findFirst({
            where: {
                deleted: false,
                ...(() => {
                    if (params.id_key) {
                        if (params.parseInt === false) {
                            return { [params.id_key]: value };
                        } else {
                            return { [params.id_key]: parseInt(value) || value };
                        }
                    } else {
                        return {};
                    }
                })(),
                ...(params?.where || {}),
            },
            include: params.include || undefined,
            select: params.select || undefined,
            orderBy: params.orderBy || undefined,
            take: params.take || undefined,
            skip: params.skip || undefined,
        });
        if (!item) {
            return false;
        }
        this.item = item;
        return true;
    }
    set(value, params) {
        return this.item;
    }
}

/**
 * @typedef {import("$/server/utils/JsDoc/assets/where.js").Where} Where
 */
/**
 * @typedef {import("$/server/utils/JsDoc/assets/include.js").Include} Include
 */
/**
 * @typedef {import("$/server/utils/JsDoc/assets/select.js").Select} Select
 */

/**
 * @typedef {Object} exists_validator_parameters
 * @property {import("$/server/utils/JsDoc/assets/models.js").Model} model
 * @property {number} [take]
 * @property {number} [skip]
 * @property {boolean} parseInt
 * @property {*} [tx]
 * @property {string} id_key
 * @property {Where}  [where] The where clause.
 * @property {Include} [include] The include clause.
 * @property {Select} [select] The include clause.
 * @property {Object | Array<Object>} [orderBy]
 */

/**
 * @typedef {Object} exists_setter_parameters
 * @property {Object} obj
 * @property {string} key
 *
 */
export default [exists_validation_rule];

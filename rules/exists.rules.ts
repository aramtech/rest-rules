import env from "$/server/env.js";
import db_models from "../../../dynamic_configuration/db_models.js";
import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";
const client = (await import("$/server/database/prisma.js")).default;

class exists_validation_rule implements RuleBase {
    error_msg = "";
    item = null;
    client = null;
    status_code = env.response.status_codes.not_found;
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("with given identifier is not found")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }

    async rule(value: any, params: exists_validator_parameters, _, t: Translate) {
        if (params.include) {
            for (const key of Object.keys(params.include)) {
                if (db_models.db.cap_models_array.includes(key)) {
                    params.include = {
                        ...params.include,
                        ...params.include?.[key],
                        [key]: undefined,
                    };
                    delete params.include?.[key];
                }
            }
        }
        if (params.select) {
            for (const key of Object.keys(params.select)) {
                if (db_models.db.cap_models_array.includes(key)) {
                    params.select = {
                        ...params.select,
                        ...params.select?.[key],
                        [key]: undefined,
                    };
                    delete params.select?.[key];
                }
            }
        }
        if (params.where) {
            for (const key of Object.keys(params.where)) {
                if (db_models.db.cap_models_array.includes(key)) {
                    params.where = {
                        ...params.where,
                        ...params.where?.[key],
                        [key]: undefined,
                    };
                    delete params.where?.[key];
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
    set(value: any) {
        return this.item;
    }
}

export type Where = import("$/server/utils/JsDoc/assets/where.js").Where;
export type Include = import("$/server/utils/JsDoc/assets/include.js").Include;
export type Select = import("$/server/utils/JsDoc/assets/select.js").Select;

export interface exists_validator_parameters {
    model: import("$/server/utils/JsDoc/assets/models.js").Model;
    take?: number;
    skip?: number;
    parseInt: boolean;
    tx?: any;
    id_key: string;
    where?: Where;
    include?: Include;
    select?: Select;
    orderBy?: Object | Array<Object>;
}

export interface exists_setter_parameters {
    obj: Object;
    key: string;
}
export default [exists_validation_rule];

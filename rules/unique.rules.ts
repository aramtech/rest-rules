import env from "$/server/env.js";
import type { ModulesType } from "../../../modules/index.js";
import type { Translate } from "../index.js";
import type { RuleBase } from "./base.js";

class unique_validation_rule implements RuleBase{
    error_msg = "";
    item = null;
    status_code = env.response.status_codes.conflict;
    msg(field = "Field", _, t: Translate) {
        if (!this.error_msg) {
            return `${field} ${t("is not unique")}`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
    client = {} as ModulesType; 
    async rule(value: any, params: __unique_validator_parameters) {
        const tx = params?.tx || this.client;

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
        if (params?.except_id && params.except_id == item?.[params?.id_key as any]) {
            return true;
        }
        if (item) {
            return false;
        }
        return true;
    }
}

type Where = import("$/server/utils/JsDoc/assets/where.js").Where;

export interface __unique_validator_parameters {
    model: import("$/server/utils/JsDoc/assets/models.js").Model;
    unique_key: string;
    except_id?: number | string;
    tx?: any;
    id_key?: string;
    parseInt?: boolean;
    where?: Where;
}
export type __unique_setter_parameters = null;
export default [unique_validation_rule];

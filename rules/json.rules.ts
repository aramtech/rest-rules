import { local_log_decorator } from "$/server/utils/log/index.js";
import type { MultirulesFunction } from "../multirules.js";
import type { RuleBase } from "./base.js";

const log = await local_log_decorator("json rule", "yellow");

log("starting");
class json_validation_rule implements RuleBase {
    recursive = true;
    multirule: MultirulesFunction;
    constructor(multirule: MultirulesFunction) {
        this.multirule = multirule;
    }
    async rule(value, params) {
        const multirules = this.multirule;
        // make sure that the value is
        // either string or a object
        if (typeof value != "string" && typeof value != "object") {
            this.error_msg = `[field] must be either an JSON Object or a valid stringified JSON`;
            return false;
        }

        // if the value is string, then parse it
        if (typeof value == "string") {
            try {
                value = JSON.parse(value);
            } catch (error) {
                this.error_msg = "[field] is not a valid JSON string";
                return false;
            }
        }

        // if params.type then, we check if it is an object or value
        if (params?.type) {
            if (params.type === "array" && !Array.isArray(value)) {
                this.error_msg = `[field] must be an array. given value of type ${typeof value}`;
                return false;
            } else if (params.type == "object" && Array.isArray(value)) {
                this.error_msg = `[field] must be of type Object not Array`;
                return false;
            } else if (typeof value != params.type) {
                this.error_msg = `[field] must be of type ${params.type}. given value of type ${typeof value}`;
                return false;
            }
        }

        if (params?.multirules) {
            for (const rule of params.multirules) {
                rule[1] = value[rule[1]];
            }
            await multirules(params.multirules);
        }

        return true;
    }
    set(value: any, params: json_setter_parameters) {
        if (params?.type == "string") {
            if (typeof value == "string") {
                return value;
            } else {
                return JSON.stringify(value);
            }
        } else if (params?.type == "object") {
            if (typeof value == "string") {
                return JSON.parse(value);
            } else {
                return value;
            }
        } else {
            let return_base64;
            if (typeof value == "string") {
                return_base64 = value;
            } else {
                return_base64 = JSON.stringify(value);
            }
            return Buffer.from(return_base64).toString("base64");
        }
    }
    error_msg = "";
    msg(field = "Field") {
        if (!this.error_msg) {
            return `${field} is not a valid JSON`;
        } else {
            return this.error_msg.replaceAll("[field]", field);
        }
    }
}

export interface json_setter_parameters {
    type: "base64" | "string" | "object";
    obj: any;
    key: String;
}
export default [json_validation_rule];

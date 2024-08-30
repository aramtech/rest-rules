// @ts-nocheck
import { local_log_decorator } from "$/server/utils/log/index.js";

const log = await local_log_decorator("json rule", "yellow");

log("starting");
class json_validation_rule {
    recursive = true;
    multirule = null;
    constructor(multirule) {
        this.multirule = multirule;
    }
    async rule(value, params) {
        const multirules = this.multirule;
        // make sure that the value is
        // either string or a object
        if (typeof value != "string" && typeof value != "object") {
            this.error_msg = `[field] must be either an JSON Object or a valid strigified JSON`;
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
    set(value, params) {
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
/**
 * @typedef {Object} json_setter_parameters
 * @property {"base64"|"string"|"object"} type
 * @property {Object} obj
 * @property {String} key
 */
export default [json_validation_rule];

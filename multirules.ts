// rules
import { local_log_decorator } from "$/server/utils/log/index.js";

const log = await local_log_decorator("multirule utility", "yellow", true);

log("starting");

const rules = (await import("./index.js")).default;
log("imported rules util");

export type RuleName = "title" | "number" | "datestring" | "email" | "name" | "timestamp" | "address" | "array" | "boolean" | "condition" | "description" | "exists" | "unique" | "json" | "latitude" | "longitude" | "phone" | "url" | "required" | "password" | "timestring" | "timezone" | "username" | "weekdaystring" | "in" | "hexadecimal";

export type JSONRuleArray = [Array<RuleName>, String, String, RuleValidationParameters?, RuleSetterParameters?];

export interface JSONRule {
    rules: Array<RuleName>;
    value: String;
    field_name: string;
    validation_parameters: RuleValidationParameters;
    setter_parameters: RuleSetterParameters;
}

export type JSONMultirules = Array<JSONRule | JSONRuleArray>;

export interface json_validator_parameters {
    multirules?: JSONMultirules;
    type: "string" | "object" | "array" | "number" | "boolean";
}

export interface RuleValidationParameters {
    title?: import("./rules/title.rules.js").title_validator_parameters;
    hexadecimal?: import("./rules/hexadecimal.rules.js").hexadecimal_validator_parameters;
    in?: import("./rules/in.rules.js").in_validator_parameters;
    number?: import("./rules/number.rules.js").number_validator_parameters;
    datestring?: import("./rules/datestring.rules.js").datestring_validator_parameters;
    email?: import("./rules/email.rules.js").email_validator_parameters;
    timestamp?: import("./rules/timestamp.rules.js").timestamp_validator_parameters;
    address?: import("./rules/address.rules.js").address_validator_parameters;
    array?: import("./rules/array.rules.js").array_validator_parameters;
    boolean?: import("./rules/boolean.rules.js").boolean_validator_parameters;
    description?: import("./rules/description.rules.js").description_validator_parameters;
    exists?: import("./rules/exists.rules.js").exists_validator_parameters;
    condition?: import("./rules/condition.rules.js").condition_validator_parameters;
    unique?: import("./rules/unique.rules.js").__unique_validator_parameters;
    json?: json_validator_parameters;
    phone?: import("./rules/phone.rules.js").phone_validator_parameters;
    latitude?: import("./rules/latitude.rules.js").latitude_validator_parameters;
    longitude?: import("./rules/longitude.rules.js").longitude_validator_parameters;
    url?: import("./rules/url.rules.js").url_validator_parameters;
    required?: import("./rules/required.rules.js").required_validator_parameters;
    password?: import("./rules/password.rules.js").password_validator_parameters;
    timestring?: import("./rules/timestring.rules.js").timestring_validator_parameters;
    timezone?: import("./rules/timezone.rules.js").timezone_validator_parameters;
    username?: import("./rules/username.rules.js").username_validator_parameters;
    weekdaystring?: import("./rules/weekdaystring.rules.js").weekdaystring_validator_parameters;
    name?: import("./rules/name.rules.js").name_validator_parameters;
}

export interface RuleSetterParameters {
    title?: import("./rules/title.rules.js").title_setter_parameters;
    hexadecimal?: import("./rules/hexadecimal.rules.js").hexadecimal_setter_parameters;
    in?: import("./rules/in.rules.js").in_setter_parameters;
    number?: import("./rules/number.rules.js").number_setter_parameters;
    datestring?: import("./rules/datestring.rules.js").datestring_setter_parameters;
    email?: import("./rules/email.rules.js").email_setter_parameters;
    timestamp?: import("./rules/timestamp.rules.js").timestamp_setter_parameters;
    address?: import("./rules/address.rules.js").address_setter_parameters;
    array?: import("./rules/array.rules.js").array_setter_parameters;
    boolean?: import("./rules/boolean.rules.js").boolean_setter_parameters;
    description?: import("./rules/description.rules.js").description_setter_parameters;
    exists?: import("./rules/exists.rules.js").exists_setter_parameters;
    condition?: import("./rules/condition.rules.js").condition_setter_parameters;
    unique?: import("./rules/unique.rules.js").__unique_setter_parameters;
    json?: import("./rules/json.rules.js").json_setter_parameters;
    phone?: import("./rules/phone.rules.js").phone_setter_parameters;
    latitude?: import("./rules/latitude.rules.js").latitude_setter_parameters;
    longitude?: import("./rules/longitude.rules.js").longitude_setter_parameters;
    url?: import("./rules/url.rules.js").url_setter_parameters;
    required?: import("./rules/required.rules.js").required_setter_parameters;
    password?: import("./rules/password.rules.js").password_setter_parameters;
    timestring?: import("./rules/timestring.rules.js").timestring_setter_parameters;
    timezone?: import("./rules/timezone.rules.js").timezone_setter_parameters;
    username?: import("./rules/username.rules.js").username_setter_parameters;
    weekdaystring?: import("./rules/weekdaystring.rules.js").weekdaystring_setter_parameters;
    name?: import("./rules/name.rules.js").name_setter_parameters;
}

export interface Rule {
    rules: Array<RuleName>;
    value: any;
    field_name: string;
    validation_parameters: RuleValidationParameters;
    setter_parameters: RuleSetterParameters;
}

export type RuleArray = [Array<RuleName>, any, String, RuleValidationParameters?, RuleSetterParameters?];

export type Multirules = Array<Rule | RuleArray>;

export interface GeneralOptions {
    lang?: import("$/server/utils/internationalization/index.js").LanguagesKey;
}

const multirule = async (validators: Multirules, options: undefined | GeneralOptions = undefined, __recursive: boolean | null | undefined = false) => {
    for (const validator of validators) {
        await rules({
            _rules: validator[0],
            value: validator[1],
            field_name: validator[2],
            args: validator[3],
            source_obj: validator[4],
            recursive: __recursive || false,
            multirule: multirule,
            general_options: options,
        });
    }
    return { valid: true, msg: "" };
};
export type MultirulesFunction = typeof multirule

export default multirule;

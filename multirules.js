// @ts-nocheck
// rules
import { local_log_decorator } from "$/server/utils/log/index.js";

const log = await local_log_decorator("multirule utility", "yellow", true);

log("starting");

const rules = (await import("./index.js")).default;
log("imported rules util");

/**
 * @typedef {"title"|"number"|"datestring"|"email"|"name"|"timestamp"|"address"|"array"|"boolean"|"condition"|"description"|"exists"|"unique"|"json"|"latitude"|"longitude"|"phone"|"url"|"required"|"password"|"timestring"|"timezone"|"username"|"weekdaystring"|"in"|"hexadecimal"} RuleName
 */

/**
 * @typedef {[Array<RuleName>, String, String, RuleValidationParameters, RuleSetterParameters]} JSONRuleArray
 *
 */

/**
 * @typedef {Object} JSONRule
 * @property {Array<RuleName>} rules - rules to be applied on the value
 * @property {String} value - key of the child to be validated
 * @property {string} field_name - Name of the value for display
 * @property {RuleValidationParameters} validation_parameters - validation parameter
 * @property {RuleSetterParameters} setter_parameters - setter parameters
 */

/**
 * @typedef {Array<JSONRule | JSONRuleArray>} JSONMultirules
 */

/**
 * @typedef {Object} json_validator_parameters
 * @property {JSONMultirules} [multirules]
 * @property {"string"|"object"|"array"|"number"|"boolean"} type
 *
 */

/**
 *
 * @typedef {Object} RuleValidationParameters
 * @property {import("./rules/title.rules.js").title_validator_parameters} [title]
 * @property {import("./rules/hexadecimal.rules.js").hexadecimal_validator_parameters} [hexadecimal]
 * @property {import("./rules/in.rules.js").in_validator_parameters} [in]
 * @property {import("./rules/number.rules.js").number_validator_parameters} [number]
 * @property {import("./rules/datestring.rules.js").datestring_validator_parameters} [datestring]
 * @property {import("./rules/email.rules.js").email_validator_parameters} [email]
 * @property {import("./rules/timestamp.rules.js").timestamp_validator_parameters} [timestamp]
 * @property {import("./rules/address.rules.js").address_validator_parameters} [address]
 * @property {import("./rules/array.rules.js").array_validator_parameters} [array]
 * @property {import("./rules/boolean.rules.js").boolean_validator_parameters} [boolean]
 * @property {import("./rules/description.rules.js").description_validator_parameters} [description]
 * @property {import("./rules/exists.rules.js").exists_validator_parameters} [exists]
 * @property {import("./rules/condition.rules.js").condition_validator_parameters} [condition]
 * @property {import("./rules/unique.rules.js").__unique_validator_parameters} [unique]
 * @property {json_validator_parameters} [json]
 * @property {import("./rules/phone.rules.js").phone_validator_parameters} [phone]
 * @property {import("./rules/latitude.rules.js").latitude_validator_parameters} [latitude]
 * @property {import("./rules/longitude.rules.js").longitude_validator_parameters} [longitude]
 * @property {import("./rules/url.rules.js").url_validator_parameters} [url]
 * @property {import("./rules/required.rules.js").required_validator_parameters} [required]
 * @property {import("./rules/password.rules.js").password_validator_parameters} [password]
 * @property {import("./rules/timestring.rules.js").timestring_validator_parameters} [timestring]
 * @property {import("./rules/timezone.rules.js").timezone_validator_parameters} [timezone]
 * @property {import("./rules/username.rules.js").username_validator_parameters} [username]
 * @property {import("./rules/weekdaystring.rules.js").weekdaystring_validator_parameters} [weekdaystring]
 * @property {import("./rules/name.rules.js").name_validator_parameters} [name]
 */

/**
 *
 * @typedef {Object} RuleSetterParameters
 * @property {import("./rules/title.rules.js").title_setter_parameters} [title]
 * @property {import("./rules/hexadecimal.rules.js").hexadecimal_setter_parameters} [hexadecimal]
 * @property {import("./rules/in.rules.js").in_setter_parameters} [in]
 * @property {import("./rules/number.rules.js").number_setter_parameters} [number]
 * @property {import("./rules/datestring.rules.js").datestring_setter_parameters} [datestring]
 * @property {import("./rules/email.rules.js").email_setter_parameters} [email]
 * @property {import("./rules/timestamp.rules.js").timestamp_setter_parameters} [timestamp]
 * @property {import("./rules/address.rules.js").address_setter_parameters} [address]
 * @property {import("./rules/array.rules.js").array_setter_parameters} [array]
 * @property {import("./rules/boolean.rules.js").boolean_setter_parameters} [boolean]
 * @property {import("./rules/description.rules.js").description_setter_parameters} [description]
 * @property {import("./rules/exists.rules.js").exists_setter_parameters} [exists]
 * @property {import("./rules/condition.rules.js").condition_setter_parameters} [condition]
 * @property {import("./rules/unique.rules.js").__unique_setter_parameters} [unique]
 * @property {import("./rules/json.rules.js").json_setter_parameters} [json]
 * @property {import("./rules/phone.rules.js").phone_setter_parameters} [phone]
 * @property {import("./rules/latitude.rules.js").latitude_setter_parameters} [latitude]
 * @property {import("./rules/longitude.rules.js").longitude_setter_parameters} [longitude]
 * @property {import("./rules/url.rules.js").url_setter_parameters} [url]
 * @property {import("./rules/required.rules.js").required_setter_parameters} [required]
 * @property {import("./rules/password.rules.js").password_setter_parameters} [password]
 * @property {import("./rules/timestring.rules.js").timestring_setter_parameters} [timestring]
 * @property {import("./rules/timezone.rules.js").timezone_setter_parameters} [timezone]
 * @property {import("./rules/username.rules.js").username_setter_parameters} [username]
 * @property {import("./rules/weekdaystring.rules.js").weekdaystring_setter_parameters} [weekdaystring]
 * @property {import("./rules/name.rules.js").name_setter_parameters} [name]
 */

/**
 * @typedef {Object} Rule
 * @property {Array<RuleName>} rules - rules to be applied on the value
 * @property {*} value - value
 * @property {string} field_name - Name of the value for display
 * @property {RuleValidationParameters} validation_parameters - validation parameter
 * @property {RuleSetterParameters} setter_parameters - setter parameters
 */

/**
 * @typedef {[Array<RuleName>, *, String, RuleValidationParameters?, RuleSetterParameters?]} RuleArray
 *
 */

/**
 * @typedef {Array<Rule | RuleArray>} Multirules
 */

/**
 * @typedef {object} GeneralOptions
 * @property {import("$/server/utils/internationalization/index.js").LanguagesKey} [lang]
 */

/**
 *
 * @param {Multirules} validators
 * @param {GeneralOptions} [options]
 * @param {boolean | null | undefined} __recursive
 */
const multirule = async (validators, options = undefined, __recursive = false) => {
    for (const validator of validators) {
        await rules({
            _rules: validator[0],
            value: validator[1],
            field_name: validator[2],
            args: validator[3],
            source_obj: validator[4],
            recursive: __recursive,
            multirule: multirule,
            general_options: options,
        });
    }
    return { valid: true, msg: "" };
};

export default multirule;

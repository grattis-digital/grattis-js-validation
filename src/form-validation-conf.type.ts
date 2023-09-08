
import { FormAlertClassConf } from "./form-alert-conf.type"
import { Validator } from "./validator.interface"

export type FormElementValidationConf = {
    validatorList: Validator[],
    formElementName: string
}

export type FormValidationConf = {
    errorStateMarkerClass: string;
    elements: FormElementValidationConf[],
    formName: string,
    alertClassConf: FormAlertClassConf
}
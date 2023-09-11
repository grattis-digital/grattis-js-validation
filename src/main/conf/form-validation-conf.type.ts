
import { FormAlertClassConf } from "./form-alert-conf.type"
import { Validator } from "../validator/validator.interface"

export type FormElementValidationConf = {
    validatorList: Validator<any>[],
    formElementName: string
}

export type FormValidationConf = {
    errorStateMarkerClass: string;
    elements: FormElementValidationConf[],
    formName: string,
    alertClassConf: FormAlertClassConf
}
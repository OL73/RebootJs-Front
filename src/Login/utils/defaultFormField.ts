import { IFormField, IPasswordField } from "../types";

export function defaultStringFormField(): IFormField<string>{
  return {
    value: "",
    isValid: true,
  }
}

export function defaultPasswordFormField(): IPasswordField {
  return {
    ...defaultStringFormField(),
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    hasSymbol: false,
    hasValidLength: false,
  }
}
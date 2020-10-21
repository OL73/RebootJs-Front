export interface IFormField<T> {
  value: T;
  isValid: boolean;
  error?: string;
}

export interface IPasswordField extends IFormField<string> {
  hasLower: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasValidLength: boolean;
}

export type RegisterFormKey = 'email' | 'password' | 'firstname' | 'lastname' | 'confirmation';

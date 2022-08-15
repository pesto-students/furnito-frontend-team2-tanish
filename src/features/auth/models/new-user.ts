import { RegisterFormField } from "./register-form-filed.model";

export type NewUser = Omit<RegisterFormField, "confirmPassword">;

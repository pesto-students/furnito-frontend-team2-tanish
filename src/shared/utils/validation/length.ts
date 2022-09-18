import { ValidatorFn } from "./models/validation";
import { LengthOptions } from "./models/options/length-options";

const validateLength: ValidatorFn = (
  text: string,
  options?: LengthOptions,
): boolean => {
  const textLength = text.trim().length;

  if (options?.min && textLength < options.min) return false;
  if (options?.max && textLength > options.max) return false;

  return true;
};

const validateNameLength: ValidatorFn = (text: string): boolean => {
  return validateLength(text, { min: 2 });
};

const validateStockLength: ValidatorFn = (text: string): boolean => {
  return validateLength(text, { min: 1, max: 3 });
};

const validatePasswordLength: ValidatorFn = (text: string): boolean => {
  return validateLength(text, { min: 6, max: 20 });
};

export { validateNameLength, validateStockLength, validatePasswordLength };

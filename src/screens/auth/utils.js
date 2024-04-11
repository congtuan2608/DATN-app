import { validateLength, validateEmail } from "~utils";

export const defaultConfig = {
  isError: false,
  errorColor: "red",
  message: "",
};
export const validate = ({
  input,
  required,
  min,
  max,
  type,
  label,
  config,
  formValues,
}) => {
  if (required && (!input || input === ""))
    return {
      ...defaultConfig,
      isError: true,
      message: label || `Please enter your input`,
    };

  if (input && min && input.length < min) {
    return {
      ...defaultConfig,
      isError: true,
      message: validateLength(input, min, max) || "",
    };
  }

  if (input && max && input.length > max) {
    return {
      ...defaultConfig,
      isError: true,
      message: validateLength(input, min, max) || "",
    };
  }

  if (input && type === "email") {
    if (!validateEmail(input)) {
      return {
        ...defaultConfig,
        isError: true,
        message: "Email is invalid",
      };
    }
  }
  if (input && type === "compare" && config && config?.ref && formValues) {
    if (input !== formValues[config?.ref])
      return {
        ...defaultConfig,
        isError: true,
        message: config?.label || "Confirm does not match",
      };
  }
  return defaultConfig;
};

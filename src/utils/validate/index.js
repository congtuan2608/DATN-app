export const validateEmail = (email) => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-]+\.com$/;
  return regex.test(email);
};
export const defaultConfig = {
  isError: false,
  message: "",
};

export const validateLength = (text, min = 0, max = 100, label) => {
  if (!text) return null;

  if (text.length < min) {
    return label || `Please enter a minimum of ${min} characters`;
  }

  if (text.length > max) {
    return label || `Please enter a maximum of ${max} characters`;
  }

  return null;
};

export const validateInput = ({
  input,
  required,
  min,
  max,
  type,
  label,
  config,
  formValues,
  minValue,
  maxValue,
}) => {
  if (required && (!input || input === ""))
    return {
      ...defaultConfig,
      isError: true,
      message: label || `This field is required`,
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
  if (input && type === "string") {
    if (typeof input !== "string") {
      return {
        ...defaultConfig,
        isError: true,
        message: "This field must be a string",
      };
    }
  }
  if (input && type === "number") {
    if (typeof input !== "number") {
      return {
        ...defaultConfig,
        isError: true,
        message: "This field must be a number",
      };
    }
    if (input < minValue) {
      return {
        ...defaultConfig,
        isError: true,
        message: `This field must be greater than ${minValue}`,
      };
    }
    if (input > maxValue) {
      return {
        ...defaultConfig,
        isError: true,
        message: `This field must be less than ${maxValue}`,
      };
    }
  }
  if (input && type === "array") {
    if (input.length === 0) {
      return {
        ...defaultConfig,
        isError: true,
        message: label || "Please select at least one option",
      };
    }
  }
  if (input && type === "date") {
    if (isNaN(new Date(input))) {
      return {
        ...defaultConfig,
        isError: true,
        message: label || " Please select a valid date",
      };
    }
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
  return null;
};

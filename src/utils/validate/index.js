export const validateEmail = (email) => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
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

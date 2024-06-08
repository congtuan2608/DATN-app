import React from "react";
import { validateInput } from "~utils";

export function useForm({ initialValues = {}, validateSchema = {} }) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});

  const handleBlur = (key) => {
    const newError = validateInput({
      ...validateSchema[key],
      input: values[key],
      formValues: values,
    });
    if (newError) {
      setErrors((prev) => ({ ...prev, [key]: newError }));
    }
  };

  const handleFocus = (key) => {
    setErrors((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };
  const handleChange = (key, props) => {
    setValues((prev) => ({
      ...prev,
      [key]: typeof props === "function" ? props(values[key]) : props,
    }));
  };
  const handleSelect = (key, props) => {
    setValues((prev) => ({
      ...prev,
      [key]: typeof props === "function" ? props(values[key]) : props,
    }));
  };
  const handleSubmit = () => {
    const keys = Object.keys(values);
    const newArrErrors = keys
      .map((key) => {
        const newError = validateInput({
          ...validateSchema[key],
          input: values[key],
          formValues: values,
        });
        if (newError) {
          return { [key]: newError };
        }
      })
      .filter((item) => item);

    if (newArrErrors.length > 0) {
      setErrors(
        newArrErrors.reduce((acc, item) => {
          return { ...acc, ...item };
        }, {})
      );
      return { isSuccess: false, errors: newArrErrors, values: undefined };
    }

    return { isSuccess: true, values, errors: undefined };
  };
  const resetForm = () => {
    setValues(initialValues);
  };
  const removeError = (key) => {
    setErrors((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };
  const setInitialValues = React.useCallback((newValues) => {
    setValues(newValues);
  }, []);
  return {
    values,
    initialValues,
    errors,
    setErrors,
    removeError,
    handleBlur,
    handleFocus,
    handleChange,
    handleSelect,
    handleSubmit,
    resetForm,
    setInitialValues,
  };
}

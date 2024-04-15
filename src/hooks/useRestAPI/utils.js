import axios from "axios";

const returnType = (data) => {
  if (data === "string") return true;
  if (data === "number") return true;
  if (data === "boolean") return true;
  return false;
};

export async function getAxiosRequestFn(request, configs) {
  try {
    const response = await axios[request.method](...request.configs);

    let defaultResults = { status: response.status };

    if (returnType(response.data))
      return { ...defaultResults, details: response.data };

    if (Array.isArray(response.data))
      return { ...defaultResults, results: response.data };

    return { ...defaultResults, ...response.data };
  } catch (error) {
    if (configs?.errorReturn) {
      console.error(error);
      return { status: error.status, detail: error.data };
    }

    throw error;
  }
}

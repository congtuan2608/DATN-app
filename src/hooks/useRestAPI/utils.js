import axios from "axios";
export async function getAxiosRequestFn(request, configs) {
  try {
    const response = await axios[request.method](...request.configs);
    return { ...response.data, status: response.status };
  } catch (error) {
    if (configs?.errorReturn) {
      console.error(error);
      return { status: error.status, detail: error.data };
    }
    throw error;
  }
}

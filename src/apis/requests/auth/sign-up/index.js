import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function SignUp() {
  return useRestAPIMutation({
    request: (params) => {
      const formData = new FormData();
      Object.entries(params).map(([key, value], index) => {
        if (key === "avatar" && value) {
          return formData.append(key, {
            uri: value.uri || "",
            type: value?.mimeType || "image/jpeg",
            name: value?.fileName || String(Date.now()),
          });
        }
        return formData.append(key, value);
      });
      return {
        method: HTTPMethod.POST,
        configs: [
          APIPaths.SignUp,
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        ],
      };
    },
  });
}

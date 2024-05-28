import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function UpdateProfile() {
  return useRestAPIMutation({
    request: (params) => {
      const formData = new FormData();
      Object.entries(params).map(([key, value], index) => {
        if (uri in value) {
          return formData.append(key, {
            uri: value.uri || "",
            type: value?.mimeType || "image/jpeg",
            name: value?.fileName || String(Date.now()),
          });
        }
        return formData.append(key, value);
      });

      return {
        method: HTTPMethod.PATCH,
        configs: [
          APIPaths.User,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
            // headers: {
            //   "Content-Type": "application/x-www-form-urlencoded",
            // },
          },
        ],
      };
    },
  });
}

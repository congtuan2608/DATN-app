import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";
import queryString from "query-string";

export function Login() {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.POST,
      configs: [
        APIPaths.Login,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      ],
    }),
    configs: {
      errorReturn: true,
    },
  });
}

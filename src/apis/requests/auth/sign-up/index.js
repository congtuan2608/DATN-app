import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";
import queryStringfrom from "query-string";

export function SignUp() {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.POST,
      configs: [
        APIPaths.SignUp,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      ],
    }),
  });
}

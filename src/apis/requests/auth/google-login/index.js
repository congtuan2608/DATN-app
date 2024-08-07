import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function GoogleLogin() {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.POST,
      configs: [APIPaths.GoogleLogin, params],
    }),
  });
}

import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function GoogleLogin() {
  return useRestAPIMutation({
    method: HTTPMethod.POST,
    configs: [APIPaths.GoogleLogin, params],
  });
}

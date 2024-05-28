import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function VerifyOTP() {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.POST,
      configs: [APIPaths.VerifyOTP, params],
    }),
    otherConfigs: { returnStatus: true },
  });
}

import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function MomoRequest() {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.POST,
      configs: [APIPaths.MomoRequestPayment, params],
    }),
  });
}

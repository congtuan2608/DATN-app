import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function UpdateCampaign() {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.PATCH,
      configs: [APIPaths.UpdateCampaign, { params }],
    }),
  });
}

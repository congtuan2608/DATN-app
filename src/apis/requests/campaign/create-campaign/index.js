import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function CreateCampaign() {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.POST,
      configs: [APIPaths.CreateCampaign, { params }],
    }),
  });
}

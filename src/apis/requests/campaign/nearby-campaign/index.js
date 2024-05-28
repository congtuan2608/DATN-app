import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function GetNearbyCampaigns() {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [APIPaths.NearbyCampaign, { params }],
    }),
    queryKey: ["NearbyCampaign"],
  });
}

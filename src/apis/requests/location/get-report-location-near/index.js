import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function GetReportLocationNear() {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [APIPaths.ContaminatedLocationNear, { params }],
    }),
    queryKey: ["ContaminatedLocationNear"],
  });
}

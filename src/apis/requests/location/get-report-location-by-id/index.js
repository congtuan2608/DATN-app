import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function GetReportLocationById() {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [`${APIPaths.ContaminatedLocation}/${params.id}`],
    }),
  });
}

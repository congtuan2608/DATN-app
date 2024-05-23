import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIQuery } from "~hooks/useRestAPI";

export function GetReportLocation() {
  return useRestAPIQuery({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [APIPaths.ContaminatedLocation, params],
    }),
    queryKey: ["ContaminatedLocation"],
  });
}

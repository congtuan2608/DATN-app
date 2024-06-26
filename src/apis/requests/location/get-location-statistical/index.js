import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIQuery } from "~hooks/useRestAPI";

export function GetLocationStatistical() {
  return useRestAPIQuery({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [APIPaths.LocationStatistical, params],
    }),
    queryKey: ["LocationStatistical"],
  });
}

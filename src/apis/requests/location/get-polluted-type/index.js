import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIQuery } from "~hooks/useRestAPI";

export function GetPollutedType() {
  return useRestAPIQuery({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [APIPaths.ContaminatedType],
    }),
    queryKey: ["ContaminatedType"],
  });
}

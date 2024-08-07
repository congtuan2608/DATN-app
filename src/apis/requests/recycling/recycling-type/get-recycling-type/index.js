import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIQuery } from "~hooks/useRestAPI";

export function GetRecyclingType() {
  return useRestAPIQuery({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [APIPaths.RecyclingType],
    }),
    queryKey: ["RecyclingType"],
    cacheTime: 15 * 60 * 1000,
    staleTime: 15 * 60 * 1000,
  });
}

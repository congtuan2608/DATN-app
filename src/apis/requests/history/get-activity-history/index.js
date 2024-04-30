import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIQuery } from "~hooks/useRestAPI";

export const GetActivityHistory = () => {
  return useRestAPIQuery({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [APIPaths.HistoryActivityType],
    }),
    queryKey: ["HistoryActivityType"],
    cacheTime: 15 * 60 * 1000,
    staleTime: 15 * 60 * 1000,
  });
};

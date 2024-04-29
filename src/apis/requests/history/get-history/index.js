import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIQuery } from "~hooks/useRestAPI";

export const GetHistory = async () => {
  return useRestAPIQuery({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [APIPaths.History, { params }],
    }),
    queryKey: ["History"],
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
};

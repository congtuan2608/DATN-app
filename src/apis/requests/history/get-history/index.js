import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export const GetHistory = () => {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [APIPaths.History, { params }],
    }),
  });
};

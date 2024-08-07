import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function GetRecyclingGuide() {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [APIPaths.RecyclingGuide, { params }],
    }),
  });
}

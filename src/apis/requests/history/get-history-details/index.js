import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function GetHistoryDetails() {
  return useRestAPIMutation({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [`${APIPaths.HistoryDetails}/${params.id}`],
    }),
  });
}

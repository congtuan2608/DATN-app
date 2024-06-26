import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIQuery } from "~hooks/useRestAPI";

export function GetAirPrediction() {
  return useRestAPIQuery({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [APIPaths.GetAirPrediction],
    }),
    queryKey: ["GetAirPrediction"],
  });
}

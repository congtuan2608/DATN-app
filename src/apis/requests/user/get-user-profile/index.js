import { useRecoilState } from "recoil";
import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIQuery } from "~hooks/useRestAPI";
import { SYSTEM_STATE } from "~states";

export function GetUserProfile() {
  const [authData] = useRecoilState(SYSTEM_STATE.AuthData);

  return useRestAPIQuery({
    request: (params) => ({
      method: HTTPMethod.GET,
      configs: [APIPaths.GetUserProfile],
    }),
    queryKey: ["GetUserProfile"],
    enabled: authData?.access_token ? true : false,
    cacheTime: 15 * 60 * 1000,
    staleTime: 15 * 60 * 1000,
  });
}

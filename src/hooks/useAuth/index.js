import AsyncStorage from "@react-native-async-storage/async-storage";
import { SYSTEM_STATE } from "~states";
import { AsyncStorageKey } from "~configs";
import { useRecoilState } from "recoil";
import React from "react";

export const useAuth = () => {
  const [authData, setAuthData] = useRecoilState(SYSTEM_STATE.AuthData);
  const [appConfigs, setAppConfigs] = useRecoilState(SYSTEM_STATE.AppConfigs);
  const [userProfile, setUserProfile] = useRecoilState(
    SYSTEM_STATE.UserProfile
  );

  const login = React.useCallback(async (authData) => {
    await AsyncStorage.setItem(
      AsyncStorageKey.ACCESS_TOKEN,
      authData.access_token
    );
    await AsyncStorage.setItem(
      AsyncStorageKey.REFRESH_TOKEN,
      authData.refresh_token
    );
    await AsyncStorage.setItem(AsyncStorageKey.NEW_USER, "false");

    setAuthData(authData);
    setAppConfigs((prev) => ({ ...prev, firstInit: true }));
  }, []);

  const logout = React.useCallback(async () => {
    await AsyncStorage.removeItem(AsyncStorageKey.ACCESS_TOKEN);
    await AsyncStorage.removeItem(AsyncStorageKey.REFRESH_TOKEN);

    // await AsyncStorage.removeItem(AsyncStorageKey.NEW_USER);
    // queryClient.removeQueries({ queryKey: ['GetUserProfile'] })
    setAuthData(undefined);
    setAppConfigs((prev) => ({ ...prev, firstInit: true }));
    // GoogleSignin.signOut()
  }, []);

  const isInitializingApp = React.useMemo(
    () => appConfigs.firstInit === false,
    [appConfigs.firstInit]
  );
  const isLoggedIn = React.useMemo(
    () => authData?.access_token && isInitializingApp === false,
    [authData, isInitializingApp]
  );

  //   React.useEffect(() => {
  //     if (getUserProfile.data) {
  //       setUserProfile(getUserProfile.data)
  //     }
  //   }, [getUserProfile.data])
  const refetchUserProfile = React.useCallback(async () => {
    // await getUserProfile.refetch()
  }, []);

  return {
    login,
    logout,
    isInitializingApp,
    isLoggedIn,
    refetchUserProfile,
    appConfigs,
  };
};

import AsyncStorage from "@react-native-async-storage/async-storage";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Platform } from "react-native";
import { useRecoilState } from "recoil";
import { RestAPI } from "~apis";
import { AsyncStorageKey } from "~configs";
import { SYSTEM_STATE } from "~states";
let Google;
if (Platform.OS !== "ios") {
  Google = require("@react-native-google-signin/google-signin");
}
export const useAuth = () => {
  const [authData, setAuthData] = useRecoilState(SYSTEM_STATE.AuthData);
  const [appConfigs, setAppConfigs] = useRecoilState(SYSTEM_STATE.AppConfigs);
  const [userProfile, setUserProfile] = useRecoilState(
    SYSTEM_STATE.UserProfile
  );
  const getUserProfile = RestAPI.GetUserProfile();
  const queryClient = useQueryClient();

  const login = React.useCallback(async (authData) => {
    await AsyncStorage.setItem(
      AsyncStorageKey.ACCESS_TOKEN,
      authData.access_token
    );
    await AsyncStorage.setItem(
      AsyncStorageKey.REFRESH_TOKEN,
      authData.refresh_token
    );
    setAuthData(authData);
    setAppConfigs((prev) => ({ ...prev, firstInit: true }));
  }, []);

  const logout = React.useCallback(async () => {
    await AsyncStorage.removeItem(AsyncStorageKey.ACCESS_TOKEN);
    await AsyncStorage.removeItem(AsyncStorageKey.REFRESH_TOKEN);

    queryClient.removeQueries({ queryKey: ["GetUserProfile"] });
    setAuthData(undefined);
    setAppConfigs((prev) => ({ ...prev, firstInit: true }));
    Google.GoogleSignin.signOut();
  }, []);

  const isInitializingApp = React.useMemo(
    () => appConfigs.firstInit === false,
    [appConfigs.firstInit]
  );
  const isLoggedIn = React.useMemo(
    () => authData?.access_token && isInitializingApp === false,
    [authData, isInitializingApp]
  );

  const refetchUserProfile = React.useCallback(async () => {
    await getUserProfile.refetch();
  }, []);

  React.useEffect(() => {
    if (getUserProfile.data) {
      setUserProfile(getUserProfile.data);
    }
  }, [getUserProfile.data]);

  const isUserProfileLoading = getUserProfile.isLoading;

  return {
    login,
    logout,
    isInitializingApp,
    isLoggedIn,
    refetchUserProfile,
    appConfigs,
    userProfile,
    isUserProfileLoading,
  };
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SYSTEM_STATE } from "~states";
import { AsyncStorageKey } from "~configs";
import { useRecoilState } from "recoil";
import React from "react";
import * as Location from "expo-location";

export const useLocation = () => {
  const [location, setLocation] = useRecoilState(SYSTEM_STATE.Location);

  const getCurrentLocation = React.useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let getLocation = await Location.getCurrentPositionAsync({});
    console.log(getLocation.coords);
    setLocation(getLocation.coords);
    return getLocation.coords;
  }, []);

  return {
    location,
    getCurrentLocation,
  };
};

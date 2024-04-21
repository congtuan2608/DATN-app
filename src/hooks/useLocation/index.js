import * as Location from "expo-location";
import React from "react";
import { useRecoilState } from "recoil";
import { SYSTEM_STATE } from "~states";

const formatted = ({ streetNumber, street, district, city, region }) => {
  return `${streetNumber ?? ""} ${street ?? ""} ${district ?? ""} ${
    city ?? ""
  } ${region ?? ""}`;
};

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

  const reverseGeocodeAsync = React.useCallback(async (props) => {
    let getRreverseGeocode = await Location.reverseGeocodeAsync(props);
    console.log(getRreverseGeocode[0]);
    if (!getRreverseGeocode[0]?.formattedAddress) {
      getRreverseGeocode[0].formattedAddress = formatted(
        getRreverseGeocode[0]
      ).trim();
    }
    return getRreverseGeocode[0];
  }, []);

  const geocodeAsync = React.useCallback(async (props) => {
    let getGeocodeAsync = await Location.geocodeAsync(props);
    return getGeocodeAsync[0];
  }, []);

  return {
    location,
    getCurrentLocation,
    reverseGeocodeAsync,
    geocodeAsync,
  };
};

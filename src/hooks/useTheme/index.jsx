import React from "react";
import { GetTheme } from "~utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SYSTEM_STATE } from "../../states";
import { useRecoilState } from "recoil";

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(SYSTEM_STATE.ThemeData);

  // React.useEffect(() => {
  //   const getStorage = async () => {
  //     const THEME = await AsyncStorage.getItem("THEME");
  //     setTypeTheme(THEME);
  //   };
  //   getStorage();
  // }, []);

  // React.useEffect(() => {
  //   setTheme(GetTheme(typeTheme));
  // }, [typeTheme]);

  const changeTheme = React.useCallback(async (type) => {
    if (!type) await AsyncStorage.removeItem("THEME");
    else {
      await AsyncStorage.setItem("THEME", type);
    }
    setTheme(GetTheme(type));
  }, []);

  return { theme, changeTheme };
};

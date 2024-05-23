import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useRecoilState } from "recoil";
import { GetTheme } from "~utils";
import { SYSTEM_STATE } from "../../states";

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(SYSTEM_STATE.ThemeData);
  const [currentTheme, setCurrentTheme] = React.useState("DefaultTheme");

  const initTheme = React.useCallback(async () => {
    const theme = await AsyncStorage.getItem("THEME");
    if (!theme) {
      await AsyncStorage.setItem("THEME", "DefaultTheme");
      return;
    }
    setTheme(GetTheme(theme));
  }, []);

  const changeTheme = React.useCallback(async (type) => {
    if (!type) await AsyncStorage.removeItem("THEME");
    else {
      await AsyncStorage.setItem("THEME", type);
    }
    setTheme(GetTheme(type));
  }, []);

  React.useEffect(() => {
    (async () => {
      const themeKey = await AsyncStorage.getItem("THEME");
      setCurrentTheme(themeKey);
    })();
  }, [theme]);

  return { theme, currentTheme, initTheme, changeTheme };
};

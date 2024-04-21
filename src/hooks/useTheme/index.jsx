import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useRecoilState } from "recoil";
import { GetTheme } from "~utils";
import { SYSTEM_STATE } from "../../states";

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(SYSTEM_STATE.ThemeData);

  const changeTheme = React.useCallback(async (type) => {
    if (!type) await AsyncStorage.removeItem("THEME");
    else {
      await AsyncStorage.setItem("THEME", type);
    }
    setTheme(GetTheme(type));
  }, []);

  return { theme, changeTheme };
};

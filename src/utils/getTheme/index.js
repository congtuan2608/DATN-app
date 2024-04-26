import { ThemeConfigs } from "~themes";

export const GetTheme = (type = undefined) => {
  return ThemeConfigs[type] ?? ThemeConfigs.DefaultTheme;
};

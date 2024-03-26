import { ThemeConfig } from "~themes";

export const GetTheme = (type = undefined) => {
  return ThemeConfig[type] ?? ThemeConfig.DefaultTheme;
};

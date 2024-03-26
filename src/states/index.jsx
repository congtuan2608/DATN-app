import { atom } from "recoil";
import { GetTheme } from "~utils";

export const SYSTEM_STATE = {
  ThemeData: atom({
    key: "ThemeData",
    default: GetTheme(),
  }),
  UserProfile: atom({
    key: "UserProfile",
    default: undefined,
  }),
  AppConfigs: atom({
    key: "AppConfigs",
    default: {
      firstInit: false,
    },
  }),
  AuthData: atom({
    key: "AuthData",
    default: undefined,
  }),
};

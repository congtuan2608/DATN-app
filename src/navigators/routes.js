import * as ScreenComponents from "../screens";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { DrawerNavigator } from "./DrawerNavigator";

export const SCREENS = {
  DrawerNavigator: {
    component: DrawerNavigator,
  },
  BottomTabNavigator: {
    component: BottomTabNavigator,
  },
  // home
  HomeScreens: {
    component: ScreenComponents.HomeScreens.HomeScreen,
  },
  MapScreen: {
    component: ScreenComponents.HomeScreens.MapScreen,
  },
  LocationReportScreen: {
    component: ScreenComponents.HomeScreens.LocationReportScreen,
  },
  CameraScreen: {
    component: ScreenComponents.HomeScreens.CameraScreen,
    options: { presentation: "fullScreenModal" },
  },
  EnvironmentalGuidanceScreen: {
    component: ScreenComponents.HomeScreens.EnvironmentalGuidanceScreen,
  },
  // blog
  BlogScreens: {
    component: ScreenComponents.BlogScreens,
  },
  // campai
  CampaignsScreens: {
    component: ScreenComponents.CampaignsScreens,
  },
  // history
  HistoryScreens: {
    component: ScreenComponents.HistoryScreens,
  },
  //account
  AccountScreens: {
    component: ScreenComponents.AccountScreens,
  },
};

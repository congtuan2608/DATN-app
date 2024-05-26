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
  AirPollutionScreen: {
    component: ScreenComponents.HomeScreens.AirPollutionScreen,
  },
  PointDetailScreen: {
    component: ScreenComponents.HomeScreens.PointDetailScreen,
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
  GuidanceDetailScreen: {
    component: ScreenComponents.HomeScreens.GuidanceDetailScreen,
  },
  // blog
  BlogScreens: {
    component: ScreenComponents.BlogScreens,
  },
  // detect
  DetectScreen: {
    component: ScreenComponents.DetectScreen,
  },
  DetectResultsScreen: {
    component: ScreenComponents.DetectResultsScreen,
  },
  // campaigns
  CampaignsScreen: {
    component: ScreenComponents.CampaignsScreen,
  },
  CampaignDetailScreen: {
    component: ScreenComponents.CampaignDetailScreen,
  },
  EditCampaignsScreen: {
    component: ScreenComponents.EditCampaignsScreen,
  },
  SelectLocation: {
    component: ScreenComponents.SelectLocation,
  },
  // history
  HistoryScreen: {
    component: ScreenComponents.HistoryScreen,
  },
  HistoryDetailScreen: {
    component: ScreenComponents.HistoryDetailScreen,
  },
  //account
  AccountScreens: {
    component: ScreenComponents.AccountScreens.AccountScreens,
  },
  MyProfileScreen: {
    component: ScreenComponents.AccountScreens.MyProfileScreen,
  },
  SettingScreen: {
    component: ScreenComponents.AccountScreens.SettingScreen,
  },
  ChangeThemeScreen: {
    component: ScreenComponents.AccountScreens.ChangeThemeScreen,
  },
  ContactSupportScreen: {
    component: ScreenComponents.AccountScreens.ContactSupportScreen,
  },
  TermOfPrivacyPolicyScreens: {
    component: ScreenComponents.AccountScreens.TermOfPrivacyPolicyScreens,
  },
  MyProfileScreen: {
    component: ScreenComponents.AccountScreens.MyProfileScreen,
  },
};

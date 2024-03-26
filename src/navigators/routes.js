import {
  AccountScreens,
  BlogScreens,
  CampaignsScreens,
  HistoryScreens,
  HomeScreens,
} from "../screens";
import { DrawerNavigator } from "./DrawerNavigator";

export const SCREENS = {
  DrawerNavigator: {
    component: DrawerNavigator,
  },
  HomeScreens: {
    component: HomeScreens,
  },
  BlogScreens: {
    component: BlogScreens,
  },
  CampaignsScreens: {
    component: CampaignsScreens,
  },
  HistoryScreens: {
    component: HistoryScreens,
  },
  AccountScreens: {
    component: AccountScreens,
  },
};

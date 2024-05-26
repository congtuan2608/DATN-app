import { SCREENS } from "../routes";

export const bottomTabScreens = {
  AirMap: {
    label: "Air Map",
    component: SCREENS.AirPollutionScreen.component,
    icon: (props) => ({
      family: "Ionicons",
      name: "scan",
      size: 25,
    }),
  },
  Campaigns: {
    label: "Campaigns",
    component: SCREENS.CampaignsScreen.component,
    icon: (props) => ({ family: "Entypo", name: "slideshare", size: 25 }),
  },
  Home: {
    label: "Home",
    component: SCREENS.HomeScreens.component,
    icon: (props) => ({
      family: "Ionicons",
      name: "home-outline",
      size: 23,
    }),
  },
  History: {
    label: "History",
    component: SCREENS.HistoryScreen.component,
    icon: (props) => ({
      family: "MaterialIcons",
      name: "history-toggle-off",
      size: 25,
    }),
  },
  Account: {
    label: "Account",
    component: SCREENS.AccountScreens.component,
    icon: (props) => ({ family: "Ionicons", name: "person-outline", size: 24 }),
  },
};

import { SCREENS } from "../routes";

export const bottomTabScreens = {
  Blog: {
    label: "Blog",
    component: SCREENS.BlogScreens.component,
    icon: (props) => ({
      family: "MaterialCommunityIcons",
      name: "post-outline",
      size: 25,
    }), // document-text-outline
  },
  Campaigns: {
    label: "Campaigns",
    component: SCREENS.CampaignsScreens.component,
    icon: (props) => ({ family: "Entypo", name: "slideshare", size: 25 }), // document-text-outline
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
    component: SCREENS.HistoryScreens.component,
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

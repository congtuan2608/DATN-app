export const serviceList = [
  {
    title: "Map",
    image_url: require("~assets/images/map.png"),
    navigate: "MapScreen",
  },
  {
    title: "Campaign",
    image_url: require("~assets/images/campaign.png"),
    navigate: "CampaignsScreens",
    params: { headerShown: true },
  },
  {
    title: "Donate",
    image_url: require("~assets/images/donate.png"),
  },
  {
    title: "Report location",
    image_url: require("~assets/images/add_location2.png"),
    navigate: "LocationReportScreen",
  },
  {
    title: "Statistical",
    image_url: require("~assets/images/statistics.png"),
  },
  {
    title: "Environmental guidance",
    image_url: require("~assets/images/instruct.png"),
    navigate: "EnvironmentalGuidanceScreen",
  },
];

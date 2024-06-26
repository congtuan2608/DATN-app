export const serviceList = [
  {
    title: "Map",
    image_url: require("~assets/images/map.png"),
    navigate: "MapScreen",
  },
  {
    title: "Detect images",
    image_url: require("~assets/images/detect-images-icon.png"),
    navigate: "DetectScreen",
    params: { headerShown: true },
  },
  {
    title: "Campaign",
    image_url: require("~assets/images/campaign-icon.png"),
    navigate: "CampaignsScreen",
    params: { headerShown: true },
  },
  // {
  //   title: "Donate",
  //   image_url: require("~assets/images/donate.png"),
  // },
  {
    title: "Report location",
    image_url: require("~assets/images/add_location2.png"),
    navigate: "LocationReportScreen",
  },
  {
    title: "Air prediction",
    image_url: require("~assets/images/statistics.png"),
    navigate: "AirPredictionScreen",
  },
  {
    title: "Environmental guidance",
    image_url: require("~assets/images/instruct.png"),
    navigate: "EnvironmentalGuidanceScreen",
  },
  {
    title: "Statistical",
    image_url: require("~assets/images/index.png"),
    navigate: "StatisticalScreen",
  },
];

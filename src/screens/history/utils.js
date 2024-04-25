export const getImage = (activityType) => {
  switch (activityType) {
    case "campaign": {
      return require("~assets/images/campaign-icon.png");
    }
    case "report-location": {
      return require("~assets/images/add_location2.png");
    }
    case "donate": {
      return require("~assets/images/donate.png");
    }
    case "detect": {
      return require("~assets/images/detect-images-icon.png");
    }

    default:
      return require("~assets/images/error-icon.png");
  }
};

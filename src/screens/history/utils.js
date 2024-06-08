export const getImageIcon = (activityType) => {
  switch (activityType) {
    case "campaign": {
      return require("~assets/images/campaign-icon.png");
    }
    case "report-location": {
      return require("~assets/images/add_location2.png");
    }
    case "payment": {
      return require("~assets/images/payment-method-icon.png");
    }
    case "detect": {
      return require("~assets/images/detect-images-icon.png");
    }

    default:
      return require("~assets/images/error-icon.png");
  }
};

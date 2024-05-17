export const returnPointIcon = (type) => {
  switch (type) {
    case "water-pollution":
      return require("~assets/images/water-pollution-icon.png");
    case "domestic-waste":
      return require("~assets/images/domestic-waste-icon.png");
    case "air-pollution":
      return require("~assets/images/air-pollution-icon.png");
    default:
      return require("~assets/images/not-found-icon.png");
  }
};

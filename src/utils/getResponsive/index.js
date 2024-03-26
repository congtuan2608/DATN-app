import { Platform } from "react-native";

export const getResponesive = (dimensions, style = {}) => {
  let defaultValue = {};
  if (Platform.OS === "ios") {
    if (dimensions.window.height >= 736) {
      return { ...defaultValue, ...style }; // iphone8Plus: 736 × 414
    }
  } else if (Platform.OS === "android") {
    return {
      ...defaultValue,
      tabBarStyle: {
        height: 60,
      },
      ...style,
    };
  }
};

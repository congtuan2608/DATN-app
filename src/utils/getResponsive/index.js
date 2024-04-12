import { Platform } from "react-native";

export const getResponesive = (
  safeAreaInsets,
  dimensions = undefined,
  style = {}
) => {
  let defaultValue = {};
  if (Platform.OS === "ios") {
    // if (dimensions.window.height >= 736) {
    //   return { ...defaultValue, ...style }; // iphone8Plus: 736 × 414
    // }
    return {
      ...defaultValue,
      loginStyle: {
        spacingBottom: {
          marginBottom: safeAreaInsets.bottom,
        },
        spacingBottom: {
          marginBottom: safeAreaInsets.bottom + 130,
        },
      },
      signUpStyle: {
        spacingBottom: {
          marginBottom: safeAreaInsets.bottom,
        },
        spacingBottom: {
          marginBottom: safeAreaInsets.bottom + 130,
        },
      },
      homeStyle: {
        spacingTop: {
          paddingTop: 30,
        },
      },
      ...style,
    };
  } else if (Platform.OS === "android") {
    return {
      ...defaultValue,
      tabBarStyle: {
        height: 60,
      },
      loginStyle: {
        spacingBottom: {
          marginBottom: safeAreaInsets.bottom + 130,
        },
      },
      signUpStyle: {
        spacingBottom: {
          marginBottom: safeAreaInsets.bottom,
        },
        spacingBottom: {
          marginBottom: safeAreaInsets.bottom + 130,
        },
      },
      ...style,
    };
  }
};

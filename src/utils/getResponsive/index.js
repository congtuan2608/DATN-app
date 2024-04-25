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
        spacingTop: {
          marginTop: safeAreaInsets.top,
        },
        spacingBottom: {
          marginBottom: safeAreaInsets.bottom + 130,
        },
      },
      signUpStyle: {
        spacingTop: {
          marginTop: safeAreaInsets.top,
        },
        spacingBottom: {
          marginBottom: safeAreaInsets.bottom + 130,
        },
      },
      locationReportStyle: {
        spacingTopBottom: {
          marginTop: safeAreaInsets.top - 25,
          marginBottom: safeAreaInsets.bottom + 80,
        },
      },
      detectImagesStyle: {
        spacingTopBottom: {
          marginTop: safeAreaInsets.top - 25,
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
        spacingTop: {
          marginTop: safeAreaInsets.top + 20,
        },
        spacingBottom: {
          marginBottom: safeAreaInsets.bottom + 130,
        },
      },
      signUpStyle: {
        spacingTop: {
          marginTop: safeAreaInsets.top + 10,
        },
        spacingBottom: {
          marginBottom: safeAreaInsets.bottom + 130,
        },
      },
      locationReportStyle: {
        spacingTopBottom: {
          marginTop: safeAreaInsets.top + 20,
          marginBottom: safeAreaInsets.bottom + 100,
        },
      },
      detectImagesStyle: {
        spacingTopBottom: {
          marginTop: safeAreaInsets.top + 25,
        },
      },
      ...style,
    };
  }
};

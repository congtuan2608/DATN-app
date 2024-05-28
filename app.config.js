module.exports = {
  expo: {
    name: "Go Green",
    slug: "go-green",
    scheme: "go-green",
    description: "App dọn rác",
    version: "1.0.7",
    orientation: "portrait",
    icon: "./assets/icon-app.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/background-app.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.lctuan.go-green",
      config: {
        googleMapsApiKey: "AIzaSyDnF0vmggyu_Gg7Q1Vhv45b8t_3vp1meOM",
      },
      googleServicesFile: "./GoogleService-Info.plist",
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [
              "com.googleusercontent.apps.238091618534-p40rbdcdpkd2f3591jrb2tfiff7gsacf",
            ],
          },
        ],
        LSApplicationQueriesSchemes: [
          "googlechrome",
          "comgooglemaps",
          "fb",
          "facebook",
          "facebook-messenger",
          "instagram",
          "whatsapp",
          "twitter",
          "linkedin",
          "pinterest",
          "youtube",
          "viber",
          "line",
          "wechat",
          "tumblr",
          "snapchat",
          "telegram",
          "skype",
          "tiktok",
          "zoom",
          "netflix",
          "spotify",
          "twitch",
          "momo",
        ],
      },
      privacyManifests: {
        NSPrivacyAccessedAPITypes: [
          {
            NSPrivacyAccessedAPIType:
              "NSPrivacyAccessedAPICategoryUserDefaults",
            NSPrivacyAccessedAPITypeReasons: ["CA92.1"],
          },
        ],
      },
      buildNumber: "5",
    },
    android: {
      package: "com.lctuan.gogreen",
      adaptiveIcon: {
        foregroundImage: "./assets/icon-app.png",
        backgroundColor: "#ffffff",
      },
      versionCode: 10,
      softwareKeyboardLayoutMode: "pan",
      permissions: [
        "android.permission.RECORD_AUDIO",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
      ],
      config: {
        googleMaps: {
          apiKey: "AIzaSyBxa95u7zKlOpGmuAGKxvDdhri3KDg3pjw",
        },
      },
      googleServicesFile: "./google-services.json",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      eas: {
        projectId: "92b16408-c49c-4ead-8b1e-2001b7a3c7fd",
      },
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            usesCleartextTraffic: true,
          },
          ios: {
            infoPlist: {
              NSAppTransportSecurity: {
                NSAllowsArbitraryLoads: true,
                NSExceptionDomains: {
                  localhost: {
                    NSExceptionAllowsInsecureHTTPLoads: true,
                  },
                  "127.0.0.1:8000": {
                    NSExceptionAllowsInsecureHTTPLoads: true,
                  },
                },
              },
            },
            supportsTablet: true,
            flipper: true,
          },
        },
      ],
      "expo-localization",
      "expo-image-picker",
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow $(PRODUCT_NAME) to use your location.",
        },
      ],
      "@react-native-google-signin/google-signin",
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission:
            "Allow $(PRODUCT_NAME) to access your microphone",
          recordAudioAndroid: true,
        },
      ],
    ],
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/92b16408-c49c-4ead-8b1e-2001b7a3c7fd",
    },
  },
};

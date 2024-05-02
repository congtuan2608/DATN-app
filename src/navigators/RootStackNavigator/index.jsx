import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { AsyncStorageKey } from "~configs";
import { initAxiosConfigs } from "~configs/axios";
import { useAuth, useLocation, useTheme } from "~hooks";
import { LoginScreens, OnboardingScreens, SignUpScreens } from "~screens";
import { SCREENS } from "../routes";

const InitScreen = "DrawerNavigator";
const RootScreens = [
  "MapScreen",
  "DetectScreens",
  "DetectResultsScreen",
  "LocationReportScreen",
  "CameraScreen",
  "EnvironmentalGuidanceScreen",
  "CampaignsScreens",
  "EditCampaigns",
  "SettingScreen",
  "TermOfPrivacyPolicyScreens",
  "ContactSupportScreens",
];
const Stack = createNativeStackNavigator();
export const RootStackNavigator = () => {
  const auth = useAuth();
  const { theme, initTheme } = useTheme();
  const { getCurrentLocation } = useLocation();

  React.useEffect(() => {
    initAxiosConfigs({ auth });
    getCurrentLocation();
  }, []);

  React.useEffect(() => {
    async function init() {
      if (auth.appConfigs.firstInit === false) {
        // get init theme
        await initTheme();

        // get token
        const access_token = await AsyncStorage.getItem(
          AsyncStorageKey.ACCESS_TOKEN
        );
        const refresh_token = await AsyncStorage.getItem(
          AsyncStorageKey.REFRESH_TOKEN
        );
        //

        if (access_token && refresh_token) {
          // setTimeout(async () => {
          await auth.login({ access_token, refresh_token });
          // }, 1000);
        } else {
          // setTimeout(async () => {
          await auth.logout();
          // }, 2000);
        }
      }
    }
    init();
  }, [auth.appConfigs.firstInit]);

  const render = () => {
    if (auth.isInitializingApp) {
      // Init app...
      // return <AppLoading />;
      return (
        <View
          style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}
        />
      );
    } else if (auth.isLoggedIn) {
      return (
        <Stack.Navigator initialRouteName={InitScreen}>
          <Stack.Screen
            name={"DrawerNavigator"}
            component={SCREENS.DrawerNavigator.component}
            options={{ headerShown: false }}
          />
          {RootScreens.map((screenPath) => (
            <Stack.Screen
              key={screenPath}
              name={screenPath}
              component={SCREENS[screenPath].component}
              options={{
                headerShown: false,
                ...SCREENS[screenPath]?.options,
              }}
            />
          ))}
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator initialRouteName={true ? "Onboarding" : "Login"}>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreens}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      );
    }
  };
  return <NavigationContainer>{render()}</NavigationContainer>;
};

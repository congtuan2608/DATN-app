import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { SCREENS } from "../routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingScreens, SignUpScreens, LoginScreens } from "~screens";
import { useAuth, useLocation, useTheme } from "~hooks";
import { AsyncStorageKey } from "~configs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { AppLoading } from "~components";
import { initAxiosConfigs } from "~configs/axios";
import { StatusBar, Text, View } from "react-native";

const InitScreen = "DrawerNavigator";
const RootScreens = [
  "MapScreen",
  "LocationReportScreen",
  "CameraScreen",
  "EnvironmentalGuidanceScreen",
];
const Stack = createNativeStackNavigator();
export const RootStackNavigator = () => {
  const auth = useAuth();
  const { changeTheme } = useTheme();
  const { getCurrentLocation } = useLocation();
  const [isNewUser, setIsNewUser] = React.useState(true);

  React.useEffect(() => {
    initAxiosConfigs({ auth });
    getCurrentLocation();
  }, []);

  React.useEffect(() => {
    async function init() {
      if (auth.appConfigs.firstInit === false) {
        // get theme
        const THEME = await AsyncStorage.getItem("THEME");
        await changeTheme(THEME);
        // get token
        const access_token = await AsyncStorage.getItem(
          AsyncStorageKey.ACCESS_TOKEN
        );
        const refresh_token = await AsyncStorage.getItem(
          AsyncStorageKey.REFRESH_TOKEN
        );
        //
        const new_user = await AsyncStorage.getItem(AsyncStorageKey.NEW_USER);
        if (new_user === "false") {
          setIsNewUser(false);
        }
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
      return <></>;
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

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { SCREENS } from "../routes";
import { createStackNavigator } from "@react-navigation/stack";
import { OnboardingScreens, SignUpScreens, LoginScreens } from "~screens";
import { useAuth, useTheme } from "~hooks";
import { AsyncStorageKey } from "~configs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { AppLoading } from "~components";

const InitScreen = "DrawerNavigator";
const RootScreens = [];
const Stack = createStackNavigator();
export const RootStackNavigator = () => {
  const auth = useAuth();
  const { changeTheme } = useTheme();
  const [isNewUser, setIsNewUser] = React.useState(true);
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
          setTimeout(async () => {
            await auth.login({ access_token, refresh_token });
          }, 1000);
        } else {
          setTimeout(async () => {
            await auth.logout();
          }, 1000);
        }
      }
    }
    init();
  }, [auth.appConfigs.firstInit]);

  const render = () => {
    if (auth.isInitializingApp) {
      // Init app...
      return <AppLoading />;
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
              options={{ headerShown: false }}
            />
          ))}
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator initialRouteName={isNewUser ? "Onboarding" : "Login"}>
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
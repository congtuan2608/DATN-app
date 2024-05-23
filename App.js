import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { en, registerTranslation } from "react-native-paper-dates";
import { RecoilRoot } from "recoil";
import "regenerator-runtime";
import "~configs/react-native";
import { queryClient } from "~configs/react-query";
import { RootStackNavigator } from "./src/navigators";
registerTranslation("en", en);

export default function App() {
  // console.log(getCalendars());
  return (
    // <ClerkProvider
    //   publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
    // >
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          animated={true}
          barStyle="default"
          showHideTransition="slide"
          hidden={false}
        />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootStackNavigator />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </RecoilRoot>
    // </ClerkProvider>
  );
}

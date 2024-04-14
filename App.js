import "react-native-gesture-handler";
import "~configs/react-native";
import { RootStackNavigator } from "./src/navigators";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~configs/react-query";
import { RecoilRoot } from "recoil";
import { en, registerTranslation } from "react-native-paper-dates";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
registerTranslation("en", en);

export default function App() {
  // console.log(getCalendars());
  return (
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
  );
}

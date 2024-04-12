import "react-native-gesture-handler";
import "~configs/react-native";
import { RootStackNavigator } from "./src/navigators";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~configs/react-query";
import { RecoilRoot } from "recoil";
import { en, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", en);

export default function App() {
  // console.log(getCalendars());
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RootStackNavigator />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

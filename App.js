import "react-native-gesture-handler";
import "~configs/react-native";
import { RootStackNavigator } from "./src/navigators";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~configs/react-query";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RootStackNavigator />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

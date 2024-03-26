import "react-native-gesture-handler";
import { RootStackNavigator } from "./src/navigators";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <RootStackNavigator />
    </RecoilRoot>
  );
}

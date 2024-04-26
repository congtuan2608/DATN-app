import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";

export function SettingScreen() {
  const { theme, changeTheme } = useTheme();

  return (
    <StackScreen headerTitle="Setting">
      <Text>Hello Home</Text>
      <TouchableOpacity onPress={() => changeTheme("DarkTheme")}>
        <Text>Change theme</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeTheme()}>
        <Text>Change theme default</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeTheme("GreenTheme")}>
        <Text>Change theme green</Text>
      </TouchableOpacity>
    </StackScreen>
  );
}

import { Button, Text, TouchableOpacity, View } from "react-native";
import { StackScreen } from "~layouts";
import { useTheme, useAuth } from "~hooks";
export const HomeScreens = () => {
  const { theme, changeTheme } = useTheme();
  const auth = useAuth();

  const onLogout = () => {
    auth.logout();
  };
  return (
    <StackScreen headerShown={false}>
      <View className="flex-1 bg-white mx-2">
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

        <TouchableOpacity className="py-20" onPress={onLogout}>
          <Text>logout</Text>
        </TouchableOpacity>
      </View>
    </StackScreen>
  );
};

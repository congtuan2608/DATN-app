import { Text, TouchableOpacity, View } from "react-native";
import { useTheme, useAuth } from "~hooks";
export const AccountScreens = () => {
  const { theme, changeTheme } = useTheme();
  const auth = useAuth();

  const onLogout = () => {
    auth.logout();
  };
  return (
    <View className="mt-20">
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

      <TouchableOpacity className="mt-20" onPress={onLogout}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

import { Alert } from "react-native";

export const generateMenuSetting = ({ navigate }) => {
  return [
    {
      text: "Change theme",
      image: require("~assets/images/theme-icon.png"),
      onPress: async () => {
        navigate.navigate("ChangeThemeScreen");
      },
    },
    {
      text: "Delete account",
      image: require("~assets/images/delete-account-icon.png"),
      onPress: async () => {
        Alert.alert("Notification", "This feature is not available yet!");
        // navigate.navigate("ChangeThemeScreen");
      },
    },
  ];
};

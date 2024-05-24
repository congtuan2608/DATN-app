import { useNavigation } from "@react-navigation/native";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "~hooks";

export function GroupItem(props) {
  const { theme } = useTheme();
  const navigate = useNavigation();

  const onNavigate = () => {
    if (!props.navigate) {
      Alert.alert("Notification", "This feature coming soon", [
        { title: "Ok" },
      ]);
      return;
    }
    navigate.navigate(props.navigate, { ...(props.params ?? {}) });
  };
  return (
    <View className="w-16">
      <TouchableOpacity
        className="justify-center items-center"
        style={{ gap: 5 }}
        onPress={onNavigate}
      >
        <Image
          source={props?.image_url}
          className="h-10 w-10"
          resizeMode="cover"
        />
        <Text
          className="text-xs text-center"
          lineBreakMode="clip"
          numberOfLines={2}
          style={{ color: theme.primaryTextColor }}
        >
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

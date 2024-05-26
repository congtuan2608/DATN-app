import { ActivityIndicator, Image, Text, View } from "react-native";
import { NO_DATA } from "~constants";
import { useTheme } from "~hooks";

export function KCContainer(props) {
  const { isLoading, isEmpty, hideImage, textEmpty, ...viewProps } = props;
  const { theme } = useTheme();
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center" {...viewProps}>
        <ActivityIndicator size="large" color={theme.primaryIconColor} />
      </View>
    );
  }
  if (isEmpty) {
    return (
      <View className="flex-1 justify-center items-center py-2" {...viewProps}>
        {!hideImage && <Image source={NO_DATA} className="w-20 h-20" />}
        <Text style={{ color: theme.primaryTextColor }}>
          {textEmpty ?? "No data"}
        </Text>
      </View>
    );
  } else {
    return (
      <View className="flex-1" {...viewProps}>
        {props?.children}
      </View>
    );
  }
}

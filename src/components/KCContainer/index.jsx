import { View, Text, ActivityIndicator, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "~hooks";
import { NO_DATA } from "~constants";

export function KCContainer(props) {
  const { isLoading, isEmpty, hideImage, ...viewProps } = props;
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
      <View className="flex-1 justify-center items-center mb-2" {...viewProps}>
        {!hideImage && <Image source={NO_DATA} className="w-20 h-20" />}
        <Text style={{ color: theme.primaryTextColor }}>No data</Text>
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

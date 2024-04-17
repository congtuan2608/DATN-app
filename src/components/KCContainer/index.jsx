import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "~hooks";

export function KCContainer(props) {
  const { isLoading, isEmpty, ...viewProps } = props;
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
      <View className="flex-1 justify-center items-center" {...viewProps}>
        <Text>No data</Text>
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

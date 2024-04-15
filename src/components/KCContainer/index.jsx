import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

export function KCContainer(props) {
  const { isLoading, isEmpty, ...viewProps } = props;
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center" {...viewProps}>
        <Text>Loading</Text>
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

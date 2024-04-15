import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "~hooks";

export function GroupItem(props) {
  const { theme } = useTheme();
  const navigate = useNavigation();

  const onNavigate = () => {
    if (!props.navigate) return;
    navigate.navigate(props.navigate);
  };
  return (
    <View className="w-16">
      <TouchableOpacity
        className="justify-center items-center"
        style={{ gap: 5 }}
        onPress={onNavigate}
      >
        <Image
          source={props.image_url ?? require("~assets/gif/home.gif")}
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

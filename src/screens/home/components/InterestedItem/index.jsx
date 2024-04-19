import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useWindowDimensions } from "react-native";
import { EXAMPLE_IMG } from "~constants";

export function InterestedItem() {
  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="justify-center items-center rounded-xl border-[0.5px] border-[#00000030] shadow-sm bg-white "
      style={{ gap: 5 }}
    >
      <Image
        className="rounded-t-xl h-48"
        source={{ uri: EXAMPLE_IMG }}
        style={{
          resizeMode: "cover",
          width: width - 100,
        }}
      />
      <View className="w-full justify-start items-start p-2 pt-0 ">
        <Text className="text-left font-semibold">
          Cloud Vision est un service
        </Text>
        <Text
          className="w-full text-left text-xs"
          numberOfLines={1}
          style={{
            width: width - 120,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
          cupiditate odit beatae velit reiciendis tempora? Ducimus voluptates
          repellendus earum neque officia natus veniam vel fugiat ullam adipisci
          ea, culpa atque.
        </Text>
      </View>
    </TouchableOpacity>
  );
}

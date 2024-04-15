import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import img from "~assets/images/2.png";
import { useTheme } from "~hooks";

export function GuidanceItem() {
  const { theme } = useTheme();
  return (
    <View
      className="rounded-xl px-2 py-3"
      style={{ backgroundColor: theme.primaryBackgroundColor, gap: 5 }}
    >
      <View
        className="flex-row items-center justify-center"
        style={{ gap: 10 }}
      >
        <View
          className="rounded-full border-[0.5px]"
          style={{ borderColor: theme.primaryTextColor }}
        >
          <Image
            source={img}
            className="w-14 h-14 rounded-full"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1 justify-center" style={{ gap: 5 }}>
          <Text
            className="font-semibold"
            style={{ color: theme.primaryTextColor }}
          >
            Cong Tuan
          </Text>
          <Text
            className="italic font-light text-xs"
            style={{ color: theme.primaryTextColor }}
          >
            12:46 20/04/2024
          </Text>
        </View>
      </View>
      <View className="" style={{ gap: 10 }}>
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
          consequuntur laboriosam velit totam at, ex deserunt blanditiis ab
          quasi hic laudantium sequi minus repudiandae! Deleniti error animi ad
          optio consequatur! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Rem consequuntur laboriosam velit totam at, ex deserunt
          blanditiis ab quasi hic laudantium sequi minus repudiandae! Deleniti
          error animi ad optio consequatur!
        </Text>
        <View className="flex-row flex-wrap justify-evenly items-center">
          <Image source={img} className="w-28 h-28 rounded-lg" />
          <Image source={img} className="w-28 h-28 rounded-lg" />
          <Image source={img} className="w-28 h-28 rounded-lg" />
        </View>
      </View>
      <View
        className="flex-row border-t pt-3"
        style={{ gap: 20, borderColor: theme.primaryBorderColor }}
      >
        <TouchableOpacity
          className="flex-1 py-3 justify-center items-center rounded-lg"
          style={{ backgroundColor: theme.secondBackgroundColor }}
        >
          <Text className="text-xs" style={{ color: theme.primaryTextColor }}>
            Like (200)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 py-3 justify-center items-center rounded-lg"
          style={{ backgroundColor: theme.secondBackgroundColor }}
        >
          <Text className="text-xs" style={{ color: theme.primaryTextColor }}>
            Save (16)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

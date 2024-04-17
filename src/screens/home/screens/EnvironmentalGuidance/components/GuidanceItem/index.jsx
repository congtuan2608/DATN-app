import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import img from "~assets/images/2.png";
import { useTheme } from "~hooks";
import Dayjs from "dayjs";
import { AVATAR_URL } from "~constants";

export function GuidanceItem(props) {
  const { data, ...other } = props;
  const { theme } = useTheme();

  const assets = React.useMemo(() => {
    let images = [],
      videos = [];

    if (data?.assets && data.assets.length === 0) return { images, videos };

    data.assets.map((item) => {
      if (item.media_type === "image") images.push(item);
      else videos.push(item);
    });
    return { images, videos };
  }, []);
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
            source={{ uri: data?.author?.avatar ?? AVATAR_URL }}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1 justify-center" style={{ gap: 5 }}>
          <Text
            className="font-semibold"
            style={{ color: theme.primaryTextColor }}
          >
            {data?.author?.fullName ?? "<Unknown>"}
          </Text>
          <Text
            className="italic font-light text-xs"
            style={{ color: theme.primaryTextColor }}
          >
            {Dayjs(data.createdAt).format("hh:mm DD/MM/YYYY")}
          </Text>
        </View>
      </View>
      <View className="" style={{ gap: 10 }}>
        <Text
          className="text-sm px-2"
          style={{ color: theme.primaryTextColor }}
        >
          {data?.descriptsion ?? "<No data>"}
        </Text>
        {assets && (
          <View className="flex-row flex-wrap justify-evenly items-center">
            {assets?.images.map((item) => (
              <Image
                key={item._id}
                source={{ uri: item.url ?? "" }}
                className="w-28 h-28 rounded-lg"
              />
            ))}
          </View>
        )}
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

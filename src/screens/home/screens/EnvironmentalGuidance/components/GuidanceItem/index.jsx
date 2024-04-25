import Dayjs from "dayjs";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AVATAR_URL } from "~constants";
import { useTheme } from "~hooks";

const NUMBER_OF_LINES = 6;
export function GuidanceItem(props) {
  const { data, ...other } = props;
  const { theme } = useTheme();
  const [textShown, setTextShown] = React.useState(false);
  const [lengthMore, setLengthMore] = React.useState(false);

  const onTextLayout = React.useCallback((e) => {
    setLengthMore(e.nativeEvent.lines?.length >= NUMBER_OF_LINES);
  }, []);

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
      className="rounded-xl px-2 py-3 shadow-sm"
      style={{ backgroundColor: theme.secondBackgroundColor, gap: 5 }}
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
            {Dayjs(data.createdAt).format("A hh:mm DD/MM/YYYY")}
          </Text>
        </View>
      </View>
      <View className="px-2 pb-3" style={{ gap: 5 }}>
        <Text
          className="font-semibold text-base"
          style={{ color: theme.primaryTextColor }}
        >
          {data?.title ?? ""}
        </Text>
        <Text
          onTextLayout={onTextLayout}
          className="text-sm text-clip"
          numberOfLines={textShown ? undefined : NUMBER_OF_LINES}
          style={{ color: theme.primaryTextColor }}
        >
          {data?.descriptsion ?? "<No data>"}
        </Text>

        {lengthMore ? (
          <TouchableOpacity>
            <Text
              className="text-sm font-semibold italic mb-2 opacity-90"
              onPress={() => setTextShown(!textShown)}
              style={{ color: theme.highLightColor }}
            >
              {textShown ? "Read less..." : "Read more..."}
            </Text>
          </TouchableOpacity>
        ) : null}
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
          style={{ backgroundColor: theme.primaryBackgroundColor }}
        >
          <Text className="text-xs" style={{ color: theme.primaryTextColor }}>
            Like (200)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 py-3 justify-center items-center rounded-lg"
          style={{ backgroundColor: theme.primaryBackgroundColor }}
        >
          <Text className="text-xs" style={{ color: theme.primaryTextColor }}>
            Save (16)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

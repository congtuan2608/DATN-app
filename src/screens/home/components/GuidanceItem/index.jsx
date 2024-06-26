import { useNavigation } from "@react-navigation/native";
import Dayjs from "dayjs";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { AVATAR_URL } from "~constants";
import { useTheme } from "~hooks";

export function GuidanceItem(props) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const navigate = useNavigation();

  const handleOnPress = () => {
    navigate.navigate("GuidanceDetailScreen", { data: props });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className="rounded-xl px-2 py-3 border-[#00000030] shadow-sm"
      style={{ backgroundColor: theme.secondBackgroundColor, gap: 5 }}
      onPress={handleOnPress}
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
            source={{ uri: props?.author?.avatar?.url ?? AVATAR_URL }}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1 justify-center" style={{ gap: 5 }}>
          <Text
            className="font-semibold"
            style={{ color: theme.primaryTextColor }}
          >
            {props?.author?.fullName ?? "<Unknown>"}
          </Text>
          <Text
            className="italic font-light text-xs"
            style={{ color: theme.primaryTextColor }}
          >
            {props?.createdAt &&
              Dayjs(props.createdAt).format("HH:mm DD/MM/YYYY")}
          </Text>
        </View>
      </View>
      <View className="p-2" style={{ gap: 5, width: width / 1.7 }}>
        <Text
          numberOfLines={1}
          className="font-semibold text-base"
          style={{ color: theme.primaryTextColor }}
        >
          {props?.title ?? ""}
        </Text>
        <Text
          className="text-sm"
          numberOfLines={2}
          style={{ color: theme.primaryTextColor }}
        >
          {props?.description ?? "<No data>"}
        </Text>
        {props?.assets.length && (
          <View className="flex-row flex-wrap justify-evenly items-center">
            <Image
              source={{ uri: props.assets[0]?.url ?? "" }}
              className="w-full h-48 rounded-xl"
            />
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
    </TouchableOpacity>
  );
}

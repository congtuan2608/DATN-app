import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { getDistance } from "geolib";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { KCButton } from "~components";
import { useLocation, useTheme } from "~hooks";

export function InterestedItem(props) {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const navigate = useNavigation();
  const { location } = useLocation();
  const handleOnPress = () => {
    navigate.navigate("CampaignDetailScreen", { id: props?._id });
  };
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      activeOpacity={0.9}
      className="justify-center items-center rounded-xl border-[0.5px] border-[#00000030] shadow-sm"
      style={{ gap: 5, backgroundColor: theme.secondBackgroundColor }}
    >
      <Image
        className="rounded-t-xl h-48"
        source={{ uri: props?.reference?.assets?.[2]?.url }}
        style={{
          resizeMode: "cover",
          width: width - 100,
        }}
      />
      <View className="w-full justify-start items-start p-3 pt-0 ">
        <Text
          className="text-left font-semibold"
          numberOfLines={1}
          style={{ color: theme.primaryTextColor, width: width - 130 }}
        >
          {props?.title || "<undefined>"}
        </Text>
        <Text
          className="text-left text-xs"
          numberOfLines={1}
          style={{ color: theme.primaryTextColor, width: width - 130 }}
        >
          Number of participants: {props?.participants.length || "<undefined>"}
        </Text>
        <Text
          className="text-left text-xs"
          numberOfLines={1}
          style={{ color: theme.primaryTextColor, width: width - 130 }}
        >
          Deadline:{" "}
          {(props?.endDate &&
            dayjs(props?.endDate).format("a hh:mm DD/MM/YYYY")) ||
            "undefined"}
        </Text>
        <Text
          className="text-left text-xs"
          numberOfLines={1}
          style={{ color: theme.primaryTextColor, width: width - 130 }}
        >
          Current distance:{" "}
          {getDistance(location, {
            longitude: props.reference?.location?.coordinates[0],
            latitude: props.reference?.location?.coordinates[1],
          }).toLocaleString("de-DE")}
          m
        </Text>
        <Text
          className="w-full text-left text-xs"
          numberOfLines={1}
          style={{
            width: width - 130,
            color: theme.primaryTextColor,
          }}
        >
          {props?.description || "<undefined>"}
        </Text>
      </View>
      <View className="flex-row px-2 pb-2">
        <KCButton
          onPress={handleOnPress}
          variant="Outline"
          styleContainer={{
            flex: 1,
          }}
        >
          View detail
        </KCButton>
      </View>
    </TouchableOpacity>
  );
}

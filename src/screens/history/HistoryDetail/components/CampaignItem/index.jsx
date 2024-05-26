import dayjs from "dayjs";
import React from "react";
import { Image, Text, View } from "react-native";
import { AVATAR_URL } from "~constants";
import { useScreenUtils, useTheme } from "~hooks";
import { ReportLocaionItem } from "..";

export function CampaignItem(props) {
  const { theme } = useTheme();
  const { safeAreaInsets } = useScreenUtils();
  const [visible, setIsVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const openImageView = (idx) => {
    setIsVisible(true);
    setIndex(idx);
  };

  return (
    <View className="w-full pb-2" style={{ gap: 10 }}>
      <View
        className="rounded-lg p-3 shadow-sm"
        style={{ backgroundColor: theme.secondBackgroundColor, gap: 20 }}
      >
        <View
          className="flex-row justify-between items-center"
          style={{ gap: 10 }}
        >
          <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
            Organizer
          </Text>
          <View
            className="flex-row items-center justify-center"
            style={{ gap: 5 }}
          >
            <Image
              className="w-8 h-8 rounded-full"
              source={{
                uri: props?.organizer?.avatar?.url || AVATAR_URL,
              }}
            />
            <Text
              className="text-sm font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {props?.organizer?.fullName || "Unknown"}
            </Text>
          </View>
        </View>
        <View
          className="flex-row justify-between items-start flex-wrap"
          style={{ gap: 10 }}
        >
          <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
            Title
          </Text>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.primaryTextColor }}
          >
            {props?.title || "Unknown"}
          </Text>
        </View>

        <View
          className="flex-row justify-between items-start flex-wrap"
          style={{ gap: 10 }}
        >
          <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
            Start date
          </Text>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.primaryTextColor }}
          >
            {dayjs(props?.startDate).format("a hh:mm DD/MM/YYYY")}
          </Text>
        </View>
        <View
          className="flex-row justify-between items-start flex-wrap"
          style={{ gap: 10 }}
        >
          <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
            End date
          </Text>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.primaryTextColor }}
          >
            {dayjs(props?.endDate).format("a hh:mm DD/MM/YYYY")}
          </Text>
        </View>
        <View
          className="flex-row justify-between items-start flex-wrap"
          style={{ gap: 10 }}
        >
          <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
            Limit
          </Text>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.primaryTextColor }}
          >
            {`${(props?.participants ?? []).length + "/" + props?.limit}` ||
              "Unknown"}
          </Text>
        </View>
        <View
          className="flex-row justify-between items-start flex-wrap"
          style={{ gap: 10 }}
        >
          <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
            Description
          </Text>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.primaryTextColor }}
          >
            {props?.description || "Unknown"}
          </Text>
        </View>
      </View>
      <View
        className="w-full rounded-lg"
        style={{ backgroundColor: theme.secondBackgroundColor }}
      >
        {props?.campaign && (
          <Text className="font-medium text-lg text-center pt-2">Location</Text>
        )}
        <ReportLocaionItem {...props?.campaign} />
      </View>
    </View>
  );
}

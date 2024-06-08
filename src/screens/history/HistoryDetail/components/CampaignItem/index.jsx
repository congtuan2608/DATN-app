import dayjs from "dayjs";
import React from "react";
import { Image, Text, View } from "react-native";
import { RestAPI } from "~apis";
import { KCContainer } from "~components";
import { AVATAR_URL } from "~constants";
import { useScreenUtils, useTheme } from "~hooks";
import { ReportLocaionItem } from "..";

export function CampaignItem(props) {
  const { theme } = useTheme();
  const { safeAreaInsets } = useScreenUtils();
  const campaignDetail = RestAPI.GetCampaignById();

  React.useEffect(() => {
    if (props?.campaignId) {
      campaignDetail.mutate({ id: props?.campaignId });
    }
  }, [props?.campaignId]);

  return (
    <KCContainer
      isLoading={campaignDetail.isPending}
      className="w-full pb-2"
      style={{ gap: 10 }}
    >
      <View
        className="rounded-lg p-3 shadow-sm"
        style={{ backgroundColor: theme.secondBackgroundColor, gap: 15 }}
      >
        <View
          className="flex-row justify-between items-center"
          style={{ gap: 10 }}
        >
          <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
            Organizer
          </Text>
          <View
            className="flex-row items-center justify-center"
            style={{ gap: 5 }}
          >
            <Image
              className="w-8 h-8 rounded-full"
              source={{
                uri:
                  (campaignDetail.data?.organizer?.avatar?.url ??
                    props?.organizer?.avatar?.url) ||
                  AVATAR_URL,
              }}
            />
            <Text
              className="text-sm font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {(campaignDetail.data?.organizer?.fullName ??
                props?.organizer?.fullName) ||
                "Unknown"}
            </Text>
          </View>
        </View>
        <View
          className="flex-row justify-between items-start flex-wrap"
          style={{ gap: 10 }}
        >
          <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
            Title
          </Text>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.primaryTextColor }}
          >
            {(campaignDetail.data?.title ?? props?.title) || "Unknown"}
          </Text>
        </View>

        <View
          className="flex-row justify-between items-start flex-wrap"
          style={{ gap: 10 }}
        >
          <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
            Start date
          </Text>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.primaryTextColor }}
          >
            {dayjs(campaignDetail.data?.startDate ?? props?.startDate).format(
              "HH:mm - DD/MM/YYYY"
            )}
          </Text>
        </View>
        <View
          className="flex-row justify-between items-start flex-wrap"
          style={{ gap: 10 }}
        >
          <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
            End date
          </Text>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.primaryTextColor }}
          >
            {dayjs(campaignDetail.data?.endDate ?? props?.endDate).format(
              "HH:mm - DD/MM/YYYY"
            )}
          </Text>
        </View>
        <View
          className="flex-row justify-between items-start flex-wrap"
          style={{ gap: 10 }}
        >
          <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
            Limit
          </Text>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.primaryTextColor }}
          >
            {((campaignDetail.data?.participants ?? props?.participants) &&
              `${
                (campaignDetail.data?.participants ?? props?.participants ?? [])
                  .length +
                "/" +
                (campaignDetail.data?.limit ?? props?.limit)
              }`) ||
              "Unknown"}
          </Text>
        </View>
        {(campaignDetail.data?.alowDonate ?? props?.alowDonate) && (
          <View
            className="flex-row justify-between items-center"
            style={{ gap: 10 }}
          >
            <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
              Fund
            </Text>
            <Text
              className="text-sm font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {(campaignDetail.data?.fund ?? props?.fund ?? 0).toLocaleString(
                "de-DE",
                {
                  style: "currency",
                  currency:
                    (campaignDetail.data?.currency ?? props?.currency) || "VND",
                }
              )}
            </Text>
          </View>
        )}
        <View
          className="flex-row justify-between items-start flex-wrap"
          style={{ gap: 10 }}
        >
          <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
            Description
          </Text>
          <Text
            className="text-sm font-medium"
            style={{ color: theme.primaryTextColor }}
          >
            {(campaignDetail.data?.description ?? props?.description) ||
              "Unknown"}
          </Text>
        </View>
      </View>
      <View
        className="flex-1 w-full rounded-lg"
        style={{ backgroundColor: theme.secondBackgroundColor }}
      >
        {(campaignDetail.data?.reference ?? props?.campaign) && (
          <Text
            className="font-medium text-lg text-center pt-2"
            style={{ color: theme.primaryTextColor }}
          >
            Location
          </Text>
        )}
        <ReportLocaionItem
          {...(campaignDetail.data?.reference ?? props?.campaign)}
        />
      </View>
    </KCContainer>
  );
}

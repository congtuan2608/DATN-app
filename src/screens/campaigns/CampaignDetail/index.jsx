import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import React from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { RestAPI } from "~apis";
import { KCButton, KCContainer } from "~components";
import { AVATAR_URL } from "~constants";
import { useAuth, useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { ReportLocaionItem } from "~screens/history/HistoryDetail/components";
import { ModalListsPayment } from "~screens/home/screens/Donate/components";
import { getResponesive } from "~utils";

export function CampaignDetailScreen(props) {
  const navigateParams = useRoute();
  const { safeAreaInsets, dimensions } = useScreenUtils();
  const campaign = RestAPI.GetCampaignById();
  const { theme } = useTheme();
  const { userProfile } = useAuth();
  const [join, setJoin] = React.useState(false);
  const Join = RestAPI.JoinCampaign();
  const Leave = RestAPI.LeaveCampaign();
  const navigate = useNavigation();
  const [showPayModal, setShowPayModal] = React.useState(false);

  React.useEffect(() => {
    if (navigateParams.params?.id) {
      campaign.mutate({ id: navigateParams.params.id });
    }
  }, [navigateParams.params?.id]);
  React.useEffect(() => {
    setJoin(
      Boolean(
        campaign.data?.participants?.find(
          (item) => item?._id === userProfile?._id
        )
      )
    );
  }, [campaign.data]);

  const disabledJoin = Boolean(
    Join.isPending ||
      Leave.isPending ||
      campaign.data?.participants.length >= campaign.data?.limit ||
      (campaign.data?.startDate &&
        dayjs().isBefore(dayjs(campaign.data?.startDate))) ||
      (campaign.data?.endDate && dayjs().isAfter(dayjs(campaign.data?.endDate)))
  );

  const handleAction = () => {
    if (campaign.data?.organizer?._id === userProfile?._id) {
      navigate.navigate("EditCampaignsScreen", { id: campaign.data?._id });
      return;
    }
    if (join) {
      Leave.mutate({ id: campaign.data?._id });
      navigateParams.params?.setJoinedCampaigns((prev) =>
        prev.filter((item) => item !== campaign.data?._id)
      );
    } else {
      Join.mutate({ id: campaign.data?._id });
      navigateParams.params?.setJoinedCampaigns((prev) => [
        ...prev,
        campaign.data?._id,
      ]);
    }
    setJoin(!join);
    return;
  };
  const renderStyle = () => {
    if (
      campaign.data?.organizer?._id === userProfile?._id ||
      (campaign.data?.startDate &&
        dayjs().isBefore(dayjs(campaign.data.startDate))) ||
      (campaign.data?.endDate && dayjs().isAfter(dayjs(campaign.data.endDate)))
    ) {
      return {};
    }
    if (join) {
      return {
        backgroundColor: "#F87171",
        borderColor: "#F87171",
      };
    }
  };
  const renderTextJoin = () => {
    if (
      campaign.data?.startDate &&
      dayjs().isBefore(dayjs(campaign.data.startDate))
    ) {
      return "Hasn't started yet";
    }
    if (
      campaign.data?.endDate &&
      dayjs().isAfter(dayjs(campaign.data.endDate))
    ) {
      return "Has ended";
    }
    if (campaign.data?.organizer?._id === userProfile?._id) return "Edit";
    if (join) return "Leave";

    return "Join";
  };

  return (
    <StackScreen headerTitle="Campaigns detail">
      <KCContainer
        className="pt-2 px-3"
        isLoading={campaign.isPending}
        isEmpty={!campaign.data}
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            gap: 10,
            paddingBottom: 10,
          }}
        >
          <View
            className="w-full rounded-lg p-3 shadow-sm"
            style={{ backgroundColor: theme.secondBackgroundColor, gap: 20 }}
          >
            <View
              className="flex-row justify-between items-center"
              style={{ gap: 10 }}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: theme.thirdTextColor }}
              >
                Organizer
              </Text>
              <View
                className="flex-row justify-center items-center"
                style={{ gap: 5 }}
              >
                <Image
                  className="w-8 h-8 rounded-full"
                  source={{
                    uri: campaign.data?.organizer?.avatar?.url || AVATAR_URL,
                  }}
                />
                <Text
                  className="text-sm font-medium"
                  style={{ color: theme.primaryTextColor }}
                >
                  {campaign.data?.organizer?.fullName || "Unknown"}
                </Text>
              </View>
            </View>
            <View
              className="flex-row justify-between items-center"
              style={{ gap: 10 }}
            >
              <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
                Participants
              </Text>
              <Text
                className="text-sm font-medium"
                style={{ color: theme.primaryTextColor }}
              >
                {`${campaign.data?.participants.length}/${campaign.data?.limit}` ||
                  "Unknown"}
              </Text>
            </View>
            <View
              className="flex-row justify-between items-center"
              style={{ gap: 10 }}
            >
              <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
                Start date
              </Text>
              <Text
                className="text-sm font-medium"
                style={{ color: theme.primaryTextColor }}
              >
                {(campaign.data?.startDate &&
                  dayjs(campaign.data?.startDate).format(
                    "HH:mm - DD/MM/YYYY"
                  )) ||
                  "Unknown"}
              </Text>
            </View>
            <View
              className="flex-row justify-between items-center"
              style={{ gap: 10 }}
            >
              <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
                End date
              </Text>
              <Text
                className="text-sm font-medium"
                style={{ color: theme.primaryTextColor }}
              >
                {(campaign.data?.endDate &&
                  dayjs(campaign.data?.endDate).format("HH:mm - DD/MM/YYYY")) ||
                  "Unknown"}
              </Text>
            </View>
            {campaign.data?.alowDonate && (
              <View
                className="flex-row justify-between items-center"
                style={{ gap: 10 }}
              >
                <Text
                  className="text-sm"
                  style={{ color: theme.thirdTextColor }}
                >
                  Fund
                </Text>
                <Text
                  className="text-sm font-medium"
                  style={{ color: theme.primaryTextColor }}
                >
                  {(campaign.data?.fund ?? 0).toLocaleString("de-DE", {
                    style: "currency",
                    currency: campaign.data?.currency || "VND",
                  })}
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
              <View className="flex-1 items-end">
                <Text
                  className="text-sm font-medium"
                  style={{ color: theme.primaryTextColor }}
                >
                  {campaign.data?.description || "Unknown"}
                </Text>
              </View>
            </View>
          </View>

          <ReportLocaionItem {...campaign.data?.reference} />
        </ScrollView>
        <View
          className="w-full flex-row justify-between pt-3 border-t "
          style={{
            gap: 10,
            paddingBottom: getResponesive(safeAreaInsets, dimensions)
              .locationReportStyle.spacingTopBottom.marginTop,
            backgroundColor: theme.primaryBackgroundColor,
            borderColor: theme.primaryBorderColor,
          }}
        >
          {campaign.data?.alowDonate && (
            <KCButton
              variant="Outline"
              styleContainer={{ ...renderStyle(), flex: 1 }}
              isLoading={Join.isPending || Leave.isPending}
              disabled={disabledJoin}
              onPress={() => setShowPayModal(true)}
            >
              Donate
            </KCButton>
          )}
          <KCButton
            variant="Filled"
            styleContainer={{ ...renderStyle(), flex: 1 }}
            isLoading={Join.isPending || Leave.isPending}
            disabled={disabledJoin}
            onPress={handleAction}
          >
            {renderTextJoin()}
          </KCButton>
        </View>
        <ModalListsPayment
          title="Payment methods"
          // content="Thank you for reporting, do you want to report to another location?"
          showModal={showPayModal}
          buttons={[
            {
              text: "Cancel",
              variant: "Outline",
              onPress: ({ setVisible }) => {
                setShowPayModal(false);
              },
            },
            {
              text: "Continue",
              onPress: ({ selectMethod, setVisible }) => {
                if (selectMethod === "zalopay")
                  return Alert.alert("ZaloPay", "Coming soon");
                setShowPayModal(false);
                navigate.navigate("MomoScreen", {
                  campaignId: campaign.data?._id,
                });
              },
              disabled: ({ selectMethod }) => !selectMethod && true,
            },
          ]}
        />
      </KCContainer>
    </StackScreen>
  );
}

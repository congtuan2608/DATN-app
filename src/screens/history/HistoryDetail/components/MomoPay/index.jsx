import dayjs from "dayjs";
import { Image, Text, View } from "react-native";
import { useTheme } from "~hooks";
import { CampaignItem } from "../CampaignItem";

export function MomoPayItem(props) {
  const { theme } = useTheme();

  const status = (key) => {
    switch (props?.details?.status) {
      case "success":
        return (
          <View className="px-2 bg-lime-200 rounded-lg ">
            <Text className="font-medium text-lime-500">Success</Text>
          </View>
        );
      case "rejected":
        return (
          <View className="px-2 rounded-lg bg-red-200">
            <Text className="font-medium text-red-500">Rejected</Text>
          </View>
        );
      case "failed":
        return (
          <View className="px-2 rounded-lg bg-red-200">
            <Text className="font-medium text-red-500">Failed</Text>
          </View>
        );

      default:
        <></>;
    }
  };
  return (
    <View className="flex-1 w-full" style={{ gap: 10 }}>
      <View
        className="rounded-lg shadow-sm p-3"
        style={{ backgroundColor: theme.secondBackgroundColor }}
      >
        <View className="flex-row items-center mb-2" style={{ gap: 10 }}>
          <View>
            <Image
              className="w-16 h-16"
              source={{
                uri: "https://test-payment.momo.vn/v2/gateway/images/logo-momo.png",
              }}
            />
          </View>
          <View className="justify-center flex-1">
            <Text
              className="text-xl font-medium"
              style={{ color: theme.thirdTextColor }}
            >
              Donations for campaign
            </Text>
            <Text
              className="text-3xl font-semibold"
              style={{ color: theme.primaryTextColor }}
            >
              {Number(props.details.amount * -1 ?? 0).toLocaleString("de-DE", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>
        </View>
        <View className="" style={{ gap: 10 }}>
          <View className="flex-row items-center justify-between">
            <Text style={{ color: theme.thirdTextColor }}>Status</Text>
            {status(props?.status)}
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ color: theme.thirdTextColor }}>Time</Text>
            <Text
              className="font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {dayjs(props.createdAt).format("HH:mm - DD/MM/YYYY")}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ color: theme.thirdTextColor }}>Trading code</Text>
            <Text
              className="font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {props.details.orderId}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ color: theme.thirdTextColor }}>Account/Card</Text>
            <Text
              className="font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {"momo_wallet"}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ color: theme.thirdTextColor }}>Expense</Text>
            <Text
              className="font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              Free
            </Text>
          </View>

          <View className="justify-between gap-y-1">
            <Text style={{ color: theme.thirdTextColor }}>Message</Text>
            <Text
              className="font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {props.details?.orderInfo}
            </Text>
          </View>
        </View>
      </View>

      <CampaignItem
        campaignId={props?.details?.extraData?.otherInfo?.campaignId}
      />
    </View>
  );
}

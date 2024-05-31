import dayjs from "dayjs";
import { Text, View } from "react-native";
import { useTheme } from "~hooks";
import { CampaignItem } from "../CampaignItem";

export function MomoPayItem(props) {
  const { theme } = useTheme();

  const status = (key) => {
    switch (props?.details?.status) {
      case "success":
        return (
          <View className="px-1 bg-lime-200">
            <Text className="font-medium text-lime-500">Success</Text>
          </View>
        );
      case "rejected":
        return (
          <View className="px-1 bg-red-200">
            <Text className="font-medium text-red-500">Success</Text>
          </View>
        );
      case "failed":
        return (
          <View className="px-1 bg-red-200">
            <Text className="font-medium text-red-500">Success</Text>
          </View>
        );

      default:
        <></>;
    }
  };
  return (
    <View className="flex-1 px-2">
      <View
        className="rounded-lg shadow-sm py-2"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <View className="">
          <Text
            className="text-xl font-medium"
            style={{ color: theme.thirdTextColor }}
          >
            MOMO PAYMENT
          </Text>
          <Text className="text-3xl font-semibold">
            {Number(props.details.amount ?? 0).toLocaleString("de-DE", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>
        <View className="" style={{ gap: 10 }}>
          <View className="flex-row items-center justify-between">
            <Text style={{ color: theme.thirdTextColor }}>Status</Text>
            {status("success")}
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ color: theme.thirdTextColor }}>Time</Text>
            <Text>{dayjs(props.createdAt).format("hh:mm - DD/MM/YYYY")}</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ color: theme.thirdTextColor }}>Trading code</Text>
            <Text>{props.details.orderId}</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ color: theme.thirdTextColor }}>Account/Card</Text>
            <Text>{"momo_wallet"}</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ color: theme.thirdTextColor }}>Expense</Text>
            <Text>Free</Text>
          </View>

          <View className="items-center justify-between">
            <Text style={{ color: theme.thirdTextColor }}>Message</Text>
            <Text>{props.details?.orderInfo}</Text>
          </View>
        </View>
      </View>

      <CampaignItem
        campaignId={props?.details?.extraData?.otherInfo?.campaignId}
      />
    </View>
  );
}

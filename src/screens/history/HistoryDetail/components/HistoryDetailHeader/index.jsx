import Dayjs from "dayjs";
import { Text, View } from "react-native";
import { useTheme } from "~hooks";

export function HistoryDetailHeader(props) {
  const { theme } = useTheme();
  const status = (key) => {
    switch (key) {
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
      case "pending":
        return (
          <View className="px-2 rounded-lg bg-orange-100">
            <Text className="font-medium text-orange-400">Pending</Text>
          </View>
        );

      default:
        <></>;
    }
  };

  switch (props.activity?.activityType) {
    case "report-location": {
      return (
        <View
          className="w-full rounded-lg p-3 shadow-sm"
          style={{ backgroundColor: theme.secondBackgroundColor, gap: 10 }}
        >
          <Text
            className="text-xl font-semibold text-center"
            style={{ color: theme.primaryTextColor }}
          >
            {props?.title}
          </Text>
          <View className="flex-row justify-between items-center">
            <Text style={{ color: theme.thirdTextColor }}>Status</Text>
            {status(props.details.status)}
          </View>
          {props.details.status !== "success" && props?.details?.message && (
            <View
              className="flex-row justify-between items-start flex-wrap"
              style={{ gap: 10 }}
            >
              <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
                Message:
              </Text>
              <Text className="text-sm font-medium text-red-400">
                {props?.details?.message || "Undefined"}
              </Text>
            </View>
          )}
          <View className="flex-row justify-between items-center">
            <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
              Time
            </Text>
            <Text
              className="text-sm font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {Dayjs(props?.createdAt).format("HH:mm DD/MM/YYYY")}
            </Text>
          </View>
          <View
            className="flex-row justify-between items-start flex-wrap"
            style={{ gap: 10 }}
          >
            <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
              Description:
            </Text>
            <Text
              className="text-sm font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {props?.description}
            </Text>
          </View>
        </View>
      );
    }
    case "campaign": {
      return (
        <View
          className="w-full rounded-lg p-3 shadow-sm "
          style={{ backgroundColor: theme.secondBackgroundColor, gap: 10 }}
        >
          <Text
            className="text-xl font-semibold text-center"
            style={{ color: theme.primaryTextColor }}
          >
            {props?.title}
          </Text>

          <View className="flex-row justify-between items-center">
            <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
              Time
            </Text>
            <Text
              className="text-sm font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {Dayjs(props?.createdAt).format("HH:mm - DD/MM/YYYY")}
            </Text>
          </View>
          <View
            className="flex-row justify-between items-start flex-wrap"
            style={{ gap: 10 }}
          >
            <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
              Description:
            </Text>
            <Text
              className="text-sm font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {props?.description}
            </Text>
          </View>
        </View>
      );
    }
    default:
      return <></>;
  }
}

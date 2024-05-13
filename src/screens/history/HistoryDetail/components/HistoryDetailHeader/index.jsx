import Dayjs from "dayjs";
import { Text, View } from "react-native";
import { useTheme } from "~hooks";

export function HistoryDetailHeader(props) {
  const { theme } = useTheme();
  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "rejected":
        return "red";
      case "success":
        return "green";
      default:
        return "black";
    }
  };

  switch (props.activity.activityType) {
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
            <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
              Status
            </Text>
            <View
              className="justify-center items-center flex-row"
              style={{ gap: 5 }}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: theme.primaryTextColor }}
              >
                {props?.details?.status || "Unknown"}
              </Text>
              <View
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: statusColor(props?.details?.status),
                }}
              />
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
              Time
            </Text>
            <Text
              className="text-sm font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {Dayjs(props?.createdAt).format("A hh:mm DD/MM/YYYY")}
            </Text>
          </View>
          <View
            className="flex-row justify-between items-start flex-wrap"
            style={{ gap: 10 }}
          >
            <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
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
            <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
              Time
            </Text>
            <Text
              className="text-sm font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {Dayjs(props?.createdAt).format("A hh:mm DD/MM/YYYY")}
            </Text>
          </View>
          <View
            className="flex-row justify-between items-start flex-wrap"
            style={{ gap: 10 }}
          >
            <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
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

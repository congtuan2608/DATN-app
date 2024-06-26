import { Text, View } from "react-native";
import { KCContainer } from "~components";
import { useTheme } from "~hooks";

export function CampaignStatistical() {
  // const LocationStatistical = RestAPI.GetLocationStatistical();
  const { theme } = useTheme();
  return (
    <KCContainer
      // isLoading={LocationStatistical.isFetching}
      className="flex-1 p-2"
      style={{ backgroundColor: theme.primaryBackgroundColor }}
    >
      <View
        className="rounded-lg px-2 py-3 flex-col justify-between items-center shadow-sm"
        style={{ backgroundColor: theme.secondBackgroundColor, gap: 10 }}
      >
        <View
          className="flex-row justify-between items-center"
          style={{ gap: 10 }}
        >
          <View className="rounded-lg px-2 bg-lime-200 shadow-sm p-2">
            <Text>
              Success:{" "}
              <Text className="font-bold">
                {/* {LocationStatistical.data?.success} */}
              </Text>{" "}
            </Text>
          </View>
          <View className="rounded-lg px-2 bg-orange-200 shadow-sm p-2">
            <Text>
              Pending:{" "}
              <Text className="font-bold">
                {/* {LocationStatistical.data?.pending} */}
              </Text>{" "}
            </Text>
          </View>
          <View className="rounded-lg px-2 bg-red-200 shadow-sm p-2">
            <Text>
              Rejected:{" "}
              <Text className="font-bold">
                {/* {LocationStatistical.data?.rejected} */}
              </Text>{" "}
            </Text>
          </View>
        </View>
        <View className="">
          <View className="rounded-lg px-2 bg-indigo-200 shadow-sm p-2">
            <Text>
              Total:{" "}
              <Text className="font-bold">
                {/* {LocationStatistical.data?.total} */}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </KCContainer>
  );
}

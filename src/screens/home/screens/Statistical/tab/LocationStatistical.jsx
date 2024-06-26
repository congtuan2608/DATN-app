import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RestAPI } from "~apis";
import { KCContainer } from "~components";
import { useTheme } from "~hooks";

// pending, success, rejected total
export function LocationStatistical() {
  const LocationStatistical = RestAPI.GetLocationStatistical();
  const ContaminatedLocationByUser = RestAPI.GetContaminatedLocationByUser();
  const navigate = useNavigation();
  const { theme } = useTheme();
  const [configParams, setConfigParams] = React.useState({
    page: 0,
    limit: 10,
  });

  React.useEffect(() => {
    ContaminatedLocationByUser.mutate(configParams);
  }, [configParams]);

  const onRefresh = () => {
    setConfigParams((prev) => ({ ...prev, page: 0 }));
  };

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return (
          <View className="px-2 py-1 bg-orange-200 rounded-md">
            <Text>Pending</Text>
          </View>
        );
      case "success":
        return (
          <View className="px-2 py-1 bg-lime-200 rounded-md">
            <Text>Success</Text>
          </View>
        );
      case "rejected":
        return (
          <View className="px-2 py-1 bg-red-200 rounded-md">
            <Text>Rejected</Text>
          </View>
        );
      case "failed":
        return (
          <View className="px-2 py-1 bg-red-500 rounded-md">
            <Text>Failed</Text>
          </View>
        );

      default:
        return <></>;
    }
  };
  return (
    <KCContainer
      isLoading={LocationStatistical.isFetching}
      className="flex-1 px-2"
      style={{ backgroundColor: theme.primaryBackgroundColor, gap: 10 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        containerStyle={{ flexGrow: 1, gap: 10 }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
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
                  {LocationStatistical.data?.success}
                </Text>{" "}
              </Text>
            </View>
            <View className="rounded-lg px-2 bg-orange-200 shadow-sm p-2">
              <Text>
                Pending:{" "}
                <Text className="font-bold">
                  {LocationStatistical.data?.pending}
                </Text>{" "}
              </Text>
            </View>
            <View className="rounded-lg px-2 bg-red-200 shadow-sm p-2">
              <Text>
                Rejected:{" "}
                <Text className="font-bold">
                  {LocationStatistical.data?.rejected}
                </Text>{" "}
              </Text>
            </View>
          </View>
          <View className="">
            <View className="rounded-lg px-2 bg-indigo-200 shadow-sm p-2">
              <Text>
                Total:{" "}
                <Text className="font-bold">
                  {LocationStatistical.data?.total}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <KCContainer
          isLoading={ContaminatedLocationByUser.isPending}
          style={{ gap: 10 }}
          isEmpty={(ContaminatedLocationByUser.data ?? []).length === 0}
          className="mt-3"
        >
          {(ContaminatedLocationByUser.data ?? []).map((item, idx) => (
            <TouchableOpacity
              key={idx}
              className="rounded-lg px-2 py-3 shadow-sm"
              style={{ backgroundColor: theme.secondBackgroundColor, gap: 3 }}
              onPress={() => {
                navigate.navigate("PointDetailScreen", {
                  id: item?._id,
                  headerTitle: "Location detail",
                });
              }}
            >
              <View className="flex-row items-center">
                <Text style={{ color: theme.primaryTextColor }}>Status: </Text>
                {renderStatus(item?.status)}
              </View>
              <Text style={{ color: theme.primaryTextColor }}>
                Address: {item?.address || "<Undefined>"}
              </Text>
              <Text style={{ color: theme.primaryTextColor }}>
                Contaminated:{" "}
                {item?.contaminatedType
                  .map((item) => item.contaminatedName)
                  .join(", ")}
              </Text>
            </TouchableOpacity>
          ))}
        </KCContainer>
      </ScrollView>
    </KCContainer>
  );
}

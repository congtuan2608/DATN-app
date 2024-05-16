import React from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RestAPI } from "~apis";
import { KCContainer, KCFlatList } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { HistoryItem } from "../components";

export const HistoryScreens = () => {
  const { theme } = useTheme();
  const ActivityType = RestAPI.GetActivityHistory();
  const History = RestAPI.GetHistory();
  const [configsActivity, setConfigsActivity] = React.useState({
    activity: "all",
    page: 0,
    limit: 10,
  });
  const [historyData, setHistoryData] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const { activity, ...other } = configsActivity;
      const params =
        configsActivity.activity === "all" ? other : configsActivity;
      const res = await History.mutateAsync(params);
      if (res) {
        if (configsActivity.page === 0) setHistoryData(res ?? []);
        else setHistoryData((prev) => [...prev, ...res]);
      }
    })();
  }, [configsActivity]);

  const handlePressItem = (item) => {
    if (configsActivity.activity === item.activityType) return;
    setConfigsActivity((p) => ({ ...p, activity: item.activityType, page: 0 }));
  };
  const handleRefresh = () => {
    setConfigsActivity((p) => ({ ...p, page: 0 }));
  };
  const handleLoadMore = () => {
    if ((History.data ?? []).length) {
      setConfigsActivity((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };
  return (
    <StackScreen
      headerTitle="History"
      headerShown={false}
      styleContainer={{
        backgroundColor: theme.primaryBackgroundColor,
      }}
    >
      <View
        className="flex-1 px-2 pt-2"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <View className="relative">
          <TextInput
            autoComplete="name-given"
            className={`shadow-sm rounded-xl px-5 pr-14 ${
              Platform.OS === "ios" ? "py-4" : "py-3"
            }`}
            placeholder="Search on history"
            style={{
              backgroundColor: theme.secondBackgroundColor,
              color: theme.primaryTextColor,
            }}
            // value=""
            // onChangeText={(value) => {}}
            placeholderTextColor={theme.thirdTextColor}
          />
          <View
            className="absolute right-0 h-full flex-row items-center justify-center mr-3"
            style={{ gap: 10 }}
          >
            <TouchableOpacity className="opacity-80">
              <Image
                source={require("~assets/images/history-search-icon.png")}
                className="h-8 w-8"
              />
            </TouchableOpacity>
          </View>
        </View>
        <KCFlatList
          data={[
            { activityName: "All", activityType: "all" },
            ...(ActivityType.data ?? []),
          ]}
          onPressItem={handlePressItem}
          isLoading={ActivityType.isFetching}
          renderText={(item) => item.activityName}
        />
        <KCContainer
          style={{ backgroundColor: theme.primaryBackgroundColor }}
          isLoading={History.isPending && configsActivity.page === 0}
          isEmpty={
            (History.data ?? []).length === 0 &&
            historyData.length === 0 &&
            configsActivity.page === 0
          }
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "start",
              alignItems: "center",
              gap: 10,
              paddingBottom: 10,
            }}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={handleRefresh} />
            }
            onScrollEndDrag={handleLoadMore}
          >
            {/* <FlatList
              showsVerticalScrollIndicator={false}
              data={historyData}
              renderItem={({ item }) => <HistoryItem {...item} />}
              keyExtractor={(item, idx) => `VerticalList_Item__${idx}`}
              onEndReached={handleLoadMore}
              ListFooterComponent={
                <View>
                  {History.isPending.isLoading && (
                    <View className="w-full flex-col justify-center items-center pt-5">
                      <Text>Load more</Text>
                      <ActivityIndicator
                        size="small"
                        color={theme.primaryButtonColor}
                      />
                    </View>
                  )}
                </View>
              }
            /> */}
            {(historyData ?? []).map((item, idx) => (
              <HistoryItem key={idx} {...item} />
            ))}
            {History.isPending && (
              <View className="w-full flex-col justify-center items-center py-3">
                <ActivityIndicator
                  size="small"
                  color={theme.primaryButtonBackgroundColor}
                />
              </View>
            )}
          </ScrollView>
        </KCContainer>
      </View>
    </StackScreen>
  );
};

import React from "react";
import {
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

  React.useEffect(() => {
    const { activity, ...other } = configsActivity;
    const params = configsActivity.activity === "all" ? other : configsActivity;
    History.mutate(params);
  }, [configsActivity]);

  const handlePressItem = (item) => {
    if (configsActivity.activity === item.activityType) return;
    setConfigsActivity((p) => ({ ...p, activity: item.activityType, page: 0 }));
  };
  const handleRefresh = () => {
    setConfigsActivity((p) => ({ ...p, page: 0 }));
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "start",
            alignItems: "center",
            gap: 5,
            paddingBottom: 10,
          }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={handleRefresh} />
          }
        >
          <KCContainer
            style={{ backgroundColor: theme.primaryBackgroundColor, gap: 10 }}
            isLoading={History.isPending}
            isEmpty={(History.data ?? []).length === 0}
          >
            {(History.data ?? []).map((item, idx) => (
              <HistoryItem key={idx} {...item} />
            ))}
          </KCContainer>
        </ScrollView>
      </View>
    </StackScreen>
  );
};

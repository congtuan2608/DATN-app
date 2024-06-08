import React from "react";
import {
  Alert,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RestAPI } from "~apis";
import { KCContainer, KCFlatList, KCIcon } from "~components";
import { useDebounce, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { GuidanceItem } from "./components";

export function EnvironmentalGuidanceScreen() {
  const { theme } = useTheme();
  const RecyclingTypes = RestAPI.RecyclingType();
  const RecyclingGuide = RestAPI.RecyclingGuide();
  const [params, setParams] = React.useState({
    page: 0,
    tagId: undefined,
    limit: 10,
  });
  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    if ((RecyclingTypes.getRecyclingType?.data ?? []).length !== 0) {
      setParams((prev) => ({
        ...prev,
        tagId: RecyclingTypes.getRecyclingType?.data[0]?._id,
      }));
    }
  }, [RecyclingTypes.getRecyclingType?.data]);

  React.useEffect(() => {
    // (async () => RecyclingGuide.getRecyclingGuide.mutateAsync(params))();
    RecyclingGuide.searchRecyclingGuide.mutate(params);
  }, [params]);

  const handleSearch = useDebounce(async (text) => {
    RecyclingGuide.searchRecyclingGuide.mutate({ ...params, q: text });
  }, 250);
  //=================================================================
  const onPressItem = (item) => {
    if (params.tagId === item._id) return;
    setParams((prev) => ({
      ...prev,
      tagId: item?._id,
    }));
  };

  const onRefresh = async () => {
    setParams((prev) => ({
      ...prev,
      page: 0,
    }));
  };
  const onPressHeader = () => {
    Alert.alert("Notification", "This feature coming soon", [{ title: "Ok" }]);
  };

  const renderHeaderRight = () => {
    return (
      <View
        className="flex-row justify-center items-center"
        style={{ gap: 10 }}
      >
        <TouchableOpacity onPress={onPressHeader}>
          <KCIcon
            family="Ionicons"
            name="search-circle-sharp"
            size={33}
            color={theme.primaryIconColor}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderTextFlatList = (item) => {
    if (item?.recyclingGuides.length === 0) {
      return `${item.recyclingName}`;
    }
    return `${item.recyclingName} (${item?.recyclingGuides.length})`;
  };
  return (
    <StackScreen
      headerTitle="Environmental guidance"
      headerRight={renderHeaderRight()}
    >
      <View
        className="flex-1 px-2"
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
            value={search}
            onChangeText={(value) => {
              setSearch(value);
              handleSearch(value);
            }}
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
          initialNumToRender={5}
          data={RecyclingTypes.getRecyclingType?.data ?? []}
          onPressItem={onPressItem}
          isLoading={RecyclingTypes.getRecyclingType.isFetching}
          renderText={renderTextFlatList}
        />
        <KCContainer
          isLoading={
            RecyclingGuide.getRecyclingGuide.isPending ||
            RecyclingTypes.getRecyclingType.isFetching
          }
          isEmpty={(RecyclingGuide.getRecyclingGuide?.data ?? []).length === 0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={RecyclingGuide.getRecyclingGuide.isPending}
                onRefresh={onRefresh}
              />
            }
          >
            <View className="" style={{ gap: 10 }}>
              {(RecyclingGuide.getRecyclingGuide?.data ?? []).map(
                (item, idx) => {
                  return <GuidanceItem key={idx} data={item} />;
                }
              )}
            </View>
          </ScrollView>
        </KCContainer>
      </View>
    </StackScreen>
  );
}

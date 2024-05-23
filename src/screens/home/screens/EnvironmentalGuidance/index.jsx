import React from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { RestAPI } from "~apis";
import { KCContainer, KCFlatList, KCIcon } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { GuidanceItem } from "./components";

export function EnvironmentalGuidanceScreen() {
  const { theme } = useTheme();
  const RecyclingTypes = RestAPI.RecyclingType();
  const RecyclingGuide = RestAPI.RecyclingGuide();
  const [params, setParams] = React.useState({
    page: 0,
    tagId: undefined,
    //  limit = 10
  });
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
    RecyclingGuide.getRecyclingGuide.mutate(params);
  }, [params]);

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

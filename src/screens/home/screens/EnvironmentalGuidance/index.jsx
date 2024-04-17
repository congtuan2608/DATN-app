import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { StackScreen } from "~layouts";
import { KCContainer, KCFlatList, KCIcon } from "~components";
import { GuidanceItem } from "./components";
import { RestAPI } from "~apis";
import { useTheme } from "~hooks";

const fakeData = [
  {
    id: "1",
    label: "Thuy Tinh",
  },
  {
    id: "2",
    label: "Chai nhua",
  },
  {
    id: "3",
    label: "Nilon",
  },
  {
    id: "4",
    label: "Giaasy",
  },
];
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
        <TouchableOpacity onPress={onPressHeader}>
          <KCIcon
            family="MaterialIcons"
            name="add-circle"
            size={30}
            color={theme.primaryIconColor}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <StackScreen
      headerTitle="Environmental guidance"
      headerRight={renderHeaderRight()}
    >
      <View className="flex-1 px-2">
        <KCFlatList
          data={RecyclingTypes.getRecyclingType?.data ?? []}
          onPressItem={onPressItem}
          isLoading={RecyclingTypes.getRecyclingType.isFetching}
          label={"recyclingName"}
        />
        <KCContainer
          className="mt-2"
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

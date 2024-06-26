import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Platform,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RestAPI } from "~apis";
import { KCContainer, KCIcon } from "~components";
import { useDebounce, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { LocationItem } from "../components";

export function SelectLocation() {
  const { theme } = useTheme();
  const navigate = useNavigation();
  const navigateParams = useRoute();
  const ReportLocation = RestAPI.GetReportLocation();
  const [search, setSearch] = React.useState("");
  const [params, setParams] = React.useState({ page: 0, limit: 10 });
  const [listLocations, setListLocations] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const res = await ReportLocation.mutateAsync({ ...params, q: search });
      if (res) {
        if (params.page === 0) setListLocations(res ?? []);
        else setListLocations((prev) => [...prev, ...res]);
      }
    })();
  }, [params]);

  const onRefresh = () => {
    setParams((p) => ({ ...p, page: 0 }));
  };

  const handleSearch = useDebounce(async (text) => {
    setParams((p) => ({ ...p, page: 0 }));
    const res = await ReportLocation.mutateAsync({
      ...params,
      page: 0,
      q: text,
    });
    setListLocations(res ?? []);
  }, 250);

  const handleLoadMore = () => {
    if ((ReportLocation.data ?? []).length) {
      setParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };
  return (
    <StackScreen
      headerShown={false}
      styleContainer={{ backgroundColor: theme.primaryBackgroundColor }}
    >
      <View className="relative flex-row items-center mt-2 mb-1">
        <TouchableOpacity
          className="px-2 justify-center items-center"
          onPress={() => navigate.goBack()}
        >
          <KCIcon
            family="Entypo"
            name="chevron-small-left"
            className="pt-[2px]"
            size={30}
            color={theme.primaryTextColor}
          />
        </TouchableOpacity>
        <View className="flex-1 pr-2">
          <TextInput
            autoComplete="name-given"
            className={`shadow-sm rounded-xl px-2 pr-12 ${
              Platform.OS === "ios" ? "py-4" : "py-3"
            }`}
            placeholder="Search on the locations"
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
          {search && (
            <View
              className="absolute right-0 h-full flex-row items-center justify-center mr-3"
              style={{ gap: 10 }}
            >
              <TouchableOpacity
                onPress={() => {
                  setSearch("");
                  handleSearch("");
                }}
              >
                <KCIcon
                  family="Ionicons"
                  name="close-circle-outline"
                  size={30}
                  color={theme.primaryIconColor}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
          paddingHorizontal: 8,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        onScrollEndDrag={handleLoadMore}
      >
        <KCContainer
          className="pt-2"
          isLoading={ReportLocation.isPending && params.page === 0}
          isEmpty={listLocations?.length === 0}
          style={{ backgroundColor: theme.primaryBackgroundColor, gap: 15 }}
        >
          {(listLocations ?? []).map((item, idx) => (
            <LocationItem
              key={idx}
              {...{ ...item, ...navigateParams.params }}
            />
          ))}
        </KCContainer>
      </ScrollView>
    </StackScreen>
  );
}

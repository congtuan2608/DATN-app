import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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
import { KCContainer, KCIcon } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { LocationItem } from "../components";

export function SelectLocation() {
  const { theme } = useTheme();
  const navigate = useNavigation();
  const navigateParams = useRoute();
  const ReportLocation = RestAPI.GetReportLocation();

  useFocusEffect(
    React.useCallback(() => {
      ReportLocation.refetch();
    }, [])
  );
  const onRefresh = () => {
    ReportLocation.refetch();
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
            // value=""
            // onChangeText={(value) => {}}
            placeholderTextColor={theme.thirdTextColor}
          />
          <View
            className="absolute right-0 h-full flex-row items-center justify-center mr-3 "
            style={{ gap: 10 }}
          >
            <TouchableOpacity className="opacity-80">
              <Image
                source={require("~assets/images/search-icon.png")}
                className="h-8 w-8"
              />
            </TouchableOpacity>
          </View>
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
      >
        <KCContainer
          className="pt-2"
          isLoading={ReportLocation.isFetching}
          isEmpty={ReportLocation.data?.length === 0}
          style={{ backgroundColor: theme.primaryBackgroundColor, gap: 15 }}
        >
          {(ReportLocation.data ?? []).map((item, idx) => (
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

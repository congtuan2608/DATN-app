import { useRoute } from "@react-navigation/native";
import { getDistance } from "geolib";
import React from "react";
import {
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageView from "react-native-image-viewing";
import { RestAPI } from "~apis";
import { KCButton, KCContainer } from "~components";
import { useLocation, useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { getResponesive } from "~utils";

export function PointDetailScreen() {
  const { theme } = useTheme();
  const { safeAreaInsets, dimensions } = useScreenUtils();
  const navigateParams = useRoute();
  const [visible, setIsVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const { location } = useLocation();
  const openImageView = (idx) => {
    setIsVisible(true);
    setIndex(idx);
  };
  const LocationInfo = RestAPI.GetReportLocationById();

  React.useEffect(() => {
    if (navigateParams.params.id)
      LocationInfo.mutate({ id: navigateParams.params.id });
  }, []);

  const handleOpenGoogleMap = async () => {
    if (!LocationInfo.data && !location) return;

    const coordinates = LocationInfo.data.location?.coordinates;
    const url = Platform.select({
      ios: `maps://app?saddr=${location.latitude}+${location.longitude}&daddr=${coordinates[1]}+${coordinates[0]}`,
      android: `geo:${coordinates[1]},${coordinates[0]}`,
    });

    (await Linking.canOpenURL(url)) && (await Linking.openURL(url));
  };
  return (
    <StackScreen
      headerTitle={navigateParams.params?.headerTitle || "Point detail"}
    >
      <KCContainer
        isEmpty={!LocationInfo.data}
        isLoading={LocationInfo.isPending}
        style={{ backgroundColor: theme.primaryBackgroundColor }}
        className="flex-1 p-2"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, gap: 10 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            className="w-full rounded-lg p-3 shadow-sm"
            style={{ backgroundColor: theme.secondBackgroundColor, gap: 20 }}
          >
            <View
              className="flex-row justify-between items-start flex-wrap"
              style={{ gap: 20 }}
            >
              <Text
                className="text-sm"
                style={{ color: theme.primaryTextColor }}
              >
                Address
              </Text>
              <View className="flex-1 items-end">
                <Text
                  className="text-sm font-medium"
                  style={{ color: theme.primaryTextColor }}
                >
                  {LocationInfo.data?.address || "Unknown"}
                </Text>
              </View>
            </View>
            <View
              className="flex-row justify-between items-center"
              style={{ gap: 10 }}
            >
              <Text
                className="text-sm"
                style={{ color: theme.primaryTextColor }}
              >
                Contaminated type
              </Text>
              <Text
                className="text-sm font-medium"
                style={{ color: theme.primaryTextColor }}
              >
                {(LocationInfo.data?.contaminatedType ?? []).map(
                  (item) => item.contaminatedName
                ) || "Unknown"}
              </Text>
            </View>
            <View
              className="flex-row justify-between items-center"
              style={{ gap: 10 }}
            >
              <Text
                className="text-sm"
                style={{ color: theme.primaryTextColor }}
              >
                Location
              </Text>
              <Text
                className="text-sm font-medium"
                style={{ color: theme.primaryTextColor }}
              >
                {(LocationInfo.data?.location?.coordinates ?? []).join(", ")}
              </Text>
            </View>
            <View
              className="flex-row justify-between items-center"
              style={{ gap: 10 }}
            >
              <Text
                className="text-sm"
                style={{ color: theme.primaryTextColor }}
              >
                Report by
              </Text>
              <Text
                className="text-sm font-medium"
                style={{
                  color: LocationInfo.data?.isAnonymous
                    ? theme.thirdTextColor
                    : theme.primaryTextColor,
                }}
              >
                {LocationInfo.data?.isAnonymous
                  ? "[Anonymous]"
                  : LocationInfo.data?.reportedBy?.fullName || "[Unknown]"}
              </Text>
            </View>
            <View
              className="flex-row justify-between items-center"
              style={{ gap: 10 }}
            >
              <Text
                className="text-sm"
                style={{ color: theme.primaryTextColor }}
              >
                Severity
              </Text>
              <Text
                className="text-sm font-medium"
                style={{ color: theme.primaryTextColor }}
              >
                {LocationInfo.data?.severity || "Unknown"}
              </Text>
            </View>
            <View
              className="flex-row justify-between items-center"
              style={{ gap: 10 }}
            >
              <Text
                className="text-sm"
                style={{ color: theme.primaryTextColor }}
              >
                Current distance:{" "}
              </Text>
              <Text
                className="text-sm font-medium"
                numberOfLines={1}
                style={{ color: theme.primaryTextColor }}
              >
                {LocationInfo.data &&
                  getDistance(location, {
                    longitude: LocationInfo.data?.location?.coordinates[0],
                    latitude: LocationInfo.data?.location?.coordinates[1],
                  }).toLocaleString("de-DE")}
                m
              </Text>
            </View>
            <View
              className="flex-row justify-between items-start flex-wrap"
              style={{ gap: 10 }}
            >
              <Text
                className="text-sm"
                style={{ color: theme.primaryTextColor }}
              >
                Description
              </Text>
              <View className="flex-1 items-end">
                <Text
                  className="text-sm font-medium"
                  style={{ color: theme.primaryTextColor }}
                >
                  {LocationInfo.data?.description || "Unknown"}
                </Text>
              </View>
            </View>
            {(LocationInfo.data?.assets ?? []).length !== 0 && (
              <View
                className="flex-row justify-between items-center"
                style={{ gap: 10 }}
              >
                <FlatList
                  data={LocationInfo.data?.assets}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => openImageView(index)}>
                      <Image
                        source={{ uri: item.url || "" }}
                        className="w-36 h-36 rounded-lg"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, idx) => `HorizontalList_Item__${idx}`}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
                <ImageView
                  initialNumToRender={3}
                  images={
                    (LocationInfo.data?.assets ?? []).map((item) => ({
                      uri: item.url || "",
                    })) || []
                  }
                  imageIndex={index}
                  visible={visible}
                  presentationStyle="overFullScreen"
                  onRequestClose={() => setIsVisible(false)}
                  keyExtractor={(item, idx) => `ImageView_Item__${idx}`}
                  FooterComponent={({ imageIndex }) => (
                    <View
                      className="flex-row justify-center items-center "
                      style={{
                        paddingBottom:
                          Platform.OS === "ios"
                            ? safeAreaInsets.bottom - 15
                            : safeAreaInsets.bottom || 10,
                      }}
                    >
                      <View
                        className="shadow-sm rounded-lg"
                        style={{
                          backgroundColor: theme.secondBackgroundColor,
                        }}
                      >
                        <Text
                          className="text-base font-medium rounded-lg px-3 py-1"
                          style={{
                            color: theme.primaryTextColor,
                          }}
                        >
                          {imageIndex + 1}/{LocationInfo.data?.assets.length}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KCContainer>
      <View
        className="w-full flex-col justify-center pt-3 px-4 border-t "
        style={{
          gap: 10,
          paddingBottom: getResponesive(safeAreaInsets, dimensions)
            .locationReportStyle.spacingTopBottom.marginTop,
          backgroundColor: theme.primaryBackgroundColor,
          borderColor: theme.primaryBorderColor,
        }}
      >
        <KCButton variant="Filled" onPress={handleOpenGoogleMap}>
          {`Open directions in ${
            Platform.OS === "ios" ? "Apple" : "Google"
          } Map`}
        </KCButton>
      </View>
    </StackScreen>
  );
}

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import React from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { RestAPI } from "~apis";
import { KCContainer } from "~components";
import { useLocation, useTheme } from "~hooks";
import { StackScreen } from "~layouts";

export function MapScreen() {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const navigateParams = useRoute();
  const { location } = useLocation();
  const ReportLocation = RestAPI.GetReportLocation();
  const bottomSheetRef = React.useRef(null);
  const [selectMarker, setSelectMarker] = React.useState(null);
  const mapRef = React.useRef(null);

  const initialSnapPoints = React.useMemo(() => ["15%", "50%", "90%"], []);

  const onFocusInput = () => {
    bottomSheetRef?.current?.snapToIndex(initialSnapPoints.length - 1);
  };

  const onMapPress = () => {
    if (bottomSheetRef?.current?.index === initialSnapPoints.length - 1)
      bottomSheetRef?.current?.snapToIndex(0);
    Keyboard.dismiss();
  };
  const onMapMarker = (item) => {
    bottomSheetRef?.current?.snapToIndex(1);
    console.log(item);
    setSelectMarker(item);
  };

  const handleSheetChanges = React.useCallback((index) => {
    console.log("handleSheetChanges", index);
    bottomSheetRef.current = { ...bottomSheetRef.current, index: index };
    if (index === 0) {
      Keyboard.dismiss();
    }
  }, []);

  const currentMap = React.useMemo(() => {
    if (navigateParams.params?.location)
      return { ...navigateParams.params?.location };
    else {
      return { ...location };
    }
  }, [navigateParams.params?.location]);
  const renderHeaderRight = () => {
    return (
      <View
        className="flex-row justify-center items-center"
        style={{ gap: 10 }}
      >
        <TouchableOpacity className="px-2">
          <Image
            source={require("~assets/images/info-icon.png")}
            className="w-8 h-8"
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <StackScreen headerTitle="Map" headerRight={renderHeaderRight()}>
      <View className="flex-1 relative">
        <MapView
          ref={mapRef}
          className="flex-1"
          toolbarEnabled
          mapType="standard"
          loadingEnabled
          provider={PROVIDER_GOOGLE}
          onPress={onMapPress}
          showsMyLocationButton={true}
          showsUserLocation={true}
          followsUserLocation={true}
          mapPadding={{ bottom: 100 }}
          userLocationCalloutEnabled={true}
          initialRegion={{
            ...currentMap,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {(ReportLocation.data ?? []).map((item, idx) => {
            return (
              <Marker
                key={idx}
                onPress={(e) => onMapMarker(item)}
                coordinate={{
                  latitude: item?.location?.latitude,
                  longitude: item?.location?.longitude,
                }}
                title={item.address}
              />
            );
          })}
        </MapView>
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={initialSnapPoints}
          backgroundStyle={{ backgroundColor: theme.primaryBackgroundColor }}
          handleIndicatorStyle={{ backgroundColor: theme.primaryTextColor }}
        >
          <BottomSheetView
            style={{
              paddingHorizontal: 8,
              flex: 1,
            }}
          >
            <View className="relative">
              <TextInput
                autoComplete="name-given"
                className={`shadow-sm rounded-xl px-5 pr-16 ${
                  Platform.OS === "ios" ? "py-5" : "py-4"
                }`}
                style={{
                  backgroundColor: theme.secondBackgroundColor,
                  color: theme.primaryTextColor,
                }}
                placeholder="Search on the map"
                // value=""
                // onChangeText={(value) => {}}
                onFocus={onFocusInput}
                placeholderTextColor={theme.thirdTextColor}
              />
              <View className="absolute right-0 items-center h-full justify-center opacity-80 px-5">
                <Image
                  source={require("~assets/images/search-map-icon.png")}
                  className="h-9 w-9"
                />
              </View>
            </View>
            <KCContainer className="p-2" isEmpty={!selectMarker}>
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <View className="justify-start" style={{ gap: 10 }}>
                  <Text
                    className="font-medium text-lg"
                    style={{ color: theme.primaryTextColor }}
                  >
                    {selectMarker?.address || "<unknown>"}
                  </Text>
                  <Text style={{ color: theme.primaryTextColor }}>
                    <Text
                      className="font-semibold"
                      style={{ color: theme.primaryTextColor }}
                    >
                      Coordinates:{" "}
                    </Text>
                    {`${selectMarker?.location.latitude}, ${selectMarker?.location.longitude}` ||
                      "<unknown>"}
                  </Text>

                  <Text style={{ color: theme.primaryTextColor }}>
                    <Text
                      className="font-semibold"
                      style={{ color: theme.primaryTextColor }}
                    >
                      Contaminated type:{" "}
                    </Text>
                    {selectMarker?.contaminatedType
                      .map((item) => item.contaminatedName)
                      .join(", ")}
                  </Text>
                  <Text style={{ color: theme.primaryTextColor }}>
                    <Text
                      className="font-semibold"
                      style={{ color: theme.primaryTextColor }}
                    >
                      Severity:{" "}
                    </Text>
                    {selectMarker?.severity}
                  </Text>
                  <Text style={{ color: theme.primaryTextColor }}>
                    <Text
                      className="font-semibold"
                      style={{ color: theme.primaryTextColor }}
                    >
                      Status:{" "}
                    </Text>
                    {selectMarker?.status}
                  </Text>
                  <Text style={{ color: theme.primaryTextColor }}>
                    <Text
                      className="font-semibold"
                      style={{ color: theme.primaryTextColor }}
                    >
                      Population density:{" "}
                    </Text>
                    {selectMarker?.populationDensity}
                  </Text>
                  <Text style={{ color: theme.primaryTextColor }}>
                    <Text
                      className="font-semibold"
                      style={{ color: theme.primaryTextColor }}
                    >
                      Description:{" "}
                    </Text>
                    {selectMarker?.description}
                  </Text>
                  <Text style={{ color: theme.primaryTextColor }}>
                    <Text
                      className="font-semibold"
                      style={{ color: theme.primaryTextColor }}
                    >
                      Report by:{" "}
                    </Text>
                    {selectMarker?.isAnonymous ? (
                      <Text
                        className="font-extralight"
                        style={{ color: theme.primaryTextColor }}
                      >
                        [anonymous]
                      </Text>
                    ) : (
                      `${selectMarker?.reportedBy?.fullName}`
                    )}
                  </Text>
                  <Text style={{ color: theme.primaryTextColor }}>
                    <Text
                      className="font-semibold"
                      style={{ color: theme.primaryTextColor }}
                    >
                      Time report:
                    </Text>
                    {dayjs(selectMarker?.createdAt).format(
                      " A hh:mm:ss DD/MM/YYYY"
                    )}
                  </Text>
                </View>
                <View className="flex-1 py-3">
                  {selectMarker?.assets && (
                    <FlatList
                      // pagingEnabled
                      initialNumToRender={1}
                      data={selectMarker?.assets}
                      horizontal
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      bounces={false}
                      keyExtractor={(item) => item._id}
                      renderItem={({ item }) => (
                        <Image
                          source={{ uri: item?.url }}
                          style={{
                            resizeMode: "contain",
                            width: item?.width / 7 || width - 32,
                            height: "70%",
                          }}
                        />
                      )}
                      ItemSeparatorComponent={() => <View className="w-4" />}
                    />
                  )}
                </View>
              </ScrollView>
            </KCContainer>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </StackScreen>
  );
}

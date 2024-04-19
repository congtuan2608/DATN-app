import {
  View,
  Text,
  Platform,
  TextInput,
  ScrollView,
  Keyboard,
  FlatList,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { StackScreen } from "~layouts";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocation, useTheme } from "~hooks";
import { KCContainer, KCIcon } from "~components";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import currentLocation from "~assets/images/current-location.png";
import { RestAPI } from "~apis";
import dayjs from "dayjs";

const fakeData = [
  {
    latitude: 10.6427058,
    longitude: 107.2461546,
  },
  {
    latitude: 10.6428682,
    longitude: 107.2490135,
  },
  {
    latitude: 10.6520164,
    longitude: 107.2489084,
  },
];
export function MapScreen() {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const bottomSheetRef = React.useRef(null);
  const { location } = useLocation();
  const ReportLocation = RestAPI.GetReportLocation();
  const initialSnapPoints = React.useMemo(() => ["15%", "50%", "90%"], []);
  const [selectMarker, setSelectMarker] = React.useState(null);
  const mapRef = React.useRef(null);

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
  }, []);

  return (
    <StackScreen headerTitle="Map">
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
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
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
                className={`bg-gray-200 rounded-xl px-5 pr-14 py-5`}
                placeholder="Search on the map"
                // value=""
                // onChangeText={(value) => {}}
                onFocus={onFocusInput}
                placeholderTextColor={theme.thirdTextColor}
              />
              <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                <KCIcon
                  name="map-marker-radius-outline"
                  family="MaterialCommunityIcons"
                  size={23}
                />
              </View>
            </View>
            <KCContainer className="p-2" isEmpty={!selectMarker}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                      " hh:mm:ss DD/MM/YYYY"
                    )}
                  </Text>
                </View>
                <View className="flex-1 py-3">
                  {selectMarker?.assets && (
                    <FlatList
                      // pagingEnabled
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
                            width: width - 32,
                            // height: "70%",
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

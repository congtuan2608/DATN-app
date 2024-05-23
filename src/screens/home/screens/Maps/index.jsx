import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { RestAPI } from "~apis";
import { KCContainer } from "~components";
import { useDebounce, useLocation, useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { PointInfo } from "./PointInfo";
import { TabListLocations } from "./tabs/TabListLocations";
export function MapScreen() {
  const { theme } = useTheme();
  const { width, height } = useWindowDimensions();
  const navigateParams = useRoute();
  const { location, geocodeAsync } = useLocation();
  const bottomSheetRef = React.useRef(null);
  const [selectMarker, setSelectMarker] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [searchCoord, setsearchCoord] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const [newPoint, setNewPoint] = React.useState(null);
  const mapRef = React.useRef(null);
  const initialSnapPoints = React.useMemo(() => ["15%", "50%", "95%"], []);
  const { safeAreaInsets } = useScreenUtils();
  const ReportLocation = RestAPI.GetReportLocation();
  const PollutionType = RestAPI.GetPollutedType();
  const [configs, setConfigs] = React.useState({
    bottomSheetIndex: 0,
  });

  const handleSearch = useDebounce(async (text) => {
    if (text === "") {
      setNewPoint(null);
      setsearchCoord(location);
      return;
    }
    const res = await geocodeAsync(text);
    setSelectMarker(null);
    if (res) {
      setsearchCoord(res);
    } else {
      setsearchCoord(null);
    }
  }, 250);

  const onFocusInput = () => {
    bottomSheetRef?.current?.snapToIndex(initialSnapPoints.length - 1);
  };

  const onMapPress = (point) => {
    if (bottomSheetRef?.current?.index === initialSnapPoints.length - 1)
      bottomSheetRef?.current?.snapToIndex(0);
    Keyboard.dismiss();
    if (point.nativeEvent.coordinate) {
      if (configs.bottomSheetIndex < 0) bottomSheetRef?.current?.collapse();

      if (
        point.nativeEvent.coordinate?.longitude === newPoint?.longitude &&
        point.nativeEvent.coordinate?.latitude === newPoint?.latitude
      ) {
        return;
      }
      setNewPoint(point.nativeEvent.coordinate);
      setsearchCoord({ latitude: 0, longitude: 0 });
      if (
        point.nativeEvent.coordinate?.longitude !==
          selectMarker?.location?.coordinates[0] &&
        point.nativeEvent.coordinate?.latitude !==
          selectMarker?.location?.coordinates[1]
      ) {
        setSelectMarker(null);
      }
    }
  };
  const onMapMarker = useDebounce((item) => {
    if (Platform.OS === "android") {
      setNewPoint({
        longitude: item?.location?.coordinates[0],
        latitude: item?.location?.coordinates[1],
      });
    }
    setSelectMarker(item);
    mapRef.current.animateToRegion({
      longitude: item?.location?.coordinates[0],
      latitude: item?.location?.coordinates[1],
    });
  }, 0);

  // console.log(selectMarker);
  const handleSheetChanges = React.useCallback((index) => {
    bottomSheetRef.current = { ...bottomSheetRef.current, index: index };
    setConfigs((prev) => ({ ...prev, bottomSheetIndex: index }));
    if (index <= 0) {
      Keyboard.dismiss();
    }
  }, []);

  const currentMap = React.useMemo(() => {
    if (navigateParams.params?.location)
      return { ...navigateParams.params?.location };
    else {
      return { ...location };
    }
  }, [location, navigateParams.params?.location]);

  const backCurrentLocation = () => {
    if (location && mapRef.current) {
      setNewPoint(null);
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  };
  const returnPosition = () => {
    if (configs.bottomSheetIndex === -1) return 30;
    if (configs.bottomSheetIndex === 0) return height / 6.7;
    return height / 2.15;
  };

  const newPointMarker =
    newPoint &&
    newPoint?.latitude !== selectMarker?.location?.coordinates[1] &&
    newPoint?.longitude !== selectMarker?.location?.coordinates[0];
  return (
    <StackScreen
      headerTitle="Map"
      headerRight={<PointInfo pollutionType={PollutionType} />}
    >
      <KCContainer className="flex-1 relative" isLoading={!location}>
        {location?.latitude && location?.longitude ? (
          <MapView
            ref={mapRef}
            className="flex-1 relative"
            toolbarEnabled
            mapType="standard"
            loadingEnabled
            showsCompass={true}
            provider={Platform.OS === "ios" ? undefined : PROVIDER_GOOGLE}
            onPress={onMapPress}
            showsMyLocationButton={true}
            showsUserLocation={true}
            // followsUserLocation={Platform.OS === "android"}
            // mapPadding={{ bottom: 100 }}
            userLocationCalloutEnabled={true}
            onRegionChangeComplete={(region) => {
              // console.log({ region });
            }}
            initialRegion={{
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
              ...currentMap,
            }}
            radius={1000}
          >
            {currentMap && currentMap?.longitude && (
              <>
                {newPointMarker && (
                  <Marker
                    coordinate={newPoint}
                    image={require("~assets/images/new-location-icon.png")}
                  />
                )}
                <Circle
                  center={newPoint || currentMap}
                  radius={1000}
                  fillColor="#5A66CD1A"
                  strokeWidth={0.5}
                />
              </>
            )}
            {(ReportLocation.data ?? []).map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  <Marker
                    onPress={(e) => onMapMarker(item)}
                    coordinate={{
                      longitude: item?.location?.coordinates[0],
                      latitude: item?.location?.coordinates[1],
                    }}
                    title={item.address}
                    image={{ uri: item.contaminatedType[0]?.asset?.url ?? "" }}
                  />
                </React.Fragment>
              );
            })}
          </MapView>
        ) : (
          <KCContainer isLoading={true} />
        )}
        {Platform.OS === "ios" && (
          <TouchableOpacity
            className="absolute rounded-full shadow-sm p-2 right-3"
            onPress={backCurrentLocation}
            style={{
              bottom: returnPosition(),
              backgroundColor: theme.secondBackgroundColor,
            }}
          >
            <Image
              source={require("~assets/images/current-location-icon.png")}
              className="w-8 h-8"
            />
          </TouchableOpacity>
        )}
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={initialSnapPoints}
          backgroundStyle={{ backgroundColor: theme.primaryBackgroundColor }}
          handleIndicatorStyle={{
            backgroundColor: theme.primaryTextColor,
          }}
          enablePanDownToClose
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
                value={search}
                onChangeText={async (text) => {
                  setSearch(text);
                  handleSearch(text);
                }}
                onFocus={onFocusInput}
                placeholderTextColor={theme.thirdTextColor}
              />
              <TouchableOpacity
                className="absolute right-0 items-center h-full justify-center opacity-80 px-5 "
                onPress={() => handleSearch(search)}
              >
                <Image
                  source={require("~assets/images/search-map-icon.png")}
                  className="h-9 w-9"
                />
              </TouchableOpacity>
            </View>
            <KCContainer className="p-2">
              <TabListLocations
                newPoint={newPoint}
                search={search}
                searchCoord={searchCoord}
                selectMarker={selectMarker}
                setSelectMarker={setSelectMarker}
                setNewPoint={setNewPoint}
              />
            </KCContainer>
          </BottomSheetView>
        </BottomSheet>
      </KCContainer>
    </StackScreen>
  );
}

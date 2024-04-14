import {
  View,
  Text,
  Platform,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import React from "react";
import { StackScreen } from "~layouts";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocation, useTheme } from "~hooks";
import { KCIcon } from "~components";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import currentLocation from "~assets/images/current-location.png";

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
  const bottomSheetRef = React.useRef(null);
  const { location } = useLocation();

  const initialSnapPoints = React.useMemo(() => ["15%", "50%", "90%"], []);

  const onFocusInput = () => {
    bottomSheetRef?.current?.snapToIndex(initialSnapPoints.length - 1);
  };

  const onMapPress = () => {
    bottomSheetRef?.current?.snapToIndex(0);
    Keyboard.dismiss();
  };

  const handleSheetChanges = React.useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <StackScreen headerTitle="Map">
      <View className="flex-1 relative">
        <MapView
          className="flex-1"
          provider={PROVIDER_GOOGLE}
          onPress={onMapPress}
          initialRegion={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
            title="your location"
            image={currentLocation}
          />

          {fakeData.map((item, idx) => {
            return (
              <Marker
                key={idx}
                coordinate={{
                  latitude: item?.latitude,
                  longitude: item?.longitude,
                }}
                title="your location"
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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}></ScrollView>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </StackScreen>
  );
}

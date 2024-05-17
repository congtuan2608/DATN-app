import { useNavigation } from "@react-navigation/native";
import { getDistance } from "geolib";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RestAPI } from "~apis";
import { KCContainer } from "~components";
import { useLocation, useTheme } from "~hooks";

const distance = 1000;
export function TabListLocations(props) {
  const { location, geocodeAsync } = useLocation();
  const { theme } = useTheme();
  const LocationNear = RestAPI.GetReportLocationNear();
  const navigate = useNavigation();
  const [locationSelected, setLocationSelected] = React.useState(null);
  React.useEffect(() => {
    if (!props.searchCoord) {
      return LocationNear.mutate({});
    }
    if (
      props.searchCoord?.longitude !== 0 &&
      props.searchCoord?.latitude !== 0
    ) {
      return LocationNear.mutate({
        longitude: props.searchCoord?.longitude,
        latitude: props.searchCoord?.latitude,
        distance,
      });
    }
    if (props.newPoint) {
      return LocationNear.mutate({
        longitude: props.newPoint.longitude,
        latitude: props.newPoint.latitude,
        distance,
      });
    }
    if (props.selectMarker?.location) {
      return LocationNear.mutate({
        longitude: props.selectMarker.location.coordinates[0],
        latitude: props.selectMarker.location.coordinates[1],
        distance,
      });
    }
    return LocationNear.mutate({
      longitude: location.longitude,
      latitude: location.latitude,
      distance,
    });
  }, [props.selectMarker, props.searchCoord, props.newPoint]);
  const renderStyle = (item) => {
    if (props.selectMarker && props.selectMarker?._id === item?._id) {
      return theme.highLightColor;
    }
    // if (
    //   props.newPoint &&
    //   props.newPoint.longitude === item.location.coordinates[0] &&
    //   props.newPoint.latitude === item.location.coordinates[1]
    // ) {
    //   return theme.highLightColor;
    // }
    // if (props.selectMarker?._id === item._id) {
    //   return theme.highLightColor;
    // }
    return theme.secondBackgroundColor;
  };
  const onPressItem = (item) => {
    if (props.setSelectMarker) {
      if (item._id === props.selectMarker?._id) return;
      const coordinate = {
        longitude: item.location.coordinates[0],
        latitude: item.location.coordinates[1],
      };
      setLocationSelected(coordinate);
      props.setNewPoint(coordinate);
      props.setSelectMarker(item);
    }
  };
  const handleSeeDetail = (item) => {
    // navigate.navigate("DetailLocation", { item });
  };
  const returnTextEmpty = () => {
    if (!props.searchCoord) return "Invalid address";
    if (LocationNear.isError) return "Error, please try again";
    if (props.newPoint || props.selectMarker || props.searchCoord?.longitude)
      return "There are no recently reported locations";
  };
  return (
    <KCContainer
      className=""
      isLoading={LocationNear.isPending}
      isEmpty={(LocationNear.data ?? []).length === 0}
      textEmpty={returnTextEmpty()}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, gap: 10 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {LocationNear.data && (
          <View>
            <Text
              className="font-semibold text-base"
              style={{ color: theme.primaryTextColor }}
            >
              Locations are reported around here
            </Text>
          </View>
        )}
        {(LocationNear.data ?? []).map((item, index) => (
          <TouchableOpacity
            onPress={() => onPressItem(item)}
            className="p-2 flex-row rounded-lg"
            key={index}
            style={{
              backgroundColor: theme.secondBackgroundColor,
              gap: 10,
              borderColor: renderStyle(item),
              borderWidth: 1.3,
            }}
          >
            <View>
              <Image
                className="w-20 h-20 rounded-lg"
                source={{ uri: item.assets[0]?.url || "" }}
                resizeMode="cover"
              />
            </View>
            <View className="flex-1 justify-center" style={{ gap: 2 }}>
              <Text numberOfLines={1} style={{ color: theme.primaryTextColor }}>
                <Text className="font-medium">Address: </Text>
                {item.address}
              </Text>
              <Text numberOfLines={1} style={{ color: theme.primaryTextColor }}>
                <Text className="font-medium">Coordinates: </Text>
                {(item.location.coordinates ?? []).join(", ")}
              </Text>
              <Text numberOfLines={1} style={{ color: theme.primaryTextColor }}>
                <Text className="font-medium">Description: </Text>
                {item.description}
              </Text>
              <Text numberOfLines={1} style={{ color: theme.primaryTextColor }}>
                {/* <Text className="font-medium">Current distance: </Text>
                {(item.dist?.calculated ?? 0)?.toFixed(1)}m */}
                <Text className="font-medium">Current distance: </Text>
                {getDistance(location, {
                  longitude: item.location.coordinates[0],
                  latitude: item.location.coordinates[1],
                })}
                m{/* {(item.dist?.calculated ?? 0)?.toFixed(1)}m */}
              </Text>
              <Text numberOfLines={1} style={{ color: theme.primaryTextColor }}>
                {/* <Text className="font-medium">Current distance: </Text>
                {(item.dist?.calculated ?? 0)?.toFixed(1)}m */}
                <Text className="font-medium">Contaminated type: </Text>
                {(item?.contaminatedType ?? [])
                  .map((s) => s.contaminatedName)
                  .join(", ")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </KCContainer>
  );
}

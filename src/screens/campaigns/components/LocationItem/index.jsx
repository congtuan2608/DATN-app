import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageView from "react-native-image-viewing";
import { KCButton } from "~components";
import { useScreenUtils, useTheme } from "~hooks";
export function LocationItem(props) {
  const { theme } = useTheme();
  const navigate = useNavigation();
  const { safeAreaInsets } = useScreenUtils();
  const [visible, setIsVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const openImageView = (idx) => {
    setIsVisible(true);
    setIndex(idx);
  };
  const handlePress = () => {
    if (props?.callback) {
      props?.callback(props);
      navigate.goBack();
      return;
    }
  };
  return (
    <View
      className="w-full rounded-lg p-3 shadow-sm"
      style={{ backgroundColor: theme.secondBackgroundColor, gap: 20 }}
    >
      <View
        className="flex-row justify-between items-start flex-wrap"
        style={{ gap: 20 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Address
        </Text>
        <View className="flex-1 items-end">
          <Text
            className="text-sm font-medium"
            style={{ color: theme.primaryTextColor }}
          >
            {props?.address || "Unknown"}
          </Text>
        </View>
      </View>
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Contaminated type
        </Text>
        <Text
          className="text-sm font-medium"
          style={{ color: theme.primaryTextColor }}
        >
          {props?.contaminatedType.map((item) => item.contaminatedName) ||
            "Unknown"}
        </Text>
      </View>
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Location
        </Text>
        <Text
          className="text-sm font-medium"
          style={{ color: theme.primaryTextColor }}
        >
          {props.location.coordinates.join(", ")}
        </Text>
      </View>
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Report by
        </Text>
        <Text
          className="text-sm font-medium"
          style={{
            color: props?.isAnonymous
              ? theme.thirdTextColor
              : theme.primaryTextColor,
          }}
        >
          {props?.isAnonymous
            ? "[Anonymous]"
            : props?.reportedBy?.fullName || "[Unknown]"}
        </Text>
      </View>
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Severity
        </Text>
        <Text
          className="text-sm font-medium"
          style={{ color: theme.primaryTextColor }}
        >
          {props?.severity || "Unknown"}
        </Text>
      </View>
      <View
        className="flex-row justify-between items-start flex-wrap"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Description
        </Text>
        <View className="flex-1 items-end">
          <Text
            className="text-sm font-medium"
            style={{ color: theme.primaryTextColor }}
          >
            {props?.description || "Unknown"}
          </Text>
        </View>
      </View>
      {props?.assets.length !== 0 && (
        <View
          className="flex-row justify-between items-center"
          style={{ gap: 10 }}
        >
          <FlatList
            data={props?.assets}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => openImageView(index)}>
                <Image
                  source={{ uri: item.url }}
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
            images={props?.assets?.map((item) => ({ uri: item.url })) || []}
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
                    {imageIndex + 1}/{props?.assets.length}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
      <View>
        <KCButton
          variant="Outline"
          onPress={handlePress}
          styleContainer={
            props?.hadCampaign && {
              backgroundColor: theme.primaryBackgroundColor,
            }
          }
          disabled={props?.hadCampaign}
        >
          {props?.hadCampaign
            ? "This place has been organized"
            : props?.prevValue?._id === props?._id
            ? "Remove"
            : "Add"}
        </KCButton>
      </View>
    </View>
  );
}

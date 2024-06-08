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
import { KCContainer } from "~components";
import { useScreenUtils, useTheme } from "~hooks";
export function ReportLocaionItem(props) {
  const { theme } = useTheme();
  const { safeAreaInsets } = useScreenUtils();
  const [visible, setIsVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const openImageView = (idx) => {
    setIsVisible(true);
    setIndex(idx);
  };
  if (!props?._id)
    return (
      <KCContainer
        isEmpty={true}
        textEmpty="This location not found"
        className="flex-1"
      />
    );
  return (
    <View
      className="w-full rounded-lg p-3 shadow-sm"
      style={{ backgroundColor: theme.secondBackgroundColor, gap: 20 }}
    >
      <View
        className="flex-row justify-between items-start flex-wrap"
        style={{ gap: 20 }}
      >
        <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
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
        <Text className="text-sm " style={{ color: theme.thirdTextColor }}>
          Contaminated type
        </Text>
        <Text
          className="text-sm font-medium"
          style={{ color: theme.primaryTextColor }}
        >
          {(props?.contaminatedType ?? []).map(
            (item) => item.contaminatedName
          ) || "Unknown"}
        </Text>
      </View>
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
          Coordinates
        </Text>

        {props.location ? (
          <View className="items-end">
            <Text
              className="text-sm font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {props.location.coordinates[0]}
            </Text>
            <Text
              className="text-sm font-medium"
              style={{ color: theme.primaryTextColor }}
            >
              {props.location.coordinates[1]}
            </Text>
          </View>
        ) : (
          "Unknown"
        )}
      </View>
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
          Report by
        </Text>
        <Text
          className="text-sm font-medium"
          style={{
            color: theme.primaryTextColor,
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
        <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
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
        <Text className="text-sm" style={{ color: theme.thirdTextColor }}>
          Description
        </Text>
        <Text
          className="text-sm font-medium"
          style={{ color: theme.primaryTextColor }}
        >
          {props?.description || "Unknown"}
        </Text>
      </View>

      {(props?.assets ?? []).length !== 0 && (
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
                  source={{ uri: item.url || "" }}
                  className="w-36 h-36 rounded-lg"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, idx) => `HorizontalList_Item__${idx}`}
            ItemSeparatorComponent={() => <View className="w-4" />}
          />
        </View>
      )}

      <ImageView
        initialNumToRender={3}
        images={
          (props?.assets ?? []).map((item) => ({ uri: item.url || "" })) || []
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
                className="text-base rounded-lg px-3 py-1"
                style={{
                  color: theme.primaryTextColor,
                }}
              >
                {imageIndex + 1}/{(props?.assets ?? []).length}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

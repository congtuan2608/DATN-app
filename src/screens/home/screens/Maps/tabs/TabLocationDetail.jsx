import React from "react";
import { ScrollView, Text, View } from "react-native";
import { ImagePreview } from "react-native-images-preview";
import { KCContainer } from "~components";

export function TabLocationDetail(props) {
  const [visible, setIsVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const openImageView = (idx) => {
    setIsVisible(true);
    setIndex(idx);
  };
  return (
    <KCContainer className="p-2">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, gap: 15 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text
          className="font-medium text-lg"
          style={{ color: theme.primaryTextColor }}
        >
          {props?.address || "<unknown>"}
        </Text>
        <Text style={{ color: theme.primaryTextColor }}>
          <Text
            className="font-semibold"
            style={{ color: theme.primaryTextColor }}
          >
            Coordinates:{" "}
          </Text>
          {`${props?.location.coordinates[0]}, ${props?.location.coordinates[1]}` ||
            "<unknown>"}
        </Text>

        <Text style={{ color: theme.primaryTextColor }}>
          <Text
            className="font-semibold"
            style={{ color: theme.primaryTextColor }}
          >
            Contaminated type:{" "}
          </Text>
          {props?.contaminatedType
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
          {props?.severity}
        </Text>
        <Text style={{ color: theme.primaryTextColor }}>
          <Text
            className="font-semibold"
            style={{ color: theme.primaryTextColor }}
          >
            Status:{" "}
          </Text>
          {props?.status}
        </Text>
        <Text style={{ color: theme.primaryTextColor }}>
          <Text
            className="font-semibold"
            style={{ color: theme.primaryTextColor }}
          >
            Population density:{" "}
          </Text>
          {props?.populationDensity}
        </Text>
        <Text style={{ color: theme.primaryTextColor }}>
          <Text
            className="font-semibold"
            style={{ color: theme.primaryTextColor }}
          >
            Description:{" "}
          </Text>
          {props?.description}
        </Text>
        <Text style={{ color: theme.primaryTextColor }}>
          <Text
            className="font-semibold"
            style={{ color: theme.primaryTextColor }}
          >
            Report by:{" "}
          </Text>
          {props?.isAnonymous ? (
            <Text
              className="font-extralight"
              style={{ color: theme.primaryTextColor }}
            >
              [anonymous]
            </Text>
          ) : (
            `${props?.reportedBy?.fullName}`
          )}
        </Text>
        <Text style={{ color: theme.primaryTextColor }}>
          <Text
            className="font-semibold"
            style={{ color: theme.primaryTextColor }}
          >
            Time report:
          </Text>
          {dayjs(props?.createdAt).format(" A hh:mm:ss DD/MM/YYYY")}
        </Text>

        <View className="w-full py-2">
          {props?.assets && (
            <FlatList
              initialNumToRender={3}
              data={props?.assets ?? []}
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
          )}
        </View>
        <ImagePreview
          initialNumToRender={3}
          images={props?.assets.map((item) => ({ uri: item.url || "" })) || []}
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
      </ScrollView>
    </KCContainer>
  );
}

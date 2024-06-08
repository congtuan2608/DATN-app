import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageView from "react-native-image-viewing";
import { KCContainer } from "~components";
import { AVATAR_URL } from "~constants";
import { useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
export function GuidanceDetailScreen() {
  const { theme } = useTheme();
  const { safeAreaInsets } = useScreenUtils();
  const [textShown, setTextShown] = React.useState(false);
  const [lengthMore, setLengthMore] = React.useState(false);
  const [visible, setIsVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const navigateParams = useRoute();

  const openImageView = (idx) => {
    setIsVisible(true);
    setIndex(idx);
  };

  const dataGuidance = navigateParams.params?.data ?? {};

  const assets = React.useMemo(() => {
    let images = [],
      videos = [];

    if (dataGuidance?.assets && dataGuidance.assets.length === 0)
      return { images, videos };

    dataGuidance.assets.map((item) => {
      if (item.media_type === "image") images.push(item);
      else videos.push(item);
    });
    return { images, videos };
  }, []);
  return (
    <StackScreen headerTitle="Guidance detail">
      <KCContainer
        className="px-2 py-3"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            className="rounded-xl px-2 py-3 shadow-sm"
            style={{ backgroundColor: theme.secondBackgroundColor, gap: 5 }}
          >
            <View
              className="flex-row items-center justify-center"
              style={{ gap: 10 }}
            >
              <View
                className="rounded-full border-[0.5px]"
                style={{ borderColor: theme.primaryTextColor }}
              >
                <Image
                  source={{
                    uri: dataGuidance?.author?.avatar?.src ?? AVATAR_URL,
                  }}
                  className="w-12 h-12 rounded-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1 justify-center" style={{ gap: 5 }}>
                <Text
                  className="font-semibold"
                  style={{ color: theme.primaryTextColor }}
                >
                  {dataGuidance?.author?.fullName ?? "<Unknown>"}
                </Text>
                <Text
                  className="italic font-light text-xs"
                  style={{ color: theme.primaryTextColor }}
                >
                  {dayjs(dataGuidance.createdAt).format("HH:mm DD/MM/YYYY")}
                </Text>
              </View>
            </View>
            <View className="px-2 pb-3" style={{ gap: 5 }}>
              <Text
                className="font-semibold text-base"
                style={{ color: theme.primaryTextColor }}
              >
                {dataGuidance?.title ?? ""}
              </Text>
              <Text
                className="text-sm text-clip"
                style={{ color: theme.primaryTextColor }}
              >
                {dataGuidance?.descriptsion ?? "<No data>"}
              </Text>

              {assets && (
                <View className="flex-row flex-wrap justify-evenly items-center pt-2">
                  <FlatList
                    data={assets?.images}
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
                      assets?.images.map((item) => ({ uri: item.url || "" })) ||
                      []
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
                            {imageIndex + 1}/{assets?.images.length}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>
              )}
            </View>
            <View
              className="flex-row border-t pt-3"
              style={{ gap: 20, borderColor: theme.primaryBorderColor }}
            >
              <TouchableOpacity
                className="flex-1 py-3 justify-center items-center rounded-lg"
                style={{ backgroundColor: theme.primaryBackgroundColor }}
              >
                <Text
                  className="text-xs"
                  style={{ color: theme.primaryTextColor }}
                >
                  Like (200)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-3 justify-center items-center rounded-lg"
                style={{ backgroundColor: theme.primaryBackgroundColor }}
              >
                <Text
                  className="text-xs"
                  style={{ color: theme.primaryTextColor }}
                >
                  Save (16)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KCContainer>
    </StackScreen>
  );
}

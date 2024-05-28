import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageView from "react-native-image-viewing";
import { RestAPI } from "~apis";
import { KCContainer, KCIcon } from "~components";
import { useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
const LIMIT_IMAGE = 1;
export function DetectResultsScreen() {
  const navigateParams = useRoute();
  const navigate = useNavigation();
  const { theme } = useTheme();
  const { dimensions, safeAreaInsets } = useScreenUtils();
  const googleVision = RestAPI.GoogleVisionDetectImages();
  const roboflow = RestAPI.RoboflowDetectImages();
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState({
    upload: false,
    detect: false,
  });
  const [visible, setIsVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const openImageView = (idx) => {
    setIsVisible(true);
    setIndex(idx);
  };
  React.useEffect(() => {
    (async () => {
      if (images.length === 0) return;
      switch (navigateParams.params?.type) {
        case "google-vision": {
          setLoading({ ...loading, detect: true });
          const res = await googleVision.mutateAsync({ images });
          console.log("google-vision ", { res });
          setLoading({ ...loading, detect: false });
          return;
        }
        case "roboflow": {
          setLoading({ ...loading, detect: true });

          const res = await roboflow.mutateAsync({ images });
          console.log("roboflow ", res[0]);
          setLoading({ ...loading, detect: false });
          return;
        }
        default:
          return null;
      }
    })();
  }, [navigateParams.params?.type, images]);

  const onChooseFromLibrary = async () => {
    setLoading({ ...loading, upload: true });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: LIMIT_IMAGE,
    });
    setLoading({ ...loading, upload: false });
    if (result.canceled) return;
    setImages((prev) => [result.assets[0]]);
  };

  const onTakePhoto = async () => {
    navigate.navigate("CameraScreen", {
      currentLength: images.length,
      limit: LIMIT_IMAGE,
      setImages,
    });
  };

  const convertToPercent = (value) => {
    return Math.round(value * 100);
  };
  const renderResults = React.useCallback(() => {
    switch (navigateParams.params?.type) {
      case "google-vision": {
        if (!googleVision.data) return;
        return googleVision.data.map((item, idx) => (
          <View
            key={idx}
            className="py-5 px-3 rounded-xl"
            style={{ backgroundColor: theme.secondBackgroundColor, gap: 5 }}
          >
            <Text style={{ color: theme.primaryTextColor }}>
              Name: {item.name}
            </Text>
            <Text style={{ color: theme.primaryTextColor }}>
              Accuracy: {convertToPercent(item.score)}%
            </Text>
          </View>
        ));
      }
      case "roboflow": {
        if (!roboflow.data) return;
        return roboflow.data.map((groups, idx) =>
          (groups?.predictions ?? []).map((groupsItem, idx) => (
            <View
              key={idx}
              className="py-5 px-3 rounded-xl"
              style={{ backgroundColor: theme.secondBackgroundColor, gap: 5 }}
            >
              <Text style={{ color: theme.primaryTextColor }}>
                Name: {groupsItem.class} ({idx + 1})
              </Text>
              <Text style={{ color: theme.primaryTextColor }}>
                Exact ratio: {convertToPercent(groupsItem.confidence)}%
              </Text>
              <Text style={{ color: theme.primaryTextColor }}>
                Description: {groupsItem?.info?.description}
              </Text>
            </View>
          ))
        );
      }
      default:
        return null;
    }
  }, [googleVision.data, roboflow.data]);

  const isEmpty = React.useMemo(() => {
    switch (navigateParams.params?.type) {
      case "google-vision": {
        return (googleVision.data ?? []).lenght === 0;
      }
      case "roboflow": {
        return (roboflow.data ?? []).lenght === 0;
      }
      default:
        return true;
    }
  }, [googleVision.data, roboflow.data]);
  const renderTitle = () => {
    switch (navigateParams.params?.type) {
      case "google-vision": {
        return "Result detect object";
      }
      case "roboflow": {
        return "Result garbage classification";
      }
      default:
        return null;
    }
  };

  const renderCoordinate = (data) => {
    if (!data) return;
    const results = (data.predictions ?? []).map((item) => {
      const { x, y, width, height } = item;
      console.log(convertToPercent(y), convertToPercent(x));
      return (
        <View
          className="absolute border-2 border-red-500 z-50"
          style={{
            width: 100,
            height: 100,
            top: `${y / 100}%`,
            left: `${x / 100}%`,
          }}
        ></View>
      );
    });
    return results;
  };
  return (
    <StackScreen headerTitle={navigateParams.params?.title || "<Unknown>"}>
      <View
        className="flex-1 px-2 pt-2"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: safeAreaInsets.bottom,
          }}
        >
          <KCContainer
            className="flex-1 z-0"
            isLoading={googleVision.isPending || roboflow.isPending}
            isEmpty={isEmpty}
            style={{ backgroundColor: theme.primaryBackgroundColor }}
          >
            {(roboflow.data ?? [])[0]?.src && images.length ? (
              <View className="flex-1">
                <View className="relative rounded-lg ">
                  {/* <KCCanvas
                  images={images}
                  googleVision={googleVision}
                  roboflow={roboflow}
                /> */}
                  <TouchableOpacity
                    onPress={() => openImageView(index)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={{ uri: (roboflow.data ?? [])[0]?.src || "" }}
                      className="w-full rounded-lg"
                      resizeMode="contain"
                      style={{
                        backgroundColor: theme.secondBackgroundColor,
                        height:
                          images[0]?.height *
                          ((dimensions.window.width - 15) / images[0]?.width),
                      }}
                    />
                  </TouchableOpacity>
                  <ImageView
                    initialNumToRender={3}
                    images={
                      (roboflow.data ?? []).map((item) => ({
                        uri: item?.src || "",
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
                            {imageIndex + 1}/{images.length}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                  <TouchableOpacity
                    className="absolute -top-1 -right-1 rounded-full p-2"
                    onPress={() => setImages([])}
                  >
                    <KCIcon
                      name="close"
                      family="Ionicons"
                      size={35}
                      color="red"
                    />
                  </TouchableOpacity>
                </View>

                <View className="flex-1 w-full" style={{ gap: 5 }}>
                  <Text
                    className="text-base font-semibold py-3"
                    style={{ color: theme.primaryTextColor }}
                  >
                    {renderTitle()}
                  </Text>
                  {renderResults()}
                </View>
              </View>
            ) : (
              <View
                className="flex-1 w-full justify-center px-2"
                style={{ gap: 20 }}
              >
                <TouchableOpacity
                  className="justify-center items-center py-6 rounded-xl shadow-md"
                  style={{
                    gap: 5,
                    backgroundColor: theme.secondBackgroundColor,
                  }}
                  onPress={onChooseFromLibrary}
                >
                  {loading.upload ? (
                    <ActivityIndicator
                      size="large"
                      color={theme.primaryIconColor}
                    />
                  ) : (
                    <Image
                      source={require("~assets/images/upload-image-icon.png")}
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                  )}

                  <Text style={{ color: theme.primaryTextColor }}>
                    Choose photo from gallery (PNG, JPEG, JPG)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="justify-center items-center py-6 rounded-xl shadow-md"
                  style={{
                    gap: 5,
                    backgroundColor: theme.secondBackgroundColor,
                  }}
                  onPress={onTakePhoto}
                >
                  <Image
                    source={require("~assets/images/camera-icon.png")}
                    className="w-8 h-8"
                  />
                  <Text style={{ color: theme.primaryTextColor }}>
                    Take photos with your camera
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </KCContainer>
        </ScrollView>
      </View>
    </StackScreen>
  );
}

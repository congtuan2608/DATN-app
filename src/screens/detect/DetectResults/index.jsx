import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const tensorflow = RestAPI.TensorflowDetectImages();
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState({
    upload: false,
    detect: false,
  });

  React.useEffect(() => {
    (async () => {
      if (images.length === 0) return;
      console.log(navigateParams.params?.type);
      switch (navigateParams.params?.type) {
        case "google-vision": {
          setLoading({ ...loading, detect: true });
          const res = await googleVision.mutateAsync({ images });
          console.log("google-vision ", { res });
          setLoading({ ...loading, detect: false });
          return;
        }
        case "tensorflow": {
          setLoading({ ...loading, detect: true });
          const res = await tensorflow.mutateAsync({ images });
          console.log("tensorflow ", res[0]);
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
      case "tensorflow": {
        if (!tensorflow.data) return;
        return tensorflow.data.map((groups, idx) =>
          groups.map((groupsItem, idx) => (
            <View
              key={idx}
              className="py-5 px-3 rounded-xl"
              style={{ backgroundColor: theme.secondBackgroundColor, gap: 5 }}
            >
              <Text style={{ color: theme.primaryTextColor }}>
                Name: {groupsItem.class}
              </Text>
              <Text style={{ color: theme.primaryTextColor }}>
                Exact ratio: {convertToPercent(groupsItem.score)}%
              </Text>
            </View>
          ))
        );
      }
      default:
        return null;
    }
  }, [googleVision.data, tensorflow.data]);
  const isEmpty = React.useMemo(() => {
    switch (navigateParams.params?.type) {
      case "google-vision": {
        return (googleVision.data ?? []).length === 0;
      }
      case "tensorflow": {
        return (tensorflow.data ?? []).length === 0;
      }
      default:
        return true;
    }
  }, [googleVision.data, tensorflow.data]);
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
          {images.length ? (
            <View className="flex-1">
              <View
                className="relative w-full rounded-lg"
                style={{ height: dimensions.screen.height / 2.5 }}
              >
                <Image
                  source={{ uri: images[0]?.uri }}
                  className="w-full h-full rounded-lg"
                  resizeMode="contain"
                  style={{ backgroundColor: theme.secondBackgroundColor }}
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

              <KCContainer
                className="flex-1"
                isLoading={googleVision.isPending || tensorflow.isPending}
                isEmpty={isEmpty}
                style={{ backgroundColor: theme.primaryBackgroundColor }}
              >
                <View className="flex-1 w-full" style={{ gap: 5 }}>
                  <Text
                    className="text-base font-semibold py-3"
                    style={{ color: theme.primaryTextColor }}
                  >
                    Result detect object
                  </Text>
                  {renderResults()}
                </View>
              </KCContainer>
            </View>
          ) : (
            <View
              className="flex-1 w-full justify-center px-2"
              style={{ gap: 20 }}
            >
              <TouchableOpacity
                className="justify-center items-center py-6 rounded-xl shadow-md"
                style={{ gap: 5, backgroundColor: theme.secondBackgroundColor }}
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
                  Choose photo from gallery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="justify-center items-center py-6 rounded-xl shadow-md"
                style={{ gap: 5, backgroundColor: theme.secondBackgroundColor }}
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
        </ScrollView>
      </View>
    </StackScreen>
  );
}

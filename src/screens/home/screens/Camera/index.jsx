import { useNavigation, useRoute } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { KCIcon } from "~components";
import { useScreenUtils } from "~hooks";
import { StackScreen } from "~layouts";
export const CameraScreen = () => {
  const screenUtils = useScreenUtils();
  const navigateParams = useRoute();
  const navigate = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [imageList, setImageList] = React.useState([]);
  const [type, setType] = React.useState(CameraType.back);
  const [flash, setFlash] = React.useState(Camera.Constants.FlashMode.off);
  const cameraRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.granted);
    })();
  }, []);
  const takePicture = async () => {
    if (
      navigateParams.params?.limit &&
      imageList.length + navigateParams.params?.currentLength >=
        navigateParams.params?.limit
    ) {
      Alert.alert(
        "Oop!",
        `Cannot take more than ${navigateParams.params?.limit} photos`,
        [
          {
            text: "OK",
            style: "default",
          },
        ]
      );
      return;
    }
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        // await MediaLibrary.createAssetAsync(data?.uri);
        setImagePreview(data);
        setImageList((prev) => [...prev, data]);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const reCapture = async () => {
    setImagePreview(null);
    setImageList((prev) => {
      prev.pop();
      return prev;
    });
  };
  const continueTakeImage = async () => {
    try {
      // await MediaLibrary.createAssetAsync(image.uri); // lưu ảnh vào thư viện
      // setImageList((prev) => [...prev, imagePreview]);
      setImagePreview(null);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSumitImage = async () => {
    if (navigateParams?.params?.setImages) {
      navigateParams?.params.setImages((prev) => [...prev, ...imageList]);
      navigate.goBack();
    }
  };

  if (!hasCameraPermission) {
    return (
      <StackScreen>
        <View className="flex-1 justify-center items-center">
          <Text className="text-center">No access to camera</Text>
        </View>
      </StackScreen>
    );
  }
  return (
    <StackScreen
      styleContainer={{ backgroundColor: "black" }}
      header={
        <View className="flex flex-row justify-between items-center ">
          <View className="flex flex-1 flex-row items-center justify-between pb-2 px-3 pl-0">
            <View>
              <TouchableOpacity
                className="px-[12px]"
                onPress={() => navigate.goBack()}
              >
                <KCIcon
                  family="Entypo"
                  name="chevron-small-left"
                  className="pt-[2px]"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                className="px-[12px]"
                onPress={() =>
                  setType((prev) =>
                    prev === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  )
                }
              >
                <KCIcon
                  family="Ionicons"
                  name="camera-reverse"
                  className="pt-[2px]"
                  size={25}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                className="px-[12px]"
                onPress={() =>
                  setFlash((prev) =>
                    prev === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  )
                }
              >
                <KCIcon
                  family="Ionicons"
                  name={
                    flash === Camera.Constants.FlashMode.off
                      ? "flash-off"
                      : "flash"
                  }
                  className="pt-[2px]"
                  size={22}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                className="px-[12px]"
                onPress={handleSumitImage}
              >
                <KCIcon
                  family="AntDesign"
                  name="export"
                  className="pt-[2px]"
                  size={25}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    >
      <Camera type={type} flashMode={flash} ref={cameraRef} className="flex-1">
        {imagePreview && (
          <Image
            source={imagePreview}
            resizeMode="cover"
            className="flex-1 w-full z-10"
          />
        )}
      </Camera>
      <View
        className="pt-2"
        style={{ marginBottom: (screenUtils.safeAreaInsets.bottom || 20) - 5 }}
      >
        {imagePreview ? (
          <View className="flex-row justify-around">
            <TouchableOpacity
              className="py-3 flex-row justify-center items-center"
              onPress={reCapture}
              style={{
                gap: 5,
              }}
            >
              <KCIcon
                family="MaterialCommunityIcons"
                name="camera-retake"
                size={22}
                color="white"
              />
              <Text className="text-base font-medium text-white">
                Re capture
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 flex-row justify-center items-center"
              onPress={continueTakeImage}
              style={{
                gap: 5,
              }}
            >
              <KCIcon family="Ionicons" name="camera" size={22} color="white" />
              <Text className="text-base font-medium text-white">Continue</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="py-3 flex-row justify-center items-center"
            style={{
              gap: 5,
            }}
            onPress={takePicture}
          >
            <KCIcon family="Ionicons" name="camera" size={25} color="white" />
            <Text className="text-base font-medium text-white">
              Take a photo
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </StackScreen>
  );
};

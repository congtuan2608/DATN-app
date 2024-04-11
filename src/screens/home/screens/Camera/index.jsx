import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StackScreen } from "~layouts";
import { KCIcon } from "~components";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useScreenUtils } from "~hooks";
import { useNavigation } from "@react-navigation/native";
export const CameraScreen = () => {
  const screenUtils = useScreenUtils();
  const navigate = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
  const [image, setImage] = React.useState(null);
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
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const continueTakeImage = async () => {
    try {
      // await MediaLibrary.createAssetAsync(image.uri); // lưu ảnh vào thư viện
      setImageList((prev) => [...prev, image]);
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSumitImage = async () => {
    console.log(imageList);
    const data = await fetch(
      "https://865a-2405-4802-a544-ffc0-45d1-7f74-c118-6af.ngrok-free.app"
    );
    console.log(data);
  };

  if (!hasCameraPermission) {
    return (
      <View className="flex-1 justify-center items-start">
        <Text>No access to camera</Text>
      </View>
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
      {!image ? (
        <Camera
          type={type}
          flashMode={flash}
          ref={cameraRef}
          className="flex-1"
        />
      ) : (
        <Image source={image} resizeMode="cover" className="flex-1 w-full" />
      )}

      <View
        className="pt-2"
        style={{ marginBottom: screenUtils.safeAreaInsets.bottom - 5 }}
      >
        {image ? (
          <View className="flex-row justify-around">
            <TouchableOpacity
              className="py-3 flex-row justify-center items-center"
              onPress={() => {
                setImage(null);
              }}
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
              <Text className="text-base font-medium text-white">Chụp lại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 flex-row justify-center items-center"
              onPress={continueTakeImage}
              style={{
                gap: 5,
              }}
            >
              <KCIcon family="Ionicons" name="camera" size={22} color="white" />
              <Text className="text-base font-medium text-white">
                Chụp tiếp
              </Text>
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
            <Text className="text-base font-medium text-white">Chụp ảnh</Text>
          </TouchableOpacity>
        )}
      </View>
    </StackScreen>
  );
};

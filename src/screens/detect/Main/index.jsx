import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { KCButton, KCContainer } from "~components";
import { useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { getResponesive } from "~utils";

const DATA_ITEMS = [
  {
    type: "google-vision",
    path: require("~assets/images/detect-object-icon.png"),
    title: "Detect objects",
    description:
      "Extract information about objects, faces, and text within images",
  },
  {
    type: "tensorflow",
    path: require("~assets/images/detect-trash-icon.png"),
    title: "Garbage classification",
    description:
      "Predict the type of trash the image contains, such as glass, plastic...",
  },
];
export const DetectScreens = () => {
  const { dimensions, safeAreaInsets } = useScreenUtils();
  const navigate = useNavigation();
  const navigateParams = useRoute();
  const { theme } = useTheme();
  const [selectDetect, setSelectDetect] = React.useState(null);

  const onGetStarted = () => {
    navigate.navigate("DetectResultsScreen", DATA_ITEMS[selectDetect]);
  };
  return (
    <StackScreen
      headerTitle="Detection images"
      headerShown={navigateParams.params?.headerShown ?? false}
      styleContainer={
        !navigateParams.params?.headerShown && {
          backgroundColor: theme.primaryBackgroundColor,
        }
      }
    >
      <KCContainer
        style={{ backgroundColor: theme.primaryBackgroundColor, gap: 10 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
            paddingTop: 40,
            paddingHorizontal: 10,
            gap: 30,
          }}
        >
          <View className="justify-center items-center" style={{ gap: 10 }}>
            <Image
              source={require("~assets/images/detect-images-icon.png")}
              className="w-16 h-16"
            />
            <Text
              className="font-semibold text-base"
              style={{ color: theme.primaryTextColor }}
            >
              Detect images
            </Text>
          </View>
          <View className="justify-center items-center" style={{ gap: 10 }}>
            <Text
              className="font-semibold text-2xl"
              style={{ color: theme.primaryTextColor }}
            >
              AI Image Detection
            </Text>
            <Text
              className="text-center px-2 text-sm"
              style={{ color: theme.primaryTextColor }}
            >
              Choose the type of detection you want to perform
            </Text>
          </View>
          <View className="flex-1 w-full px-4 mt-5" style={{ gap: 15 }}>
            {DATA_ITEMS.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                className="flex-row justify-between items-center rounded-xl py-3 px-4 shadow-sm"
                style={{ backgroundColor: theme.secondBackgroundColor }}
                onPress={() =>
                  setSelectDetect(idx === selectDetect ? null : idx)
                }
              >
                <View>
                  <Image source={item.path} className="w-14 h-14" />
                </View>
                <View className="flex-1 px-2 ">
                  <Text
                    className="font-semibold"
                    style={{ color: theme.primaryTextColor }}
                  >
                    {item.title}
                  </Text>
                  <Text style={{ color: theme.primaryTextColor }}>
                    {item.description}
                  </Text>
                </View>
                <View className="w-7 h-7">
                  {idx === selectDetect && (
                    <Image
                      source={require("~assets/images/checked-icon.png")}
                      className="w-7 h-7"
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View
          className="w-full flex-col justify-center pt-3 px-4 border-t "
          style={{
            gap: 10,
            paddingBottom: getResponesive(safeAreaInsets, dimensions)
              .detectImagesStyle.spacingTopBottom.marginTop,
            backgroundColor: theme.primaryBackgroundColor,
            borderColor: theme.primaryBorderColor,
          }}
        >
          <KCButton
            variant="Filled"
            disabled={Number.isInteger(selectDetect) ? false : true}
            onPress={onGetStarted}
          >
            Get started
          </KCButton>
        </View>
      </KCContainer>
    </StackScreen>
  );
};

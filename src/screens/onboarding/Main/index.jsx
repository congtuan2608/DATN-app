import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Animated,
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { View } from "react-native-animatable";
import imgOnboarding_1 from "~assets/images/onboarding_1.png";
import { KCButton } from "~components";
import { useScreenUtils } from "~hooks";
import { OnboardingItem } from "./components";
import { data } from "./data";

const animate1 = {
  0: { translateX: 200, translateY: -500, rotate: "0deg", scale: 0.8 },
  0.92: { translateY: 20, scale: 1.2 },
  1: { translateX: 0, translateY: 0, rotate: "-140deg", scale: 1 },
};
const animate2 = {
  0: { translateX: 200, translateY: 500, scale: 0 },
  0.92: { translateY: -20, scale: 1.3 },
  1: { translateX: 0, translateY: 0, scale: 1.25 },
};

export const OnboardingScreens = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const screenUtils = useScreenUtils();
  const { width } = useWindowDimensions();
  const slidesRef = React.useRef(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const navigate = useNavigation();
  const viewRef_1 = React.useRef();
  const viewRef_2 = React.useRef();

  React.useEffect(() => {
    viewRef_1.current.animate(animate1);
    viewRef_2.current.animate(animate2);
  }, []);

  const onStarted = () => {
    navigate.navigate("Login");
  };
  return (
    <View className="flex-1 relative items-center justify-center">
      <Animatable.View
        ref={viewRef_1}
        duration={1500}
        className="absolute w-full -rotate-[140deg] -top-[150px] -z-10"
      >
        <Image source={imgOnboarding_1} className="" />
      </Animatable.View>
      <View
        className="flex-1 justify-between items-center w-full"
        style={{ paddingVertical: screenUtils.safeAreaInsets.top }}
      >
        <View className="w-full py-4 px-4">
          <TouchableOpacity onPress={onStarted}>
            <Text className="text-right font-semibold text-lg text-slate-800">
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <View className="relative flex-1 z-10 justify-center items-center">
          <FlatList
            data={data}
            pagingEnabled
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OnboardingItem {...item} />}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            onViewableItemsChanged={(item) => {
              setCurrentIndex(item.viewableItems[0]?.index);
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            ref={slidesRef}
          />
          {currentIndex === data.length - 1 && (
            <View className="absolute bottom-0 w-full px-3">
              <KCButton variant="Filled" onPress={onStarted}>
                Get Started
              </KCButton>
            </View>
          )}
        </View>
        <View className="mt-5 flex-row">
          {data.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <View key={i} className={`${Platform.OS === "ios" ? "" : "h-8"}`}>
                <Animated.View
                  className="rounded-md bg-slate-700 mx-2"
                  style={{ width: dotWidth, height: 10, opacity }}
                />
              </View>
            );
          })}
        </View>
      </View>
      <Animatable.View
        ref={viewRef_2}
        duration={1500}
        className="absolute w-full scale-125 -bottom-[40px] -z-10"
      >
        <Image source={imgOnboarding_1} className="" />
      </Animatable.View>
    </View>
  );
};

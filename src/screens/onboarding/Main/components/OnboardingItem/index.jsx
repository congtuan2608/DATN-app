import { Image, Text, View, useWindowDimensions } from "react-native";

export const OnboardingItem = (props) => {
  const { width, height } = useWindowDimensions();
  return (
    <View
      className="flex-1 items-center justify-center relative z-10"
      style={{ gap: 40 }}
    >
      <View>
        <Image
          source={props.img_url}
          style={{
            resizeMode: "contain",
            width: width - 30,
            height: height / 2.3,
          }}
        />
      </View>

      <View className="flex-col" style={{ gap: 30 }}>
        <Text
          className="text-center text-lg px-7 font-normal"
          style={{ width }}
        >
          {props.content}
        </Text>
        <Text className="text-center text-3xl font-semibold">
          {props.title}
        </Text>
      </View>
    </View>
  );
};

import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

export const OnboardingItem = (props) => {
  const { width } = useWindowDimensions();
  return (
    <View
      className="flex-1 flex-col items-center justify-center relative z-10"
      style={{ gap: 40 }}
    >
      <View>
        <Image
          source={props.img_url}
          style={{ resizeMode: "contain", width }}
        />
      </View>

      <View className="flex-col" style={{ gap: 30 }}>
        <Text className="text-center text-3xl font-medium">{props.title}</Text>
        <Text className="text-center text-lg px-7" style={{ width }}>
          {props.content}
        </Text>
      </View>
    </View>
  );
};

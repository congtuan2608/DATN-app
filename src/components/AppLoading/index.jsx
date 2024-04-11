import { Image, Text, View } from "react-native";
export const AppLoading = (props) => {
  return (
    <View className="flex-1 bg-[#dde8bd] justify-center items-center">
      {/* <Text className="text-xl font-semibold text-center">APP DON RAC</Text> */}
      <Image
        source={require("../../../assets/background-app.png")}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
};

import { useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RestAPI } from "~apis";
import { KCButton, KCContainer, KCInputOTP } from "~components";
import { useScreenUtils, useTheme } from "~hooks";

const INPUT_COUNT = 6;
export function InputOTP(props) {
  const [otp, setOTP] = React.useState("");
  const { safeAreaInsets } = useScreenUtils();
  const { theme } = useTheme();
  const navigateParams = useRoute();

  const verifyOTP = RestAPI.VerifyOTP();
  const handleVerifyOTP = async () => {
    const res = await verifyOTP.mutateAsync({
      code: otp,
      email: navigateParams.params?.email,
    });
    if (res.success) {
      props.setIndex((prev) => prev + 1);
    }
  };
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={150}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <KCContainer
        className="flex-1 justify-center items-center px-2"
        style={{ paddingBottom: safeAreaInsets.bottom + 10 }}
      >
        <View className="flex-1 w-full px-2 justify-center items-center">
          <Image
            className="w-full"
            source={require("~assets/images/undraw_completing.png")}
            resizeMode="contain"
          />
        </View>
        <View className="flex-1 justify-center items-center w-full">
          <View className="flex-1 items-center" style={{ gap: 15 }}>
            <View>
              <Text
                className="text-xl font-semibold"
                style={{ color: theme.primaryTextColor }}
              >
                OTP VERIFICATION
              </Text>
            </View>
            <View>
              <Text
                className="text-base "
                style={{ color: theme.primaryTextColor }}
              >
                Enter the OTP sent to{" "}
                <Text className="font-semibold">
                  {navigateParams.params?.email}
                </Text>
              </Text>
            </View>
            <View className="py-4 w-full">
              <KCInputOTP inputCount={INPUT_COUNT} setOTP={setOTP} />
              {verifyOTP.data?.detail && (
                <View className="justify-center items-center mt-3">
                  <Text className="text-sm text-red-500">
                    {verifyOTP.data?.detail}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View className="w-full flex-row justify-between" style={{ gap: 20 }}>
            <KCButton
              onPress={() => {
                props.setIndex((prev) => prev - 1);
              }}
              variant="Outline"
              styleContainer={{ flex: 1 }}
            >
              Prev
            </KCButton>
            <KCButton
              onPress={() => handleVerifyOTP()}
              disabled={otp.length !== INPUT_COUNT}
              variant="Filled"
              styleContainer={{ flex: 1 }}
              isLoading={verifyOTP.isPending}
            >
              Submit
            </KCButton>
          </View>
        </View>
      </KCContainer>
    </KeyboardAwareScrollView>
  );
}

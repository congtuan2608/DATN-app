import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Platform, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RestAPI } from "~apis";
import { KCButton, KCContainer } from "~components";
import { useScreenUtils, useTheme } from "~hooks";

export function InputEmail(props) {
  const [email, setEmail] = React.useState("");
  const { safeAreaInsets } = useScreenUtils();
  const { theme } = useTheme();
  const navigate = useNavigation();
  const navigateParams = useRoute();
  const sendOTP = RestAPI.SendOTP();

  React.useEffect(() => {
    if (navigateParams.params?.email) setEmail(navigateParams.params?.email);
  }, [navigateParams.params?.email]);
  const handleSendOTP = async () => {
    const res = await sendOTP.mutateAsync({
      type: "email",
      email,
    });
    if (res.isSuccess) {
      navigate.setParams({ email });
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
        <View className=" flex-1 w-full px-2 justify-center items-center">
          <Image
            className="w-full"
            source={require("~assets/images/undraw_my_password.png")}
            resizeMode="contain"
          />
        </View>
        <View className="pt-10 flex-1">
          <View className="flex-1" style={{ gap: 15 }}>
            <View>
              <Text
                className="text-xl font-semibold"
                style={{ color: theme.primaryTextColor }}
              >
                Forgot
              </Text>
              <Text
                className="text-xl font-semibold"
                style={{ color: theme.primaryTextColor }}
              >
                Password?
              </Text>
            </View>
            <View>
              <Text
                className="text-base "
                style={{ color: theme.primaryTextColor }}
              >
                Don’t worry ! It happens. Please enter the phone number we will
                send the OTP in this phone number.
              </Text>
            </View>
            <View className="py-4 shadow-sm">
              <TextInput
                autoComplete="email"
                className={`shadow-sm rounded-xl px-5 pr-14 ${
                  Platform.OS === "ios" ? "py-5" : "py-4"
                }`}
                //   onFocus={() => form.handleFocus("email")}
                //   onBlur={() => form.handleBlur("email")}
                placeholder={"Enter the Email"}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={theme.thirdTextColor}
                style={{
                  backgroundColor: theme.primaryBackgroundColor,
                  color: theme.primaryTextColor,
                }}
              />
              {sendOTP.data?.detail && (
                <View className="justify-center items-center mt-3">
                  <Text className="text-sm text-red-500">
                    {sendOTP.data?.detail}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View>
            <KCButton
              onPress={() => handleSendOTP()}
              disabled={email === ""}
              variant="Filled"
              isLoading={sendOTP.isPending}
            >
              Continue
            </KCButton>
          </View>
        </View>
      </KCContainer>
    </KeyboardAwareScrollView>
  );
}

import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RestAPI } from "~apis";
import { KCContainer } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";
// screenType: send-otp-type || verify-otp
export function VerifyOTPScreen() {
  const [config, setConfig] = React.useState({ screenType: "send-otp-type" });
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const sendOTP = RestAPI.SendOTP();
  const verifyOTP = RestAPI.VerifyOTP();
  const navigateParams = useRoute();
  const navigate = useNavigation();
  const { theme } = useTheme();

  React.useEffect(() => {
    if (navigateParams.params?.email) {
      setEmail(navigateParams.params.email);
    }
  }, []);

  const handleSelectSendOTPType = (type) => {
    setConfig({ screenType: type });
  };
  const handleSendOTP = async () => {
    const res = await sendOTP.mutateAsync({
      type: "email",
      email,
    });
    console.log("sendOTP", res);
    if (res) {
      setConfig({ screenType: "verify-otp" });
    }
  };

  const handleVerifyOTP = async () => {
    const res = await verifyOTP.mutateAsync({ code, email });
    console.log("verifyOTP", res);
    if (res.success) {
      navigate.navigate("ResetPasswordScreen");
    }
  };
  const renderContent = () => {
    switch (config.screenType) {
      case "send-otp-type":
        return (
          <>
            <View
              className="justify-center items-center w-full px-4"
              style={{
                gap: 10,
              }}
            >
              <TouchableOpacity
                className="rounded-lg shadow-sm p-4 w-full flex-row items-center justify-between"
                style={{
                  backgroundColor: theme.secondBackgroundColor,
                  gap: 20,
                }}
                onPress={() => handleSelectSendOTPType("email")}
              >
                <Image
                  className="w-10 h-10"
                  source={require("~assets/images/email-icon.png")}
                />
                <Text
                  className="font-semibold text-base flex-1"
                  style={{ color: theme.primaryTextColor }}
                >
                  Receive otp code via email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-lg shadow-sm p-4 w-full flex-row items-center justify-between"
                style={{
                  backgroundColor: theme.secondBackgroundColor,
                  gap: 20,
                }}
              >
                <Image
                  className="w-10 h-10"
                  source={require("~assets/images/sms-phone-icon.png")}
                />
                <Text
                  className="font-semibold text-base flex-1"
                  style={{ color: theme.primaryTextColor }}
                >
                  Receive otp code via phone number
                </Text>
              </TouchableOpacity>
            </View>
          </>
        );
      case "verify-otp":
        return <></>;
      default:
        return <></>;
    }
  };
  const generateTitle = () => {
    switch (config.screenType) {
      case "send-otp-type":
        return "Send OTP";
      case "verify-otp":
        return "Verify OTP";
      default:
        return "Undefined";
    }
  };
  return (
    <StackScreen headerTitle={generateTitle()}>
      <KCContainer style={{ backgroundColor: theme.primaryBackgroundColor }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderContent()}
        </ScrollView>
      </KCContainer>
    </StackScreen>
  );
}

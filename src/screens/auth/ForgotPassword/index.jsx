import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import { StackScreen } from "~layouts";
import { InputEmail } from "./tab/InputEmail";
import { InputOTP } from "./tab/InputOTP";
import { ResetPassword } from "./tab/ResetPassword";

export function ForgotPasswordScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "inputEmail", title: "Enter Email" },
    { key: "inputOTP", title: "Vefiry OTP" },
    { key: "resetPassword", title: "Reset Password" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "inputEmail":
        return <InputEmail {...{ setIndex, index }} />;
      case "inputOTP":
        return <InputOTP {...{ setIndex, index }} />;
      case "resetPassword":
        return <ResetPassword />;
      default:
        return null;
    }
  };
  return (
    <StackScreen headerTitle="Forgot password">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => <></>}
        // swipeEnabled={false}
      />
    </StackScreen>
  );
}

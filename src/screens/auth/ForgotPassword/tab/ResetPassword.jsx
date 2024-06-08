import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RestAPI } from "~apis";
import { KCButton, KCContainer, KCIcon } from "~components";
import { useScreenUtils, useTheme } from "~hooks";

export function ResetPassword(props) {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { safeAreaInsets } = useScreenUtils();
  const { theme } = useTheme();
  const navigate = useNavigation();
  const resetPassword = RestAPI.ResetPassword();
  const [isHidePassword, setIsHidePassword] = React.useState(true);
  const navigateParams = useRoute();
  const handleResetPassword = async () => {
    const res = await resetPassword.mutateAsync({
      email: navigateParams.params?.email,
      newPassword,
    });
    if (res) {
      navigate.navigate("Login");
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
        <View className="w-full px-2 justify-center items-center">
          <Image
            className="w-full"
            source={require("~assets/images/undraw_my_password.png")}
            resizeMode="contain"
          />
        </View>
        <View className="pt-10 flex-1 w-full">
          <View
            className="pb-5 justify-center items-center"
            style={{ gap: 10 }}
          >
            <Text
              className="text-xl font-semibold"
              style={{ color: theme.primaryTextColor }}
            >
              Set a new password
            </Text>
            <Text
              className="text-base text-center px-5"
              style={{ color: theme.primaryTextColor }}
            >
              Create a new password. Ensure it differs from previous ones for
              security
            </Text>
          </View>
          <View className="flex-1 " style={{ gap: 20 }}>
            <View className="shadow-sm relative">
              <TextInput
                autoComplete="email"
                className={`shadow-sm rounded-xl px-5 pr-14 ${
                  Platform.OS === "ios" ? "py-5" : "py-4"
                }`}
                placeholder={"New password"}
                secureTextEntry={isHidePassword}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholderTextColor={theme.thirdTextColor}
                style={{
                  backgroundColor: theme.primaryBackgroundColor,
                  color: theme.primaryTextColor,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsHidePassword(!isHidePassword);
                }}
                className="absolute right-0 items-center h-full justify-center opacity-40 px-5"
              >
                <KCIcon
                  name={isHidePassword ? "eye-off-outline" : "eye-outline"}
                  family="MaterialCommunityIcons"
                  size={25}
                  style={{
                    color: theme.primaryTextColor,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View className="shadow-sm relative">
              <TextInput
                autoComplete="email"
                className={`shadow-sm rounded-xl px-5 pr-14 ${
                  Platform.OS === "ios" ? "py-5" : "py-4"
                }`}
                placeholder={"Confirm new password"}
                secureTextEntry={isHidePassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor={theme.thirdTextColor}
                style={{
                  backgroundColor: theme.primaryBackgroundColor,
                  color: theme.primaryTextColor,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsHidePassword(!isHidePassword);
                }}
                className="absolute right-0 items-center h-full justify-center opacity-40 px-5"
              >
                <KCIcon
                  name={isHidePassword ? "eye-off-outline" : "eye-outline"}
                  family="MaterialCommunityIcons"
                  size={25}
                  style={{
                    color: theme.primaryTextColor,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <KCButton
              onPress={() => handleResetPassword()}
              disabled={
                !(
                  newPassword &&
                  confirmPassword &&
                  newPassword === confirmPassword
                )
              }
              variant="Filled"
            >
              Reset Password
            </KCButton>
          </View>
        </View>
      </KCContainer>
    </KeyboardAwareScrollView>
  );
}

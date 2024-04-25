import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RestAPI } from "~apis";
import login_1 from "~assets/images/login_1.png";
import { KCButton, KCIcon, KCSVGAsset } from "~components";
import { useAuth, useScreenUtils, useTheme } from "~hooks";
import { useForm } from "~hooks/useForm";
import { getResponesive } from "~utils";

const initialValues = { email: "", password: "" };
const validateSchema = {
  email: { required: true, label: "Please enter your email", type: "email" },
  password: { required: true, min: 6, label: "Please enter your password" },
};
export const LoginScreens = () => {
  const auth = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigation();
  const navigateParams = useRoute();
  const { safeAreaInsets, dimensions } = useScreenUtils();

  const [isHidePassword, setIsHidePassword] = React.useState(true);
  const [isShowLoginFailed, setIsShowLoginFailed] = React.useState(false);
  const [isRememberMe, setIsRememberMe] = React.useState(false);
  const form = useForm({ initialValues, validateSchema });
  const login = RestAPI.Login();

  React.useEffect(() => {
    if (navigateParams.params?.email) {
      setEmail(navigateParams.params?.email);
      form.handleChange("password", "");
    }
  }, [navigateParams.params]);

  const onLogin = async () => {
    const formValues = form.handleSubmit();

    if (!formValues.isSuccess) return;

    const res = await login.mutateAsync(formValues.values);

    if (res?.refreshToken && res?.accessToken) {
      auth.login({
        access_token: res.accessToken,
        refresh_token: res.refreshToken,
      });
    }
  };
  return (
    <View
      className="flex-1 relative"
      style={{ backgroundColor: theme.primaryBackgroundColor }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          className="flex-1 flex-col items-center justify-between w-full px-4"
          style={{
            gap: 20,
            ...getResponesive(safeAreaInsets, dimensions).loginStyle
              .spacingBottom,
            ...getResponesive(safeAreaInsets, dimensions).loginStyle.spacingTop,
          }}
        >
          <View
            style={{
              gap: 20,
            }}
          >
            <Image source={login_1} />
            <View className="justify-center items-center">
              <Text
                className="text-2xl"
                style={{ color: theme.primaryTextColor }}
              >
                Welcome back
              </Text>
              <Text
                className="text-base"
                style={{ color: theme.primaryTextColor }}
              >
                sign in to access your account
              </Text>
            </View>
          </View>
          <View className="w-full flex-1" style={{ gap: 20 }}>
            <View>
              <View className="relative">
                <TextInput
                  autoComplete="email"
                  className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  onFocus={() => form.handleFocus("email")}
                  onBlur={() => form.handleBlur("email")}
                  placeholder={"Email"}
                  value={form.values.email}
                  onChangeText={(value) => form.handleChange("email", value)}
                  placeholderTextColor={theme.thirdTextColor}
                  style={{
                    backgroundColor: theme.secondBackgroundColor,
                    color: theme.primaryTextColor,
                  }}
                />
                <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                  <KCIcon
                    name="email-outline"
                    family="MaterialCommunityIcons"
                    size={25}
                    style={{
                      color: theme.primaryTextColor,
                    }}
                  />
                </View>
              </View>
              {form.errors.email && (
                <View className="px-4 mt-2 -mb-3">
                  <Text className="text-xs" style={{ color: "red" }}>
                    {form.errors.email?.message}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <View className="relative">
                <TextInput
                  autoComplete="password"
                  className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  value={form.values.password}
                  onFocus={() => form.handleFocus("password")}
                  onBlur={() => form.handleBlur("password")}
                  onChangeText={(value) => form.handleChange("password", value)}
                  placeholder={"Password"}
                  placeholderTextColor={theme.thirdTextColor}
                  secureTextEntry={isHidePassword}
                  style={{
                    backgroundColor: theme.secondBackgroundColor,
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
              {form.errors.password && (
                <View className="px-4 mt-2 -mb-3">
                  <Text className="text-xs" style={{ color: "red" }}>
                    {form.errors.password?.message}
                  </Text>
                </View>
              )}
            </View>
            {!login.isPending && login.error && (
              <View className="-mb-3 -mt-1">
                <Text className="text-xs text-center" style={{ color: "red" }}>
                  {typeof login.error?.data === "string" &&
                  login.error?.data.length < 200
                    ? login.error?.data
                    : "Something went wrong"}
                </Text>
              </View>
            )}
            <View className="flex-row justify-between px-1">
              <TouchableOpacity
                className="flex-row items-center px-2 py-1"
                style={{ gap: 10 }}
                onPress={() => setIsRememberMe((pre) => !pre)}
              >
                <View
                  className="w-3 h-3 rounded-sm border-[1px]"
                  style={{
                    backgroundColor: isRememberMe
                      ? theme?.highLightColor
                      : theme.primaryBackgroundColor,
                  }}
                >
                  {isRememberMe && (
                    <KCIcon
                      name="check"
                      family="FontAwesome5"
                      size={10}
                      color="white"
                    />
                  )}
                </View>
                <Text
                  className="text-xs"
                  style={{ color: theme.primaryTextColor }}
                >
                  Remember me
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-2 py-1">
                <Text
                  className="text-xs"
                  style={{ color: theme?.highLightColor }}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
            <View
              className="w-full flex-row justify-center items-center px-20"
              style={{
                gap: 20,
              }}
            >
              <View
                className="border w-1/2"
                style={{ borderColor: theme.primaryBorderColor }}
              />
              <Text
                className="text-base font-medium"
                style={{ color: theme.primaryTextColor }}
              >
                Or
              </Text>
              <View
                className="border w-1/2"
                style={{ borderColor: theme.primaryBorderColor }}
              />
            </View>
            <View className="" style={{ gap: 15 }}>
              <TouchableOpacity
                className="flex-row justify-center items-center py-2 rounded-lg"
                style={{
                  backgroundColor: theme.secondBackgroundColor,
                  color: theme.primaryTextColor,
                  gap: 10,
                }}
              >
                <KCSVGAsset name="Google_Color" className="w-8 h-8" />
                <Text
                  className="text-base font-medium"
                  style={{
                    color: theme.primaryTextColor,
                  }}
                >
                  Continue with google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row justify-center items-center py-2 rounded-lg"
                style={{
                  backgroundColor: theme.secondBackgroundColor,
                  color: theme.primaryTextColor,
                  gap: 10,
                }}
              >
                <KCSVGAsset name="Facebook_Color" />
                <Text
                  className="text-base font-medium"
                  style={{
                    color: theme.primaryTextColor,
                  }}
                >
                  Continue with facebook
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        className="w-full flex-col justify-center absolute bottom-0 pt-3 px-4 "
        style={{
          gap: 10,
          paddingBottom:
            safeAreaInsets.bottom + (Platform.OS === "ios" ? -10 : 10),
          backgroundColor: theme.primaryBackgroundColor,
        }}
      >
        <KCButton
          variant="Filled"
          onPress={onLogin}
          disabled={login.isPending}
          isLoading={login.isPending}
        >
          Login
        </KCButton>
        <View className="flex-row justify-center w-full py-2">
          <Text style={{ color: theme.primaryTextColor }}>New Member? </Text>
          <TouchableOpacity onPress={() => navigate.navigate("SignUp")}>
            <Text
              className="font-bold"
              style={{ color: theme?.highLightColor }}
            >
              Sign up now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

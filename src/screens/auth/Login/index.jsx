import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth, useTheme } from "~hooks";
import login_1 from "~assets/images/login_1.png";
import { useScreenUtils } from "~hooks";
import { KCButton, KCSVGAsset } from "~components";
import { KCIcon } from "~components";
import React from "react";
import { getResponesive, validateInput, defaultConfig } from "~utils";
import { RestAPI } from "~apis";

export const LoginScreens = () => {
  const auth = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigation();
  const navigateParams = useRoute();
  const { safeAreaInsets, dimensions } = useScreenUtils();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isHidePassword, setIsHidePassword] = React.useState(true);
  const [isShowLoginFailed, setIsShowLoginFailed] = React.useState(false);
  const [isRememberMe, setIsRememberMe] = React.useState(false);
  const [validateForm, setValidateForm] = React.useState({
    email: defaultConfig,
    password: defaultConfig,
  });
  const login = RestAPI.Login();

  React.useEffect(() => {
    if (navigateParams.params?.email) {
      setEmail(navigateParams.params?.email);
      setPassword("");
    }
  }, [navigateParams.params]);

  const validateField = {
    email: {
      input: email,
      required: true,
      label: "Please enter your email",
      type: "email",
    },
    password: {
      input: password,
      required: true,
      min: 6,
      label: "Please enter your password",
    },
  };

  const onFocusInput = (key, props) => {
    setIsShowLoginFailed(false);
    setValidateForm((prev) => ({
      ...prev,
      [key]: defaultConfig,
    }));
  };
  const onBlurInput = (key, props) => {
    setValidateForm((prev) => ({ ...prev, [key]: validateInput(props) }));
  };
  const onLogin = async () => {
    const newValidate = {};
    Object.keys(validateForm).map(
      (key) => (newValidate[key] = validateInput(validateField[key]))
    );
    setValidateForm(newValidate);

    if (
      Object.entries(newValidate).filter(([key, item]) => item.isError).length
    )
      return;

    const res = await login.mutateAsync({ email, password });

    // auth.login({
    //   access_token: "res.accessToken",
    //   refresh_token: "res.refreshToken",
    // });

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
                  onFocus={() => onFocusInput("email", validateField.email)}
                  onBlur={() => onBlurInput("email", validateField.email)}
                  placeholder={"Email"}
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor={theme.thirdTextColor}
                />
                <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                  <KCIcon
                    name="email-outline"
                    family="MaterialCommunityIcons"
                    size={25}
                  />
                </View>
              </View>
              {validateForm.email?.isError && (
                <View className="px-4 mt-2 -mb-3">
                  <Text
                    className="text-xs"
                    style={{ color: validateForm.email?.errorColor }}
                  >
                    {validateForm.email?.message}
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
                  value={password}
                  onFocus={() =>
                    onFocusInput("password", validateField.password)
                  }
                  onBlur={() => onBlurInput("password", validateField.password)}
                  onChangeText={setPassword}
                  placeholder={"Password"}
                  placeholderTextColor={theme.thirdTextColor}
                  secureTextEntry={isHidePassword}
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
                  />
                </TouchableOpacity>
              </View>
              {validateForm.password?.isError && (
                <View className="px-4 mt-2 -mb-3">
                  <Text
                    className="text-xs"
                    style={{ color: validateForm.password?.errorColor }}
                  >
                    {validateForm.password?.message}
                  </Text>
                </View>
              )}
            </View>
            {!login.isPending && login.error && (
              <View className="-mb-3 -mt-1">
                <Text
                  className="text-xs text-center"
                  style={{ color: validateForm.password.errorColor }}
                >
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
              <View className="border border-neutral-200 w-1/2" />
              <Text
                className="text-base font-medium"
                style={{ color: theme.primaryTextColor }}
              >
                Or
              </Text>
              <View className="border border-neutral-200 w-1/2" />
            </View>
            <View className="" style={{ gap: 15 }}>
              <TouchableOpacity
                className="flex-row justify-center items-center py-2 rounded-lg bg-gray-200"
                style={{ gap: 10 }}
              >
                <KCSVGAsset name="Google_Color" className="w-8 h-8" />
                <Text className="text-base font-medium">
                  Continue with google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row justify-center items-center py-2 rounded-lg bg-gray-200"
                style={{ gap: 10 }}
              >
                <KCSVGAsset name="Facebook_Color" />
                <Text className="text-base font-medium">
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
            safeAreaInsets.bottom + (Platform.OS === "ios" ? 0 : 10),
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

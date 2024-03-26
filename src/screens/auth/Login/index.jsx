import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth, useTheme } from "~hooks";
import login_1 from "~assets/login_1.png";
import { useScreenUtils } from "~hooks";
import { KCButton } from "~components";
import { Checkbox } from "react-native-paper";
import { KCIcon } from "~components";
import React from "react";
export const LoginScreens = () => {
  const navigate = useNavigation();
  const { safeAreaInsets } = useScreenUtils();
  const auth = useAuth();
  const { theme } = useTheme();
  const [isHidePassword, setIsHidePassword] = React.useState(true);

  const onLogin = () => {
    const data = {
      access_token: "access_token",
      refresh_token: "refresh_token",
    };
    auth.login(data);
  };
  return (
    <View className="flex-1">
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
          style={{ gap: 50, marginTop: safeAreaInsets.top }}
        >
          <View style={{ gap: 20 }} className="mt-10">
            <Image source={login_1} />
            <View className="justify-center items-center">
              <Text className="text-2xl">Welcome back</Text>
              <Text className="text-base">sign in to access your account</Text>
            </View>
          </View>
          <View className="w-full flex-1" style={{ gap: 20 }}>
            <View className="relative">
              <TextInput
                autoComplete="email"
                className="bg-gray-200 py-5 rounded-xl px-5 pr-14"
                placeholder="Enter your email"
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
            <View className="relative">
              <TextInput
                autoComplete="password"
                className="bg-gray-200 py-5 rounded-xl px-5 pr-14"
                placeholder="Password"
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
            <View className="flex-row justify-between px-1">
              <TouchableOpacity
                className="flex-row items-center px-2 py-1"
                style={{ gap: 10 }}
              >
                <View className="w-3 h-3 rounded-sm border-[1px]" />
                <Text className="text-xs">Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-2 py-1">
                <Text className="text-indigo-600 text-xs">
                  Forgot password ?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            className="w-full flex-col justify-center "
            style={{ gap: 10, marginBottom: safeAreaInsets.bottom }}
          >
            <KCButton onPress={onLogin}>Login</KCButton>
            <View className="flex-row justify-center w-full py-2">
              <Text>New Member? </Text>
              <TouchableOpacity>
                <Text className="font-bold text-indigo-600">Sign up now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

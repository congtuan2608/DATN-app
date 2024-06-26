import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RestAPI } from "~apis";
import { KCButton, KCContainer, KCIcon } from "~components";
import { useAuth, useForm, useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { getResponesive } from "~utils";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const validateSchema = {
  oldPassword: { required: true, min: 6 },
  newPassword: { required: true, min: 6 },
  confirmPassword: {
    required: true,
    type: "compare",
    config: { ref: "newPassword", label: "Confirm password does not match" },
  },
};
export function PasswordScreen() {
  const { theme } = useTheme();
  const { safeAreaInsets, dimensions } = useScreenUtils();
  const { userProfile, refetchUserProfile } = useAuth();
  const form = useForm({ initialValues: initialValues, validateSchema });
  const changePassword = RestAPI.UpdateProfile();
  const navigate = useNavigation();
  const [isHidePassword, setIsHidePassword] = React.useState(true);
  const handleSave = async () => {
    const formValues = form.handleSubmit();
    if (!formValues.isSuccess) return;

    const res = await changePassword.mutateAsync(form.values);
    console.log(res);
    if (res) {
      navigate.goBack();
    }
  };

  const disabled =
    Object.entries(form.values).filter((item) => item[1] === "").length !== 0;

  return (
    <StackScreen headerTitle="Change password">
      <KCContainer
        className="px-2 "
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: 10,
            paddingVertical: 20,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ gap: 10 }}>
            <View>
              <Text className="font-medium py-1 px-1 text-base">
                Old password
              </Text>
              <View className="relative">
                <TextInput
                  className={`rounded-xl px-5 pr-14 shadow-sm ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  onFocus={() => form.handleFocus("oldPassword")}
                  onBlur={() => form.handleBlur("oldPassword")}
                  placeholder={"Old password"}
                  value={form.values.oldPassword}
                  onChangeText={(value) =>
                    form.handleChange("oldPassword", value)
                  }
                  secureTextEntry={isHidePassword}
                  placeholderTextColor={theme.thirdTextColor}
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
                    size={23}
                    style={{
                      color: theme.primaryTextColor,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {form.errors?.oldPassword && (
                <View className="px-4 mt-2 -mb-3">
                  <Text className="text-xs" style={{ color: "red" }}>
                    {form.errors.oldPassword?.message}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <Text className="font-medium py-1 px-1 text-base">
                New password
              </Text>
              <View className="relative">
                <TextInput
                  className={`rounded-xl px-5 pr-14 shadow-sm ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  onFocus={() => form.handleFocus("newPassword")}
                  onBlur={() => form.handleBlur("newPassword")}
                  placeholder={"New password"}
                  value={form.values.newPassword}
                  onChangeText={(value) =>
                    form.handleChange("newPassword", value)
                  }
                  secureTextEntry={isHidePassword}
                  placeholderTextColor={theme.thirdTextColor}
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
                    size={23}
                    style={{
                      color: theme.primaryTextColor,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {form.errors?.newPassword && (
                <View className="px-4 mt-2 -mb-3">
                  <Text className="text-xs" style={{ color: "red" }}>
                    {form.errors.newPassword?.message}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <Text className="font-medium py-1 px-1 text-base">
                Confirm password
              </Text>
              <View className="relative">
                <TextInput
                  className={`rounded-xl px-5 pr-14 shadow-sm ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  onFocus={() => form.handleFocus("confirmPassword")}
                  onBlur={() => form.handleBlur("confirmPassword")}
                  placeholder={"Confirm password"}
                  value={form.values.confirmPassword}
                  onChangeText={(value) =>
                    form.handleChange("confirmPassword", value)
                  }
                  secureTextEntry={isHidePassword}
                  placeholderTextColor={theme.thirdTextColor}
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
                    size={23}
                    style={{
                      color: theme.primaryTextColor,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {form.errors?.confirmPassword && (
                <View className="px-4 mt-2 -mb-3">
                  <Text className="text-xs" style={{ color: "red" }}>
                    {form.errors.confirmPassword?.message}
                  </Text>
                </View>
              )}
            </View>
            {!changePassword.isPending && changePassword.error?.data && (
              <View className="-mb-3 -mt-1 py-4">
                <Text className="text-xs text-center" style={{ color: "red" }}>
                  {typeof changePassword.error?.data === "string" &&
                  changePassword.error?.data.length < 1000
                    ? changePassword.error?.data
                    : "Something went wrong"}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <View
          className="justify-center pt-3 border-t"
          style={{
            paddingBottom: getResponesive(safeAreaInsets, dimensions)
              .locationReportStyle.spacingTopBottom.marginTop,
            backgroundColor: theme.primaryBackgroundColor,
            borderColor: theme.primaryBorderColor,
          }}
        >
          <KCButton
            variant="Filled"
            onPress={handleSave}
            disabled={disabled}
            isLoading={changePassword.isPending}
          >
            Save
          </KCButton>
        </View>
      </KCContainer>
    </StackScreen>
  );
}

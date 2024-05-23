import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DatePickerModal } from "react-native-paper-dates";
import SelectDropdown from "react-native-select-dropdown";
import { RestAPI } from "~apis";
import { KCButton, KCIcon } from "~components";
import { AVATAR_URL } from "~constants";
import { useAuth, useForm, useScreenUtils, useTheme } from "~hooks";
import { getResponesive } from "~utils";

const initialValues = {
  avatar: undefined,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: undefined,
  password: "",
  confirmPassword: "",
};
const validateSchema = {
  avatar: {},
  firstName: {
    required: true,
    label: "Please enter your first name",
  },
  lastName: {
    required: true,
    label: "Please enter your last name",
  },
  email: {
    required: true,
    label: "Please enter your email",
    type: "email",
  },
  phone: {},
  dateOfBirth: {},
  gender: {},
  password: {
    required: true,
    min: 6,
    label: "Please enter your password",
  },
  confirmPassword: {
    required: true,
    min: 6,
    label: "Please enter your confirm password",
    type: "compare",
    config: { ref: "password", label: "Confirm password does not match" },
  },
};

const genderValues = [
  {
    label: "Female",
    value: "female",
    icon: { name: "female", family: "MaterialIcons" },
  },
  {
    label: "Male",
    value: "male",
    icon: { name: "male", family: "MaterialIcons" },
  },
  { label: "Other", value: "other" },
];

export const SignUpScreens = () => {
  const auth = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigation();
  const { safeAreaInsets, dimensions } = useScreenUtils();
  const [isHidePassword, setIsHidePassword] = React.useState(true);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const genderRef = React.useRef(null);
  const signUp = RestAPI.SignUp();
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
  } = useForm({ initialValues, validateSchema });

  const onSelectAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      handleChange("avatar", undefined);
      return;
    }
    handleChange("avatar", result.assets[0]);
  };

  const onSignUp = async () => {
    const formValues = handleSubmit();

    if (!formValues.isSuccess) return;

    const res = await signUp.mutateAsync(formValues.values);
    if (res) {
      navigate.navigate("Login", res);
    }
  };

  return (
    <View
      className="flex-1 relative"
      style={{ backgroundColor: theme.primaryBackgroundColor }}
    >
      <KeyboardAwareScrollView
        className="flex-1 w-full"
        extraScrollHeight={10}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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
              marginTop: safeAreaInsets.top + 20,
              ...getResponesive(safeAreaInsets, dimensions).signUpStyle
                .spacingBottom,
            }}
          >
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={onSelectAvatar}
                className="relative"
              >
                <Image
                  source={{
                    uri: values.avatar?.uri || AVATAR_URL,
                  }}
                  className="w-28 h-28 rounded-full"
                  resizeMode="cover"
                />
                {values.avatar?.uri ? (
                  <TouchableOpacity
                    onPress={() => handleChange("avatar", undefined)}
                  >
                    <KCIcon
                      className="absolute bottom-0 right-0"
                      name="delete"
                      family="AntDesign"
                      size={30}
                      color="red"
                    />
                  </TouchableOpacity>
                ) : (
                  <KCIcon
                    className="absolute bottom-0 right-0"
                    name="file-image-plus-outline"
                    family="MaterialCommunityIcons"
                    size={30}
                    color={theme.primaryIconColor}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={{ gap: 20 }}>
              <View className="justify-center items-center">
                <Text
                  className="text-2xl"
                  style={{ color: theme.primaryTextColor }}
                >
                  Let's Get Started
                </Text>
                <Text
                  className="text-base"
                  style={{ color: theme.primaryTextColor }}
                >
                  Create an account to Go Green to get all feature
                </Text>
              </View>
            </View>
            <View className="w-full flex-1" style={{ gap: 20 }}>
              <View>
                <View className="relative">
                  <TextInput
                    autoComplete="name-given"
                    className={`rounded-xl px-5 pr-14 shadow-sm ${
                      Platform.OS === "ios" ? "py-5" : "py-4"
                    }`}
                    onFocus={() => handleFocus("firstName")}
                    onBlur={() => handleBlur("firstName")}
                    placeholder={"First name"}
                    value={values.firstName}
                    onChangeText={(value) => handleChange("firstName", value)}
                    placeholderTextColor={theme.thirdTextColor}
                    style={{
                      backgroundColor: theme.secondBackgroundColor,
                      color: theme.primaryTextColor,
                    }}
                  />
                  <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                    <KCIcon
                      name="user-o"
                      family="FontAwesome"
                      size={23}
                      style={{
                        color: theme.primaryTextColor,
                      }}
                    />
                  </View>
                </View>
                {errors?.firstName && (
                  <View className="px-4 mt-2 -mb-3">
                    <Text className="text-xs" style={{ color: "red" }}>
                      {errors.firstName?.message}
                    </Text>
                  </View>
                )}
              </View>
              <View>
                <View className="relative">
                  <TextInput
                    autoComplete="name-family"
                    className={`rounded-xl px-5 pr-14 shadow-sm ${
                      Platform.OS === "ios" ? "py-5" : "py-4"
                    }`}
                    onFocus={() => handleFocus("lastName")}
                    onBlur={() => handleBlur("lastName")}
                    placeholder={"Last name"}
                    value={values.lastName}
                    onChangeText={(value) => handleChange("lastName", value)}
                    placeholderTextColor={theme.thirdTextColor}
                    style={{
                      backgroundColor: theme.secondBackgroundColor,
                      color: theme.primaryTextColor,
                    }}
                  />
                  <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                    <KCIcon
                      name="user-o"
                      family="FontAwesome"
                      size={23}
                      style={{
                        color: theme.primaryTextColor,
                      }}
                    />
                  </View>
                </View>
                {errors?.lastName && (
                  <View className="px-4 mt-2 -mb-3">
                    <Text className="text-xs" style={{ color: "red" }}>
                      {errors.lastName?.message}
                    </Text>
                  </View>
                )}
              </View>
              <View>
                <View className="relative">
                  <TextInput
                    autoComplete="email"
                    className={`rounded-xl px-5 pr-14 shadow-sm ${
                      Platform.OS === "ios" ? "py-5" : "py-4"
                    }`}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    placeholder={"Email"}
                    value={values.email}
                    onChangeText={(value) => handleChange("email", value)}
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
                {errors?.email && (
                  <View className="px-4 mt-2 -mb-3">
                    <Text className="text-xs" style={{ color: "red" }}>
                      {errors.email?.message}
                    </Text>
                  </View>
                )}
              </View>
              <View>
                <View className="relative">
                  <TextInput
                    autoComplete="tel-device"
                    keyboardType="phone-pad"
                    className={`rounded-xl px-5 pr-14 shadow-sm ${
                      Platform.OS === "ios" ? "py-5" : "py-4"
                    }`}
                    onFocus={() => handleFocus("phone")}
                    onBlur={() => handleBlur("phone")}
                    placeholder={"Phone number"}
                    value={values.phone}
                    onChangeText={(value) => handleChange("phone", value)}
                    placeholderTextColor={theme.thirdTextColor}
                    style={{
                      backgroundColor: theme.secondBackgroundColor,
                      color: theme.primaryTextColor,
                    }}
                  />
                  <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                    <KCIcon
                      name="phone"
                      family="Feather"
                      size={23}
                      style={{
                        color: theme.primaryTextColor,
                      }}
                    />
                  </View>
                </View>
                {errors?.phone && (
                  <View className="px-4 mt-2 -mb-3">
                    <Text className="text-xs" style={{ color: "red" }}>
                      {errors.phone?.message}
                    </Text>
                  </View>
                )}
              </View>
              <View className="flex flex-row" style={{ gap: 10 }}>
                <View className="relative flex-1">
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setOpenDatePicker(true)}
                    className={`rounded-xl px-5 pr-14 shadow-sm ${
                      Platform.OS === "ios" ? "py-5" : "py-4"
                    }`}
                    style={{
                      backgroundColor: theme.secondBackgroundColor,
                    }}
                  >
                    <DatePickerModal
                      locale="en"
                      mode="single"
                      visible={openDatePicker}
                      onDismiss={() => setOpenDatePicker(false)}
                      date={values?.dateOfBirth}
                      onConfirm={(param) => {
                        setOpenDatePicker(false);
                        handleChange("dateOfBirth", param.date);
                      }}
                    />
                    <Text
                      style={{
                        color: values?.dateOfBirth
                          ? theme.primaryTextColor
                          : theme.thirdTextColor,
                      }}
                    >
                      {(values?.dateOfBirth &&
                        dayjs(values.dateOfBirth).format("DD/MM/YYYY")) ||
                        "Birth date"}
                    </Text>
                    <View className="absolute top-0 bottom-0 right-0 items-center justify-center opacity-40 px-5">
                      <KCIcon
                        name="date"
                        family="Fontisto"
                        size={23}
                        style={{
                          color: theme.primaryTextColor,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <SelectDropdown
                    ref={genderRef}
                    data={genderValues}
                    onSelect={(selectedItem, index) => {
                      handleChange("gender", selectedItem?.value);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View className="relative">
                          <TouchableOpacity
                            onPress={() => {
                              genderRef.current?.openDropdown();
                            }}
                            activeOpacity={0.6}
                            className={`rounded-xl px-5 pr-14 w-36 shadow-sm ${
                              Platform.OS === "ios" ? "py-5" : "py-4"
                            }`}
                            style={{
                              backgroundColor: theme.secondBackgroundColor,
                            }}
                          >
                            <Text
                              style={{
                                color: values?.gender
                                  ? theme.primaryTextColor
                                  : theme.thirdTextColor,
                              }}
                            >
                              {selectedItem?.label || "Gender"}
                            </Text>
                            <View className="absolute top-0 bottom-0 right-0 items-center justify-center opacity-40 px-5">
                              <KCIcon
                                name="transgender-alt"
                                family="Fontisto"
                                size={25}
                                style={{
                                  color: theme.primaryTextColor,
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                    renderItem={(item, index, isSelected) => {
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 12,
                            paddingHorizontal: 20,
                            ...(isSelected && { backgroundColor: "#D2D9DF" }),
                          }}
                        >
                          <Text className="flex-1 text-center">
                            {item?.label}
                          </Text>
                          {item?.icon && (
                            <KCIcon
                              name={item.icon.name}
                              family={item.icon.family}
                              size={20}
                            />
                          )}
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={{
                      borderRadius: 8,
                    }}
                  />
                  {errors?.gender && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text className="text-xs" style={{ color: "red" }}>
                        {errors.gender?.message}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View>
                <View className="relative">
                  <TextInput
                    className={`rounded-xl px-5 pr-14 shadow-sm ${
                      Platform.OS === "ios" ? "py-5" : "py-4"
                    }`}
                    value={values.password}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    onChangeText={(value) => handleChange("password", value)}
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
                {errors?.password && (
                  <View className="px-4 mt-2 -mb-3">
                    <Text className="text-xs" style={{ color: "red" }}>
                      {errors.password?.message}
                    </Text>
                  </View>
                )}
              </View>
              <View>
                <View className="relative">
                  <TextInput
                    className={`shadow-sm rounded-xl px-5 pr-14 ${
                      Platform.OS === "ios" ? "py-5" : "py-4"
                    }`}
                    value={values.confirmPassword}
                    onFocus={() => handleFocus("confirmPassword")}
                    onBlur={() => handleBlur("confirmPassword")}
                    onChangeText={(value) =>
                      handleChange("confirmPassword", value)
                    }
                    placeholder={"Confirm password"}
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
                {errors?.confirmPassword && (
                  <View className="px-4 mt-2 -mb-3">
                    <Text className="text-xs" style={{ color: "red" }}>
                      {errors.confirmPassword?.message}
                    </Text>
                  </View>
                )}
              </View>
              {!signUp.isPending && signUp.error?.data && (
                <View className="-mb-3 -mt-1">
                  <Text
                    className="text-xs text-center"
                    style={{ color: "red" }}
                  >
                    {typeof signUp.error?.data === "string" &&
                    signUp.error?.data.length < 1000
                      ? signUp.error?.data
                      : "Something went wrong"}
                  </Text>
                </View>
              )}

              {/* <View
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
                  className="flex-row justify-center items-center py-2 rounded-lg shadow-sm"
                  style={{
                    backgroundColor: theme.secondBackgroundColor,
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
                  className="flex-row justify-center items-center py-2 rounded-lg shadow-sm"
                  style={{
                    backgroundColor: theme.secondBackgroundColor,
                    gap: 10,
                  }}
                >
                  <KCSVGAsset name="Facebook_Color" />
                  <Text
                    className="text-base font-medium"
                    style={{ color: theme.primaryTextColor }}
                  >
                    Continue with facebook
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View
        className="w-full flex-col justify-center absolute bottom-0 bg-white pt-3 px-4"
        style={{
          gap: 10,
          paddingBottom:
            safeAreaInsets.bottom + (Platform.OS === "ios" ? -10 : 10),
          backgroundColor: theme.primaryBackgroundColor,
        }}
      >
        <KCButton
          variant="Filled"
          onPress={onSignUp}
          disabled={signUp.isPending}
          isLoading={signUp.isPending}
        >
          Sign Up
        </KCButton>
        <View className="flex-row justify-center w-full py-2">
          <Text style={{ color: theme.primaryTextColor }}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Text
              className="font-bold"
              style={{ color: theme?.highLightColor }}
            >
              Login here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

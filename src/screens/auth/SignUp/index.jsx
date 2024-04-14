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
import { KCButton, KCIcon, KCSVGAsset } from "~components";
import { useAuth, useScreenUtils, useTheme } from "~hooks";
import { defaultConfig, getResponesive, validateInput } from "~utils";
import { useNavigation } from "@react-navigation/native";
import { DatePickerModal } from "react-native-paper-dates";
import SelectDropdown from "react-native-select-dropdown";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import { RestAPI } from "~apis";
const validateField = {
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
  const [isShowSignUpFailed, setIsShowSignUpFailed] = React.useState(false);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const genderRef = React.useRef(null);
  const signUp = RestAPI.SignUp();
  const [formValidate, setFormValidate] = React.useState(() => {
    let newForm = {};
    Object.keys(validateField).map((key) => (newForm[key] = defaultConfig));
    return newForm;
  });
  const [formValues, setFormValues] = React.useState(() => {
    let newValues = {};
    Object.keys(validateField).map((key) => (newValues[key] = undefined));
    return newValues;
  });

  const onFocusInput = (key, props) => {
    setIsShowSignUpFailed(false);
    setFormValidate((prev) => ({
      ...prev,
      [key]: defaultConfig,
    }));
  };
  const onBlurInput = (key, props) => {
    setFormValidate((prev) => ({
      ...prev,
      [key]: validateInput(props),
    }));
  };

  const onSelectAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (result.canceled) {
      setFormValues((prev) => ({
        ...prev,
        avatar: undefined,
      }));
      return;
    }
    setFormValues((prev) => ({
      ...prev,
      avatar: result.assets[0],
    }));
  };

  const onSignUp = async () => {
    const newValidate = {};

    Object.keys(formValidate).map(
      (key) =>
        (newValidate[key] = validateInput({
          ...validateField[key],
          input: formValues[key],
          formValues,
        }))
    );
    setFormValidate(newValidate);

    if (
      Object.entries(newValidate).filter(([key, item]) => item.isError).length
    )
      return;
    const res = await signUp.mutateAsync(formValues);
    console.log(res);
    if (res?.status !== 201) {
      setIsShowSignUpFailed(true);
      return;
    }
    navigate.navigate("Login", res);
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
                  uri:
                    formValues?.avatar?.uri ||
                    "https://res.cloudinary.com/dudwjr0ux/image/upload/v1712904716/assets/user-avatar-2_hhfccz.jpg",
                }}
                className="w-28 h-28 rounded-full"
                resizeMode="cover"
              />
              <KCIcon
                className="absolute bottom-0 right-0"
                name="file-image-plus-outline"
                family="MaterialCommunityIcons"
                size={30}
                color={theme.primaryIconColor}
              />
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
                  className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  onFocus={() =>
                    onFocusInput("firstName", {
                      ...validateField.firstName,
                      input: formValues.firstName,
                    })
                  }
                  onBlur={() =>
                    onBlurInput("firstName", {
                      ...validateField.firstName,
                      input: formValues.firstName,
                    })
                  }
                  placeholder={"First name"}
                  value={formValues.firstName}
                  onChangeText={(value) =>
                    setFormValues((prev) => ({ ...prev, firstName: value }))
                  }
                  placeholderTextColor={theme.thirdTextColor}
                />
                <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                  <KCIcon name="user-o" family="FontAwesome" size={23} />
                </View>
              </View>
              {formValidate.firstName?.isError && (
                <View className="px-4 mt-2 -mb-3">
                  <Text
                    className="text-xs"
                    style={{ color: formValidate.firstName?.errorColor }}
                  >
                    {formValidate.firstName?.message}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <View className="relative">
                <TextInput
                  autoComplete="name-family"
                  className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  onFocus={() =>
                    onFocusInput("lastName", {
                      ...validateField.lastName,
                      input: formValues.lastName,
                    })
                  }
                  onBlur={() =>
                    onBlurInput("lastName", {
                      ...validateField.lastName,
                      input: formValues.lastName,
                    })
                  }
                  placeholder={"Last name"}
                  value={formValues.lastName}
                  onChangeText={(value) =>
                    setFormValues((prev) => ({ ...prev, lastName: value }))
                  }
                  placeholderTextColor={theme.thirdTextColor}
                />
                <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                  <KCIcon name="user-o" family="FontAwesome" size={23} />
                </View>
              </View>
              {formValidate.lastName?.isError && (
                <View className="px-4 mt-2 -mb-3">
                  <Text
                    className="text-xs"
                    style={{ color: formValidate.lastName?.errorColor }}
                  >
                    {formValidate.lastName?.message}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <View className="relative">
                <TextInput
                  autoComplete="email"
                  className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  onFocus={() =>
                    onFocusInput("email", {
                      ...validateField.email,
                      input: formValues.email,
                    })
                  }
                  onBlur={() =>
                    onBlurInput("email", {
                      ...validateField.email,
                      input: formValues.email,
                    })
                  }
                  placeholder={"Email"}
                  value={formValues.email}
                  onChangeText={(value) =>
                    setFormValues((prev) => ({ ...prev, email: value }))
                  }
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
              {formValidate.email?.isError && (
                <View className="px-4 mt-2 -mb-3">
                  <Text
                    className="text-xs"
                    style={{ color: formValidate.email?.errorColor }}
                  >
                    {formValidate.email?.message}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <View className="relative">
                <TextInput
                  autoComplete="tel-device"
                  keyboardType="phone-pad"
                  className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  onFocus={() =>
                    onFocusInput("phone", {
                      ...validateField.phone,
                      input: formValues.phone,
                    })
                  }
                  onBlur={() =>
                    onBlurInput("phone", {
                      ...validateField.phone,
                      input: formValues.phone,
                    })
                  }
                  placeholder={"Phone number"}
                  value={formValues.phone}
                  onChangeText={(value) =>
                    setFormValues((prev) => ({ ...prev, phone: value }))
                  }
                  placeholderTextColor={theme.thirdTextColor}
                />
                <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                  <KCIcon name="phone" family="Feather" size={23} />
                </View>
              </View>
              {formValidate.phone?.isError && (
                <View className="px-4 mt-2 -mb-3">
                  <Text
                    className="text-xs"
                    style={{ color: formValidate.phone?.errorColor }}
                  >
                    {formValidate.phone?.message}
                  </Text>
                </View>
              )}
            </View>
            <View className="flex flex-row" style={{ gap: 10 }}>
              <View className="relative flex-1">
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setOpenDatePicker(true)}
                  className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                >
                  <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={openDatePicker}
                    onDismiss={() => setOpenDatePicker(false)}
                    date={formValues?.dateOfBirth}
                    onConfirm={(param) => {
                      setOpenDatePicker(false);
                      setFormValues((prev) => ({
                        ...prev,
                        dateOfBirth: param.date,
                      }));
                    }}
                  />
                  <Text
                    style={{
                      color: formValues?.dateOfBirth
                        ? theme.primaryTextColor
                        : theme.thirdTextColor,
                    }}
                  >
                    {(formValues?.dateOfBirth &&
                      dayjs(formValues?.dateOfBirth).format("DD/MM/YYYY")) ??
                      "Birth date"}
                  </Text>
                  <View className="absolute top-0 bottom-0 right-0 items-center justify-center opacity-40 px-5">
                    <KCIcon name="date" family="Fontisto" size={23} />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <SelectDropdown
                  ref={genderRef}
                  data={genderValues}
                  onSelect={(selectedItem, index) => {
                    setFormValues((prev) => ({
                      ...prev,
                      gender: selectedItem?.value,
                    }));
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View className="relative">
                        <TouchableOpacity
                          onPress={() => {
                            genderRef.current?.openDropdown();
                          }}
                          activeOpacity={0.6}
                          className={`bg-gray-200 rounded-xl px-5 pr-14 w-36 ${
                            Platform.OS === "ios" ? "py-5" : "py-4"
                          }`}
                        >
                          <Text
                            style={{
                              color: formValues?.gender
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
                {formValidate.gender?.isError && (
                  <View className="px-4 mt-2 -mb-3">
                    <Text
                      className="text-xs"
                      style={{ color: formValidate.gender?.errorColor }}
                    >
                      {formValidate.gender?.message}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View>
              <View className="relative">
                <TextInput
                  className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  value={formValues.password}
                  onFocus={() =>
                    onFocusInput("password", {
                      ...validateField.password,
                      input: formValues.password,
                    })
                  }
                  onBlur={() =>
                    onBlurInput("password", {
                      ...validateField.password,
                      input: formValues.password,
                    })
                  }
                  onChangeText={(value) =>
                    setFormValues((prev) => ({ ...prev, password: value }))
                  }
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
              {formValidate?.password?.isError && (
                <View className="px-4 mt-2 -mb-3">
                  <Text
                    className="text-xs"
                    style={{ color: formValidate.password?.errorColor }}
                  >
                    {formValidate?.password?.message}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <View className="relative">
                <TextInput
                  className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  value={formValues.confirmPassword}
                  onFocus={() =>
                    onFocusInput("confirmPassword", {
                      ...validateField.confirmPassword,
                      input: formValues.confirmPassword,
                    })
                  }
                  onBlur={() =>
                    onBlurInput("confirmPassword", {
                      ...validateField.confirmPassword,
                      input: formValues.confirmPassword,
                      formValues,
                    })
                  }
                  onChangeText={(value) =>
                    setFormValues((prev) => ({
                      ...prev,
                      confirmPassword: value,
                    }))
                  }
                  placeholder={"Confirm password"}
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
              {formValidate?.confirmPassword?.isError && (
                <View className="px-4 mt-2 -mb-3">
                  <Text
                    className="text-xs"
                    style={{ color: formValidate.confirmPassword?.errorColor }}
                  >
                    {formValidate?.confirmPassword?.message}
                  </Text>
                </View>
              )}
            </View>
            {!signUp.isPending &&
              signUp.data?.status !== 201 &&
              isShowSignUpFailed && (
                <View className="-mb-3 -mt-1">
                  <Text
                    className="text-xs text-center"
                    style={{ color: "red" }}
                  >
                    {typeof signUp.data?.detail === "string" &&
                    signUp.data?.detail.length < 1000
                      ? signUp.data?.detail
                      : "Something went wrong"}
                  </Text>
                </View>
              )}

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
        className="w-full flex-col justify-center absolute bottom-0 bg-white pt-3 px-4"
        style={{
          gap: 10,
          paddingBottom: safeAreaInsets.bottom,
          backgroundColor: theme.primaryBackgroundColor,
        }}
      >
        <KCButton
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

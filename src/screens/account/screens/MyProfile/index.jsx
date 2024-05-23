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
import { DatePickerModal } from "react-native-paper-dates";
import SelectDropdown from "react-native-select-dropdown";
import { RestAPI } from "~apis";
import { KCButton, KCContainer, KCIcon } from "~components";
import { AVATAR_URL } from "~constants";
import { useAuth, useForm, useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { getResponesive } from "~utils";

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
const validateSchema = {
  avatar: {},
  firstName: {
    required: true,
  },
  lastName: {},
  email: {
    required: true,
    type: "email",
  },
  phone: {},
  dateOfBirth: {},
  gender: {},
};
export function MyProfileScreen() {
  const { theme } = useTheme();
  const { safeAreaInsets, dimensions } = useScreenUtils();
  const { userProfile, refetchUserProfile } = useAuth();
  const form = useForm({ initialValues: userProfile, validateSchema });
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const genderRef = React.useRef(null);
  const UpdateUserProfile = RestAPI.UpdateProfile();
  const navigate = useNavigation();
  const onSelectAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      if (form.values?.avatar) {
        form.handleChange("avatar", undefined);
      }
      return;
    }
    form.handleChange("avatar", result.assets[0]);
  };
  const handleSave = async () => {
    const entries = Object.entries(form.values);

    const isChange = entries.filter((item) => {
      return form.values[item[0]] !== userProfile[item[0]];
    });

    const newData = isChange.reduce(
      (acc, item) => ({ ...acc, [item[0]]: item[1] }),
      {}
    );
    await UpdateUserProfile.mutateAsync({
      ...newData,
      ...("avatar" in newData &&
        newData?.avatar === undefined && {
          avatar: undefined,
        }),
    });
    await refetchUserProfile();
    navigate.goBack();
  };

  const disabled =
    Object.entries(form.values).filter(
      (item) => form.values[item[0]] !== userProfile[item[0]]
    ).length === 0;
  return (
    <StackScreen headerTitle="My profile">
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
          <View className="justify-center items-center">
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onSelectAvatar}
              className="relative"
            >
              <Image
                source={{
                  uri:
                    form.values?.avatar?.uri ||
                    form.values?.avatar?.url ||
                    AVATAR_URL,
                }}
                className="w-28 h-28 rounded-full"
                resizeMode="cover"
              />
              {form.values?.avatar?.uri ||
              (form.values?.avatar && form.values?.avatar?.public_id) ? (
                <TouchableOpacity
                  onPress={() => {
                    form.handleChange("avatar", undefined);
                  }}
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
          <View style={{ gap: 10 }}>
            <View>
              <Text className="font-medium py-1 px-1 text-base">Email</Text>
              <View className="relative">
                <TextInput
                  className={`rounded-xl px-5 pr-14 shadow-sm ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  readOnly
                  placeholder={"Email"}
                  value={form.values.email}
                  placeholderTextColor={theme.thirdTextColor}
                  style={{
                    backgroundColor: theme.secondBackgroundColor,
                    color: theme.thirdTextColor,
                  }}
                />
                <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                  <KCIcon
                    name="email-outline"
                    family="MaterialCommunityIcons"
                    size={23}
                    style={{
                      color: theme.primaryTextColor,
                    }}
                  />
                </View>
              </View>
              {form.errors?.email && (
                <View className="px-4 mt-2 -mb-3">
                  <Text className="text-xs" style={{ color: "red" }}>
                    {form.errors.email?.message}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <Text className="font-medium py-1 px-1 text-base">
                First name
              </Text>
              <View className="relative">
                <TextInput
                  className={`rounded-xl px-5 pr-14 shadow-sm ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  onFocus={() => form.handleFocus("firstName")}
                  onBlur={() => form.handleBlur("firstName")}
                  placeholder={"First name"}
                  value={form.values.firstName}
                  onChangeText={(value) =>
                    form.handleChange("firstName", value)
                  }
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
              {form.errors?.firstName && (
                <View className="px-4 mt-2 -mb-3">
                  <Text className="text-xs" style={{ color: "red" }}>
                    {form.errors.firstName?.message}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <Text className="font-medium py-1 px-1 text-base">Last name</Text>
              <View className="relative">
                <TextInput
                  className={`rounded-xl px-5 pr-14 shadow-sm ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  onFocus={() => form.handleFocus("lastName")}
                  onBlur={() => form.handleBlur("lastName")}
                  placeholder={"First name"}
                  value={form.values.lastName}
                  onChangeText={(value) => form.handleChange("lastName", value)}
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
              {form.errors?.lastName && (
                <View className="px-4 mt-2 -mb-3">
                  <Text className="text-xs" style={{ color: "red" }}>
                    {form.errors.lastName?.message}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <Text className="font-medium py-1 px-1 text-base">Phone</Text>
              <View className="relative">
                <TextInput
                  className={`rounded-xl px-5 pr-14 shadow-sm ${
                    Platform.OS === "ios" ? "py-5" : "py-4"
                  }`}
                  autoComplete="tel-device"
                  keyboardType="phone-pad"
                  onFocus={() => form.handleFocus("phone")}
                  onBlur={() => form.handleBlur("phone")}
                  placeholder={"Phone number"}
                  value={form.values.phone}
                  onChangeText={(value) => form.handleChange("phone", value)}
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
              {form.errors?.phone && (
                <View className="px-4 mt-2 -mb-3">
                  <Text className="text-xs" style={{ color: "red" }}>
                    {form.errors.phone?.message}
                  </Text>
                </View>
              )}
            </View>

            <View className="flex-row" style={{ gap: 10 }}>
              <View className="flex-1">
                <Text className="font-medium py-1 px-1 text-base">
                  Date of birth
                </Text>
                <View className="relative">
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
                      date={new Date(form.values?.dateOfBirth)}
                      onConfirm={(param) => {
                        setOpenDatePicker(false);
                        form.handleChange("dateOfBirth", param.date);
                      }}
                    />
                    <Text
                      style={{
                        color: form.values?.dateOfBirth
                          ? theme.primaryTextColor
                          : theme.thirdTextColor,
                      }}
                    >
                      {(form.values?.dateOfBirth &&
                        dayjs(form.values.dateOfBirth).format("DD/MM/YYYY")) ||
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
              </View>
              <View>
                <Text className="font-medium py-1 px-1 text-base">Gender</Text>
                <View>
                  <SelectDropdown
                    ref={genderRef}
                    data={genderValues}
                    onSelect={(selectedItem, index) => {
                      form.handleChange("gender", selectedItem?.value);
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
                                color: form.values?.gender
                                  ? theme.primaryTextColor
                                  : theme.thirdTextColor,
                              }}
                            >
                              {selectedItem?.label ||
                                genderValues
                                  .filter(
                                    (item) => item.value === form.values?.gender
                                  )
                                  .shift().label ||
                                "Gender"}
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
                </View>
              </View>
            </View>
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
            isLoading={UpdateUserProfile.isPending}
          >
            Save
          </KCButton>
        </View>
      </KCContainer>
    </StackScreen>
  );
}

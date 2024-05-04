import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import React from "react";
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DatePickerModal } from "react-native-paper-dates";
import { RestAPI } from "~apis";
import { KCButton, KCContainer, KCIcon, KCModal } from "~components";
import { useForm, useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { getResponesive } from "~utils";

const validateSchema = {
  title: {
    required: true,
  },
  description: {
    required: true,
    label: "Please enter your description",
  },

  startDate: {
    required: true,
    type: "date",
  },
  endDate: {
    required: true,
    type: "date",
  },
  limit: {
    required: true,
    type: "number",
    minValue: 10,
    maxValue: 200,
  },
  ref: {},
};

const initialValues = {
  title: "",
  description: "",
  startDate: new Date(),
  endDate: "",
  limit: 30,
  ref: undefined,
};
export function EditCampaigns() {
  const { safeAreaInsets, dimensions } = useScreenUtils();
  const form = useForm({ initialValues, validateSchema });
  const navigateParams = useRoute();
  const { theme } = useTheme();
  const CreateCampaign = RestAPI.CreateCampaign();
  const UpdateCampaign = RestAPI.UpdateCampaign();
  const [openDatePicker, setOpenDatePicker] = React.useState({
    startDate: false,
    endDate: false,
  });
  console.log(form.values);
  const handleSubmit = () => {
    if (navigateParams.params?.id) {
      // Update campaign
      const res = UpdateCampaign.mutateAsync(form.values);
      console.log("UpdateCampaign: ", res);
    } else {
      // Create campaign
      const res = CreateCampaign.mutateAsync(form.values);
      console.log("CreateCampaign: ", res);
    }
  };

  console.log(form.values);
  return (
    <StackScreen
      headerTitle={navigateParams.params?.title || "Create campaign"}
    >
      <KCModal
        title="Notification"
        content={`${
          navigateParams.params?.id ? "Update success!" : "Create success!"
        } Do you want to create a new campaign?`}
        showModal={
          navigateParams.params?.id
            ? UpdateCampaign.isSuccess
            : CreateCampaign.isSuccess
        }
        cbButtonRight={() => form.resetForm()}
      />
      <KCContainer
        className="px-2"
        style={{ backgroundColor: theme.primaryBackgroundColor, gap: 10 }}
      >
        <KeyboardAwareScrollView
          className="flex-1 w-full"
          extraScrollHeight={Platform.OS === "ios" ? 30 : 200}
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
            <View className="flex-1 w-full py-5" style={{ gap: 20 }}>
              <View>
                <View className="relative">
                  <TextInput
                    className={`rounded-xl px-5 pr-14 shadow-sm ${
                      Platform.OS === "ios" ? "py-5" : "py-3"
                    }`}
                    style={{
                      backgroundColor: theme.secondBackgroundColor,
                      color: theme.primaryTextColor,
                    }}
                    onFocus={() => form.handleFocus("title")}
                    onBlur={() => form.handleBlur("title")}
                    placeholder={"Title"}
                    value={form.values.title}
                    onChangeText={(value) => form.handleChange("title", value)}
                    placeholderTextColor={theme.thirdTextColor}
                  />
                  <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                    <KCIcon
                      name="title"
                      family="MaterialIcons"
                      size={23}
                      color={theme.primaryTextColor}
                    />
                  </View>
                </View>
                {form.errors?.title && (
                  <View className="px-4 mt-2 -mb-3">
                    <Text className="text-xs" style={{ color: "red" }}>
                      {form.errors.title?.message}
                    </Text>
                  </View>
                )}
              </View>

              <View>
                <View className="relative">
                  <TextInput
                    inputMode="numeric"
                    className={`rounded-xl px-5 pr-14 shadow-sm ${
                      Platform.OS === "ios" ? "py-5" : "py-3"
                    }`}
                    style={{
                      backgroundColor: theme.secondBackgroundColor,
                      color: theme.primaryTextColor,
                    }}
                    onFocus={() => form.handleFocus("limit")}
                    onBlur={() => form.handleBlur("limit")}
                    placeholder={"Limit participants"}
                    value={String(form.values.limit)}
                    onChangeText={(value) => {
                      const convert = Math.round(Number(value));
                      form.handleChange("limit", convert || value);
                    }}
                    placeholderTextColor={theme.thirdTextColor}
                  />
                  <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                    <KCIcon
                      name="people-robbery"
                      family="FontAwesome6"
                      size={23}
                      color={theme.primaryTextColor}
                    />
                  </View>
                </View>
                {form.errors?.limit && (
                  <View className="px-4 mt-2 -mb-3">
                    <Text className="text-xs" style={{ color: "red" }}>
                      {form.errors.limit?.message}
                    </Text>
                  </View>
                )}
              </View>
              <View className="flex-row" style={{ gap: 10 }}>
                <View className="relative flex-1">
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() =>
                      setOpenDatePicker((p) => ({ ...p, startDate: true }))
                    }
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
                      visible={openDatePicker.startDate}
                      onDismiss={() =>
                        setOpenDatePicker((p) => ({ ...p, startDate: false }))
                      }
                      date={form.values?.startDate}
                      onConfirm={(param) => {
                        setOpenDatePicker((p) => ({ ...p, startDate: false }));
                        form.handleChange("startDate", param.date);
                      }}
                    />
                    <Text
                      style={{
                        color: form.values?.startDate
                          ? theme.primaryTextColor
                          : theme.thirdTextColor,
                      }}
                    >
                      {(form.values?.startDate &&
                        dayjs(form.values.startDate).format("DD/MM/YYYY")) ||
                        "Start date"}
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
                  {form.errors?.startDate && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text className="text-xs" style={{ color: "red" }}>
                        {form.errors.startDate?.message}
                      </Text>
                    </View>
                  )}
                </View>
                <View className="relative flex-1">
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() =>
                      setOpenDatePicker((p) => ({ ...p, endDate: true }))
                    }
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
                      visible={openDatePicker.endDate}
                      onDismiss={() =>
                        setOpenDatePicker((p) => ({ ...p, endDate: false }))
                      }
                      date={form.values?.endDate}
                      onConfirm={(param) => {
                        setOpenDatePicker((p) => ({ ...p, endDate: false }));
                        form.handleChange("endDate", param.date);
                      }}
                    />
                    <Text
                      style={{
                        color: form.values?.endDate
                          ? theme.primaryTextColor
                          : theme.thirdTextColor,
                      }}
                    >
                      {(form.values?.endDate &&
                        dayjs(form.values.endDate).format("DD/MM/YYYY")) ||
                        "End date"}
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
                  {form.errors?.endDate && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text className="text-xs" style={{ color: "red" }}>
                        {form.errors.endDate?.message}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View>
                <View className="relative">
                  <TextInput
                    className={`rounded-xl px-5 pr-14 shadow-sm ${
                      Platform.OS === "ios" ? "py-5" : "py-3"
                    }`}
                    style={{
                      backgroundColor: theme.secondBackgroundColor,
                      color: theme.primaryTextColor,
                    }}
                    multiline
                    numberOfLines={4}
                    onFocus={() => form.handleFocus("description")}
                    onBlur={() => form.handleBlur("description")}
                    placeholder={"Description"}
                    value={form.values.description}
                    onChangeText={(value) =>
                      form.handleChange("description", value)
                    }
                    placeholderTextColor={theme.thirdTextColor}
                  />
                  <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                    <KCIcon
                      name="description"
                      family="MaterialIcons"
                      size={23}
                      color={theme.primaryTextColor}
                    />
                  </View>
                </View>
                {form.errors?.description && (
                  <View className="px-4 mt-2 -mb-3">
                    <Text className="text-xs" style={{ color: "red" }}>
                      {form.errors.description?.message}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        <View
          className="w-full flex-col justify-center pt-3 px-4 border-t "
          style={{
            gap: 10,
            paddingBottom: getResponesive(safeAreaInsets, dimensions)
              .locationReportStyle.spacingTopBottom.marginTop,
            backgroundColor: theme.primaryBackgroundColor,
            borderColor: theme.primaryBorderColor,
          }}
        >
          <KCButton
            variant="Filled"
            onPress={() => console.log(form.handleSubmit())}
            // disabled={signUp.isPending}
          >
            {navigateParams.params?.id ? "Update" : "Create"}
          </KCButton>
        </View>
      </KCContainer>
    </StackScreen>
  );
}

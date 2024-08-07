import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import Checkbox from "expo-checkbox";
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
import { useAuth, useForm, useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { ReportLocaionItem } from "~screens/history/HistoryDetail/components";
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
    // required: true,
    type: "number",
    minValue: 10,
    maxValue: 200,
  },
  reference: {
    required: true,
  },
  allowDonate: {},
};

const initialValues = {
  title: "",
  description: "",
  startDate: new Date(),
  endDate: "",
  limit: 0,
  reference: undefined,
  allowDonate: false,
};
export function EditCampaignsScreen() {
  const { safeAreaInsets, dimensions } = useScreenUtils();
  const { userProfile } = useAuth();
  const form = useForm({ initialValues, validateSchema });
  const navigateParams = useRoute();
  const navigate = useNavigation();
  const { theme } = useTheme();
  const CreateCampaign = RestAPI.CreateCampaign();
  const UpdateCampaign = RestAPI.UpdateCampaign();
  const campaign = RestAPI.GetCampaignById();
  const [openDatePicker, setOpenDatePicker] = React.useState({
    startDate: false,
    endDate: false,
  });

  React.useEffect(() => {
    if (navigateParams.params?.id) {
      // Get campaign detail
      (async () => {
        const res = await campaign.mutateAsync({
          id: navigateParams.params.id,
        });
        if (!res) return;
        form.setInitialValues({
          title: res.title,
          description: res.description,
          startDate: new Date(res.startDate),
          endDate: new Date(res.endDate),
          limit: res.limit,
          reference: res.reference,
          allowDonate: res.allowDonate,
        });
      })();
    }
  }, [navigateParams.params?.id]);
  const handleSubmit = async () => {
    const submit = form.handleSubmit();

    if (submit.errors) return;

    if (navigateParams.params?.id) {
      // Update campaign
      const entries = Object.entries(form.values);

      const isChange = entries.filter((item) => {
        return form.values[item[0]] !== campaign.data[item[0]];
      });

      const newData = isChange.reduce(
        (acc, item) => ({ ...acc, [item[0]]: item[1] }),
        {}
      );
      const res = await UpdateCampaign.mutateAsync({
        ...newData,
        reference: newData?.reference?._id,
        limit: Number(newData?.limit) || undefined,
        id: navigateParams.params?.id,
      });
    } else {
      // Create campaign
      const res = await CreateCampaign.mutateAsync({
        ...submit.values,
        reference: submit.values.reference._id,
        limit: Number(submit.values.limit) || 30,
      });
    }
  };

  return (
    <StackScreen
      headerTitle={
        navigateParams.params?.id ? "Update campaign" : "Create campaign"
      }
    >
      <KCModal
        title="Notification"
        content={`${
          navigateParams.params?.id
            ? "Update success!"
            : "Create success! Do you want to create a new campaign?"
        }`}
        showModal={
          navigateParams.params?.id
            ? UpdateCampaign.isSuccess
            : CreateCampaign.isSuccess
        }
        buttons={[
          {
            text: "Go back",
            variant: "Outline",
            onPress: ({ setVisible }) => {
              setVisible(false);
              navigate.goBack();
            },
          },
          {
            text: "Stay here",
            onPress: ({ setVisible }) => {
              setVisible(false);
              !navigateParams.params?.id && form.resetForm();
            },
          },
        ]}
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
            <View className="flex-1 w-full py-3" style={{ gap: 20 }}>
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
                    placeholder={"Limit participants, default 30"}
                    value={String(form.values.limit || "")}
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
                    onPress={() => {
                      form.handleFocus("endDate");
                      setOpenDatePicker((p) => ({ ...p, endDate: true }));
                    }}
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
                      onDismiss={() => {
                        form.handleBlur("endDate");
                        setOpenDatePicker((p) => ({ ...p, endDate: false }));
                      }}
                      date={form.values?.endDate}
                      onConfirm={(param) => {
                        setOpenDatePicker((p) => ({ ...p, endDate: false }));
                        form.handleChange("endDate", param.date);
                        form.removeError("endDate");
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
                      maxHeight: 170,
                    }}
                    multiline
                    numberOfLines={4}
                    maxLength={500}
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

              {form.values?.reference ? (
                <View
                  className="py-2 rounded-lg shadow-sm"
                  style={{ backgroundColor: theme.secondBackgroundColor }}
                >
                  <ReportLocaionItem {...form.values?.reference} />
                  <View className="px-2">
                    <KCButton
                      variant="Outline"
                      onPress={() => form.handleChange("reference", undefined)}
                      styleContainer={{ borderColor: "red" }}
                      textStyle={{ color: "red" }}
                    >
                      Remove
                    </KCButton>
                  </View>
                </View>
              ) : (
                <View>
                  <View className="relative">
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() =>
                        navigate.navigate("SelectLocation", {
                          callback: (value) =>
                            form.handleChange("reference", value),
                          prevValue: form.values?.reference,
                        })
                      }
                      className={`rounded-xl px-5 pr-14 shadow-sm ${
                        Platform.OS === "ios" ? "py-5" : "py-4"
                      }`}
                      style={{
                        backgroundColor: theme.secondBackgroundColor,
                      }}
                    >
                      <Text
                        style={{
                          color: form.values?.reference
                            ? theme.primaryTextColor
                            : theme.thirdTextColor,
                        }}
                      >
                        {form.values?.reference?.address || "Select location"}
                      </Text>
                    </TouchableOpacity>
                    <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                      <KCIcon
                        name="location"
                        family="Entypo"
                        size={23}
                        color={theme.primaryTextColor}
                      />
                    </View>
                  </View>
                  {form.errors?.reference && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text className="text-xs" style={{ color: "red" }}>
                        {form.errors.reference?.message}
                      </Text>
                    </View>
                  )}
                </View>
              )}
              <View>
                <TouchableOpacity
                  className={`flex-row justify-between rounded-xl px-5 shadow-sm py-5`}
                  style={{
                    backgroundColor: theme.secondBackgroundColor,
                  }}
                  onPress={() => {
                    if (userProfile.role !== "organization")
                      return navigate.navigate("AuthInfoScreen");
                    form.handleChange("allowDonate", !form.values.allowDonate);
                  }}
                >
                  <Text style={{ color: theme.primaryTextColor }}>
                    Allow donate
                  </Text>
                  <Checkbox
                    value={form.values.allowDonate}
                    color={theme.primaryButtonBackgroundColor}
                  />
                </TouchableOpacity>
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
            onPress={handleSubmit}
            disabled={CreateCampaign.isPending || UpdateCampaign.isPending}
          >
            {navigateParams.params?.id ? "Update" : "Create"}
          </KCButton>
        </View>
      </KCContainer>
    </StackScreen>
  );
}

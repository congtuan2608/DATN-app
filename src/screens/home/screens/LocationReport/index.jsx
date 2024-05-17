import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import { RestAPI } from "~apis";
import { KCButton, KCIcon, KCModal } from "~components";
import {
  useAuth,
  useForm,
  useLocation,
  useScreenUtils,
  useTheme,
} from "~hooks";

import { StackScreen } from "~layouts";
import { getResponesive } from "~utils";
import { severityList } from "./data";

const validateSchema = {
  address: {
    required: true,
    min: 10,
    label: "Please input address",
  },
  description: {
    required: true,
    min: 10,
    label: "Please input description",
  },
  contaminatedType: {
    required: true,
    label: "Please select contaminated type",
    type: "array",
  },
  severity: {
    required: true,
    label: "Please select severity",
  },
  // status: {
  //   required: true,
  //   default: "need-intervention",
  // },
  // populationDensity: {},
  assets: {},
  isAnonymous: {},
  location: {
    type: "object",
  },
};
const initialValues = {
  address: "",
  description: "",
  contaminatedType: [],
  severity: "",
  // status: "",
  // populationDensity: "",
  assets: [],
  isAnonymous: true,
  location: { latitude: 0, longitude: 0 },
};
export function LocationReportScreen() {
  const { location, getCurrentLocation, reverseGeocodeAsync, geocodeAsync } =
    useLocation();
  const { safeAreaInsets, dimensions } = useScreenUtils();
  const navigate = useNavigation();
  const { theme } = useTheme();
  const auth = useAuth();
  const ContaminatedType = RestAPI.GetPollutedType();
  const CreateReportLocation = RestAPI.CreateReportLocation();
  const contaminatedTypeRef = React.useRef(null);
  const severityRef = React.useRef(null);
  const statusRef = React.useRef(null);
  const [images, setImages] = React.useState([]);
  const [reverseGeo, setReverseGeo] = React.useState(undefined);

  const [formConfigs, setFormConfigs] = React.useState({
    address: { readOnly: true, isLoading: true },
    library: { isLoading: false, limit: 10 },
    submit: { isLoading: false },
  });

  const {
    values,
    errors,
    setErrors,
    handleBlur,
    handleFocus,
    handleChange,
    handleSelect,
    handleSubmit,
    resetForm,
  } = useForm({ initialValues, validateSchema });

  React.useEffect(() => {
    if (!formConfigs.address.readOnly) return;
    (async () => {
      setFormConfigs((prev) => ({
        ...prev,
        address: { ...prev.address, isLoading: true },
      }));
      const getLocation = await getCurrentLocation();
      const reverse = await reverseGeocodeAsync(getLocation);
      setReverseGeo(reverse?.formattedAddress);
      if (getLocation) {
        handleChange("location", () => ({
          longitude: getLocation.longitude,
          latitude: getLocation.latitude,
        }));
        handleChange("address", () => reverse?.formattedAddress);
      }
      setFormConfigs((prev) => ({
        ...prev,
        address: { ...prev.address, isLoading: false },
      }));
    })();
  }, [formConfigs.address.readOnly]);

  React.useEffect(() => {
    handleChange("assets", images);
  }, [images]);

  //========================== function ================================
  const onCheckBox = async (key, props) => {
    setFormConfigs((prev) => {
      if (prev[key]?.isLoading !== undefined)
        return { ...prev, [key]: { ...prev[key], ...props, isLoading: true } };
      return { ...prev, [key]: { ...prev[key], ...props } };
    });
    if (key === "address" && props?.readOnly) {
      if (location) {
        handleChange("address", reverseGeo || location?.formattedAddress);
      }
    }
    setFormConfigs((prev) => {
      if (prev[key]?.isLoading !== undefined)
        return { ...prev, [key]: { ...prev[key], ...props, isLoading: false } };
      return { ...prev, [key]: { ...prev[key], ...props } };
    });
  };

  //========================== handle select image/video from library ===========================
  const onChooseFromLibrary = async () => {
    const limit = formConfigs.library?.limit - images.length;
    if (limit <= 0) {
      Alert.alert("Oop!", "Do not choose more than 10", [
        {
          text: "OK",
          style: "default",
        },
      ]);
      return;
    }
    setFormConfigs((prev) => ({
      ...prev,
      library: { ...prev.library, isLoading: true },
    }));
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: limit,
    });
    setFormConfigs((prev) => ({
      ...prev,
      library: { ...prev.library, isLoading: false },
    }));

    if (result.canceled) return;
    setImages((prev) => [...prev, ...result.assets]);
  };
  //
  const onRemoveImage = (uri) => {
    setImages((prev) => prev.filter((item) => item.uri !== uri));
    handleChange(
      "assets",
      images.filter((item) => item.uri !== uri)
    );
  };

  // =========================== handle submit form ==============================

  const onSubmit = async () => {
    try {
      let newLocation;
      if (!formConfigs.address.readOnly) {
        const addressCoord = await geocodeAsync(String(values.address));
        console.log({ addressCoord });
        if (!addressCoord) {
          setErrors((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              isError: true,
              message: "This location could not be found!",
            },
          }));
          return;
        }
        newLocation = {
          longitude: addressCoord?.longitude,
          latitude: addressCoord?.latitude,
        };
      }

      const formValues = handleSubmit();
      setFormConfigs((prev) => ({
        ...prev,
        submit: { ...prev.submit, isLoading: true },
      }));

      if (!formValues.isSuccess) return;

      await CreateReportLocation.mutateAsync({
        ...formValues.values,
        user_id: auth.userProfile?._id,
        ...(newLocation && { location: newLocation }),
      });
      resetForm();
      setImages([]);
      setFormConfigs((prev) => {
        return { ...prev, address: { ...prev.address, readOnly: false } };
      });
    } finally {
      setFormConfigs((prev) => ({
        ...prev,
        submit: { ...prev.submit, isLoading: false },
      }));
    }
  };

  //========================= element ===========================
  return (
    <StackScreen headerTitle="Report location">
      <KCModal
        title="Notification"
        content="Thank you for reporting, do you want to report to another location?"
        showModal={CreateReportLocation.isSuccess}
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
            },
          },
        ]}
      />
      <View
        className="flex-1 relative"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
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
            <View
              className="flex-1 flex-col items-center justify-between w-full px-4"
              style={{
                gap: 20,
                ...getResponesive(safeAreaInsets, dimensions)
                  .locationReportStyle.spacingTopBottom,
              }}
            >
              <View style={{ gap: 20 }}>
                <View className="justify-center items-center">
                  <View style={{ gap: 5 }}>
                    <Text
                      className="font-light text-xs"
                      style={{ color: theme.highLightColor }}
                    >
                      *To increase location accuracy, you should select "Get
                      current location".
                    </Text>
                    <Text
                      className="font-light text-xs"
                      style={{ color: theme.highLightColor }}
                    >
                      *Please provide as complete information as possible.
                    </Text>
                  </View>
                </View>
              </View>
              <View className="w-full flex-1" style={{ gap: 20 }}>
                <View>
                  <TouchableOpacity
                    className={`flex-row justify-between rounded-xl pl-4 pr-2 py-3 shadow-sm -mb-3 `}
                    onPress={() =>
                      onCheckBox("address", {
                        readOnly: !formConfigs.address?.readOnly,
                      })
                    }
                  >
                    <Text style={{ color: theme.primaryTextColor }}>
                      Get current location
                    </Text>
                    <Checkbox
                      value={formConfigs.address?.readOnly}
                      className="mr-3"
                      color={theme.primaryButtonBackgroundColor}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <View className="relative">
                    <TextInput
                      readOnly={formConfigs.address.readOnly}
                      autoComplete="name-given"
                      className={`rounded-xl px-5 pr-14 shadow-sm ${
                        Platform.OS === "ios" ? "py-5" : "py-3"
                      }`}
                      style={{
                        backgroundColor: theme.secondBackgroundColor,
                        color: theme.primaryTextColor,
                      }}
                      onFocus={() => handleFocus("address")}
                      onBlur={() => handleBlur("address")}
                      placeholder={"Address"}
                      value={values.address}
                      onChangeText={(value) => handleChange("address", value)}
                      placeholderTextColor={theme.thirdTextColor}
                    />
                    <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                      {formConfigs.address?.isLoading ? (
                        <ActivityIndicator
                          size="small"
                          color={theme.primaryIconColor}
                        />
                      ) : (
                        <KCIcon
                          name="map-marker-radius-outline"
                          family="MaterialCommunityIcons"
                          size={23}
                          color={theme.primaryTextColor}
                        />
                      )}
                    </View>
                  </View>
                  {errors?.address && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text className="text-xs" style={{ color: "red" }}>
                        {errors.address?.message}
                      </Text>
                    </View>
                  )}
                </View>

                <View>
                  <SelectDropdown
                    ref={contaminatedTypeRef}
                    data={ContaminatedType.data ?? []}
                    onSelect={(selectedItem, index) => {
                      handleFocus("contaminatedType");
                      handleSelect("contaminatedType", (prev) => [
                        ...prev,
                        selectedItem._id,
                      ]);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View className="relative">
                          <TouchableOpacity
                            onPress={() => {
                              contaminatedTypeRef.current?.openDropdown();
                            }}
                            style={{
                              backgroundColor: theme.secondBackgroundColor,
                            }}
                            activeOpacity={0.6}
                            className={`rounded-xl px-5 pr-14 shadow-sm ${
                              Platform.OS === "ios" ? "py-5" : "py-4"
                            }`}
                          >
                            <Text
                              style={{
                                color: values?.contaminatedType.length
                                  ? theme.primaryTextColor
                                  : theme.thirdTextColor,
                              }}
                            >
                              {selectedItem?.contaminatedName ||
                                "Contaminated type"}
                            </Text>
                            <View className="absolute top-0 bottom-0 right-0 items-center justify-center opacity-40 px-5">
                              <KCIcon
                                name="recycle"
                                family="MaterialCommunityIcons"
                                size={25}
                                color={theme.primaryTextColor}
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
                            {item?.contaminatedName}
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
                  {errors?.contaminatedType && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text
                        className="text-xs"
                        style={{
                          color: "red",
                        }}
                      >
                        {errors.contaminatedType?.message}
                      </Text>
                    </View>
                  )}
                </View>
                <View>
                  <SelectDropdown
                    ref={severityRef}
                    data={severityList}
                    onSelect={(selectedItem, index) => {
                      handleFocus("severity");
                      handleSelect("severity", selectedItem.value);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View className="relative">
                          <TouchableOpacity
                            onPress={() => {
                              severityRef.current?.openDropdown();
                            }}
                            style={{
                              backgroundColor: theme.secondBackgroundColor,
                            }}
                            activeOpacity={0.6}
                            className={`rounded-xl px-5 pr-14 shadow-sm ${
                              Platform.OS === "ios" ? "py-5" : "py-4"
                            }`}
                          >
                            <Text
                              style={{
                                color: values?.severity
                                  ? theme.primaryTextColor
                                  : theme.thirdTextColor,
                              }}
                            >
                              {selectedItem?.label || "Severity"}
                            </Text>
                            <View className="absolute top-0 bottom-0 right-0 items-center justify-center opacity-40 px-5">
                              <KCIcon
                                name="warning"
                                family="AntDesign"
                                size={22}
                                color={theme.primaryTextColor}
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
                              color={theme.primaryTextColor}
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
                  {errors?.severity && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text className="text-xs" style={{ color: "red" }}>
                        {errors.severity?.message}
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
                      onFocus={(e) => handleFocus("description")}
                      multiline={true}
                      numberOfLines={3}
                      maxLength={300}
                      onBlur={() => handleBlur("description")}
                      style={{
                        backgroundColor: theme.secondBackgroundColor,
                        color: theme.primaryTextColor,
                        maxHeight: 170,
                      }}
                      placeholder={"Description"}
                      value={values.description}
                      onChangeText={(value) =>
                        handleChange("description", value)
                      }
                      placeholderTextColor={theme.thirdTextColor}
                    />
                    <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                      <KCIcon
                        name="form"
                        family="AntDesign"
                        size={23}
                        color={theme.primaryTextColor}
                      />
                    </View>
                  </View>
                  {errors?.description?.isError && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text className="text-xs" style={{ color: "red" }}>
                        {errors.description?.message}
                      </Text>
                    </View>
                  )}
                </View>
                <View>
                  <TouchableOpacity
                    className={`flex-row justify-between rounded-xl px-5 shadow-sm py-5`}
                    style={{
                      backgroundColor: theme.secondBackgroundColor,
                    }}
                    onPress={() =>
                      handleChange("isAnonymous", !values.isAnonymous)
                    }
                  >
                    <Text style={{ color: theme.primaryTextColor }}>
                      Report anonymously
                    </Text>
                    <Checkbox
                      value={values.isAnonymous}
                      color={theme.primaryButtonBackgroundColor}
                    />
                  </TouchableOpacity>
                </View>

                <View className="pt-2">
                  <Text
                    className="font-medium"
                    style={{ color: theme.primaryTextColor }}
                  >
                    Choose a photo from the gallery or take a photo:
                  </Text>

                  <View
                    className="justify-center items-center flex-row flex-wrap mt-3"
                    style={{ gap: 10 }}
                  >
                    {(images ?? []).map((item, idx) => (
                      <View
                        key={idx}
                        className="w-20 h-20 rounded-lg border border-dashed items-center justify-center p-[1px] relative"
                        style={{ borderColor: theme.primaryTextColor }}
                      >
                        <Image
                          source={{
                            uri:
                              item.uri ||
                              "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
                          }}
                          className="w-full h-full rounded-lg "
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          className="absolute -top-1 -left-1  rounded-full p-1"
                          onPress={() => onRemoveImage(item.uri)}
                        >
                          <KCIcon
                            name="close"
                            family="Ionicons"
                            size={25}
                            color="red"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                    {formConfigs.library.limit - images.length > 0 && (
                      <>
                        <TouchableOpacity
                          disabled={formConfigs.library.isLoading}
                          className="w-20 h-20 rounded-lg border border-dashed items-center justify-center p-[1px]"
                          onPress={onChooseFromLibrary}
                          style={{ borderColor: theme.primaryTextColor }}
                        >
                          {formConfigs.library.isLoading ? (
                            <ActivityIndicator
                              size="small"
                              color={theme.primaryIconColor}
                            />
                          ) : (
                            <KCIcon
                              name="add-photo-alternate"
                              family="MaterialIcons"
                              className="ml-1"
                              size={35}
                              color={theme.primaryTextColor}
                            />
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          className="w-20 h-20 rounded-lg border border-dashed items-center justify-center p-[1px]"
                          onPress={() =>
                            navigate.navigate("CameraScreen", {
                              currentLength: images.length,
                              limit: formConfigs.library.limit,
                              setImages,
                            })
                          }
                          style={{ borderColor: theme.primaryTextColor }}
                        >
                          <KCIcon
                            name="camera"
                            family="Fontisto"
                            size={25}
                            color={theme.primaryTextColor}
                          />
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
                {!CreateReportLocation.isPending &&
                  CreateReportLocation.error && (
                    <View className="-mb-3 -mt-1">
                      <Text
                        className="text-xs text-center"
                        style={{ color: "red" }}
                      >
                        Something went wrong
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
            onPress={onSubmit}
            // disabled={signUp.isPending}
            isLoading={formConfigs.submit.isLoading}
          >
            Submit
          </KCButton>
        </View>
      </View>
    </StackScreen>
  );
}

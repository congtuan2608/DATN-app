import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React from "react";
import { StackScreen } from "~layouts";
import { useAuth, useLocation, useScreenUtils, useTheme } from "~hooks";
import {
  checkFormSubmit,
  defaultConfig,
  getResponesive,
  validateInput,
} from "~utils";
import { KCButton, KCIcon, KCModal, KCSVGAsset } from "~components";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import Checkbox from "expo-checkbox";
import { RestAPI } from "~apis";

const validateField = {
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
  },
  severity: {
    required: true,
    label: "Please select severity",
  },
  status: {
    required: true,
    default: "need-intervention",
  },
  populationDensity: {},
  assets: {},
  isAnonymous: {},
  location: {},
};
const contaminatedTypeList = [
  { label: "Kim loại", value: "metal" },
  { label: "Nhựa", value: "plastic" },
  { label: "Thuỷ tinh", value: "glass" },
];
const severityList = [
  { label: "Mild", value: "mild" },
  { label: "Moderate", value: "moderate" },
  { label: "Severe", value: "severe" },
];
const statusList = [
  { label: "Processed", value: "processed" },
  { label: "Processing", value: "processing" },
  { label: "Need intervention", value: "need-intervention" },
  { label: "No need intervention", value: "no-need-intervention" },
];
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
  const scrollRef = React.useRef(null);
  const [images, setImages] = React.useState([]);
  const [reverseGeo, setReverseGeo] = React.useState(undefined);

  const [formConfigs, setFormConfigs] = React.useState({
    address: { readOnly: true, isLoading: true },
    library: { isLoading: false, limit: 10 },
    submit: { isLoading: false },
  });

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
        setFormValues((prev) => ({
          ...prev,
          // address: `${getLocation.latitude}, ${getLocation.longitude}`,
          address: reverse?.formattedAddress,
          location: {
            latitude: getLocation.latitude,
            longitude: getLocation.longitude,
          },
        }));
      }
      setFormConfigs((prev) => ({
        ...prev,
        address: { ...prev.address, isLoading: false },
      }));
    })();
  }, [formConfigs.address.readOnly]);

  React.useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      assets: images,
    }));
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
        setFormValues((prev) => ({
          ...prev,
          // address: `${location.latitude}, ${location.longitude}`,
          address: reverseGeo,
        }));
      }
    }
    setFormConfigs((prev) => {
      if (prev[key]?.isLoading !== undefined)
        return { ...prev, [key]: { ...prev[key], isLoading: false } };
      return { ...prev, [key]: { ...prev[key], ...props } };
    });
  };

  // ============================= handle input ==================================
  const onFocusInput = (key, props) => {
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
    setFormValues((prev) => ({
      ...prev,
      assets: (prev.assets ?? []).filter((item) => item.uri !== uri),
    }));
  };

  // =========================== handle submit form ==============================
  const resetForm = () => {
    setFormValues((prev) => {
      let newValues = {};
      Object.keys(validateField).map((key) => (newValues[key] = undefined));
      return newValues;
    });
    setFormConfigs((prev) => ({
      ...prev,
      address: { ...prev.address, readOnly: false },
    }));
    setImages([]);
  };
  const onSubmit = async () => {
    try {
      setFormConfigs((prev) => ({
        ...prev,
        submit: { ...prev.submit, isLoading: true },
      }));
      const { newValidate, hasBeenEntered } = checkFormSubmit({
        formValidate,
        validateField,
        formValues,
      });

      setFormValidate(newValidate);
      if (!hasBeenEntered) return;

      let newLocation;
      if (!formConfigs.address.readOnly) {
        const addressCoord = await geocodeAsync(formValues.address);

        if (!addressCoord) {
          setFormValidate((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              isError: true,
              message: "Please provide a valid address!",
            },
          }));
          return;
        }
        newLocation = {
          longitude: addressCoord?.longitude,
          latitude: addressCoord?.latitude,
        };
      }

      await CreateReportLocation.mutateAsync({
        ...formValues,
        user_id: auth.userProfile?._id,
        ...(newLocation && { location: newLocation }),
      });
      resetForm();
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
      />
      <View
        className="flex-1 relative"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <KeyboardAwareScrollView
          className="flex-1 w-full"
          extraScrollHeight={20}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <ScrollView
            ref={scrollRef}
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
                  <Text
                    className="text-2xl"
                    style={{ color: theme.primaryTextColor }}
                  >
                    Report
                  </Text>
                  <Text
                    className="text-base"
                    style={{ color: theme.primaryTextColor }}
                  >
                    Please provide some information
                  </Text>
                </View>
              </View>
              <View className="w-full flex-1" style={{ gap: 20 }}>
                <View>
                  <View className="flex-row justify-between items-center pb-3 px-2">
                    <Text style={{ color: theme.primaryTextColor }}>
                      Get current location
                    </Text>
                    <Checkbox
                      value={formConfigs.address?.readOnly}
                      onValueChange={(newValue) =>
                        onCheckBox("address", { readOnly: newValue })
                      }
                      className="mr-3"
                    />
                  </View>
                  <View className="relative">
                    <TextInput
                      readOnly={formConfigs.address.readOnly}
                      autoComplete="name-given"
                      className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                        Platform.OS === "ios" ? "py-5" : "py-4"
                      }`}
                      style={{
                        backgroundColor: theme.secondBackgroundColor,
                        color: theme.primaryTextColor,
                      }}
                      onFocus={(e) => onFocusInput("address")}
                      onBlur={() =>
                        onBlurInput("address", {
                          ...validateField.address,
                          input: formValues.address,
                        })
                      }
                      placeholder={"Address"}
                      value={formValues.address}
                      onChangeText={(value) =>
                        setFormValues((prev) => ({ ...prev, address: value }))
                      }
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
                  {formValidate.address?.isError && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text
                        className="text-xs"
                        style={{ color: formValidate.address?.errorColor }}
                      >
                        {formValidate.address?.message}
                      </Text>
                    </View>
                  )}
                </View>

                <View>
                  <SelectDropdown
                    ref={contaminatedTypeRef}
                    data={ContaminatedType.data ?? []}
                    onSelect={(selectedItem, index) => {
                      onFocusInput("contaminatedType");
                      setFormValues((prev) => ({
                        ...prev,
                        contaminatedType: [
                          ...(prev.contaminatedType ?? []),
                          selectedItem?._id,
                        ],
                      }));
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
                            className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                              Platform.OS === "ios" ? "py-5" : "py-4"
                            }`}
                          >
                            <Text
                              style={{
                                color: formValues?.contaminatedType
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
                  {formValidate.contaminatedType?.isError && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text
                        className="text-xs"
                        style={{
                          color: formValidate.contaminatedType?.errorColor,
                        }}
                      >
                        {formValidate.contaminatedType?.message}
                      </Text>
                    </View>
                  )}
                </View>
                <View>
                  <SelectDropdown
                    ref={severityRef}
                    data={severityList}
                    onSelect={(selectedItem, index) => {
                      onFocusInput("severity");
                      setFormValues((prev) => ({
                        ...prev,
                        severity: selectedItem?.value,
                      }));
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
                            className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                              Platform.OS === "ios" ? "py-5" : "py-4"
                            }`}
                          >
                            <Text
                              style={{
                                color: formValues?.severity
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
                  {formValidate.severity?.isError && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text
                        className="text-xs"
                        style={{ color: formValidate.severity?.errorColor }}
                      >
                        {formValidate.severity?.message}
                      </Text>
                    </View>
                  )}
                </View>
                <View>
                  <SelectDropdown
                    ref={statusRef}
                    data={statusList}
                    onSelect={(selectedItem, index) => {
                      onFocusInput("status");
                      setFormValues((prev) => ({
                        ...prev,
                        status: selectedItem?.value,
                      }));
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View className="relative">
                          <TouchableOpacity
                            onPress={() => {
                              statusRef.current?.openDropdown();
                            }}
                            style={{
                              backgroundColor: theme.secondBackgroundColor,
                            }}
                            activeOpacity={0.6}
                            className={`bg-gray-200 rounded-xl px-5 pr-14 ${
                              Platform.OS === "ios" ? "py-5" : "py-4"
                            }`}
                          >
                            <Text
                              style={{
                                color: formValues?.status
                                  ? theme.primaryTextColor
                                  : theme.thirdTextColor,
                              }}
                            >
                              {selectedItem?.label || "Status"}
                            </Text>
                            <View className="absolute top-0 bottom-0 right-0 items-center justify-center opacity-40 px-5">
                              <KCIcon
                                name="bulb1"
                                family="AntDesign"
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
                  {formValidate.status?.isError && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text
                        className="text-xs"
                        style={{ color: formValidate.status?.errorColor }}
                      >
                        {formValidate.status?.message}
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
                      onFocus={(e) => onFocusInput("populationDensity")}
                      onBlur={() =>
                        onBlurInput("populationDensity", {
                          ...validateField.populationDensity,
                          input: formValues.populationDensity,
                        })
                      }
                      style={{
                        backgroundColor: theme.secondBackgroundColor,
                        color: theme.primaryTextColor,
                      }}
                      placeholder={"Population density"}
                      value={formValues.populationDensity}
                      onChangeText={(value) =>
                        setFormValues((prev) => ({
                          ...prev,
                          populationDensity: value,
                        }))
                      }
                      placeholderTextColor={theme.thirdTextColor}
                    />
                    <View className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
                      <KCIcon
                        name="people-group"
                        family="FontAwesome6"
                        size={23}
                        color={theme.primaryTextColor}
                      />
                    </View>
                  </View>
                  {formValidate.populationDensity?.isError && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text
                        className="text-xs"
                        style={{
                          color: formValidate.populationDensity?.errorColor,
                        }}
                      >
                        {formValidate.populationDensity?.message}
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
                      onFocus={(e) => onFocusInput("description")}
                      multiline={true}
                      numberOfLines={4}
                      maxLength={300}
                      onBlur={() =>
                        onBlurInput("description", {
                          ...validateField.description,
                          input: formValues.description,
                        })
                      }
                      style={{
                        backgroundColor: theme.secondBackgroundColor,
                        color: theme.primaryTextColor,
                      }}
                      placeholder={"Description"}
                      value={formValues.description}
                      onChangeText={(value) =>
                        setFormValues((prev) => ({
                          ...prev,
                          description: value,
                        }))
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
                  {formValidate.description?.isError && (
                    <View className="px-4 mt-2 -mb-3">
                      <Text
                        className="text-xs"
                        style={{ color: formValidate.description?.errorColor }}
                      >
                        {formValidate.description?.message}
                      </Text>
                    </View>
                  )}
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
                          className="absolute -bottom-3 -right-3  rounded-full p-1"
                          onPress={() => onRemoveImage(item.uri)}
                        >
                          <KCIcon
                            name="delete-forever"
                            family="MaterialCommunityIcons"
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
          className="w-full flex-col justify-center absolute bottom-0 pt-3 px-4 border-t "
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

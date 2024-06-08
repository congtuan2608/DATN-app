import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TabView } from "react-native-tab-view";
import WebView from "react-native-webview";
import { RestAPI } from "~apis";
import { KCButton, KCContainer, KCModal } from "~components";
import { useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { getResponesive } from "~utils";

export function MomoScreen() {
  const { safeAreaInsets, dimensions } = useScreenUtils();
  const [loading, setLoading] = React.useState(true);
  const { theme, currentTheme } = useTheme();
  const ref = React.useRef(null);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "inputInfo", title: "Input Info" },
    { key: "momoPay", title: "MoMo Pay" },
  ]);
  const [values, setValues] = React.useState({ amount: 0, message: "" });
  const amountRef = React.useRef(null);
  const momo = RestAPI.MomoRequest();
  const momoTransactionStatus = RestAPI.MomoTransactionStatus();
  const navigate = useNavigation();
  const navigateParams = useRoute();
  const [configs, setConfigs] = React.useState({
    amount: {
      errorText: "",
    },
  });
  const [showModal, setShowModal] = React.useState(false);
  const [intervalTimeOut, setIntervalTimeOut] = React.useState(0);
  const intervel = React.useRef(null);

  React.useEffect(() => {
    return () => {
      intervel.current && clearInterval(intervel.current);
      intervel.current = null;
    };
  }, []);
  React.useEffect(() => {
    if (intervalTimeOut >= 15) {
      setShowModal(true);
      clearInterval(intervel.current);
    }
  }, [intervalTimeOut, momo.data?.payUrl]);

  React.useEffect(() => {
    if (momo.data?.payUrl) {
      if (loading) {
        intervel.current = setInterval(() => {
          setIntervalTimeOut((prev) => prev + 1);
        }, 1000);
      } else {
        intervel.current && clearTimeout(intervel.current);
        intervel.current = null;
      }
    }
  }, [loading, momo.data?.payUrl]);
  const handleMomoRequest = async () => {
    if (values.amount === 0) {
      setConfigs({
        ...configs,
        amount: {
          errorText: "Please enter the amount",
        },
      });
      return;
    } else {
      setConfigs({
        ...configs,
        amount: {
          errorText: "",
        },
      });
    }
    const res = await momo.mutateAsync({
      amount: values.amount,
      orderInfo: values.message, // message
      ...(navigateParams.params && { otherInfo: navigateParams.params }),
    });
    console.log(res);
    if (res?.payUrl) {
      setIndex(index + 1);
    }
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "inputInfo":
        return (
          <View className="flex-1">
            <KeyboardAwareScrollView
              className="flex-1 w-full"
              extraScrollHeight={Platform.OS === "ios" ? 30 : 200}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                paddingVertical: 15,
                paddingHorizontal: 10,
              }}
            >
              <View
                className={`w-full relative rounded-xl shadow-md py-10 justify-center items-center ${
                  currentTheme === "DarkTheme"
                    ? "shadow-gray-900"
                    : "shadow-slate-300"
                }`}
                style={{
                  backgroundColor: theme.secondBackgroundColor,
                  gap: 20,
                }}
              >
                <TouchableOpacity
                  className="border-b-[3px] px-1"
                  style={{
                    borderColor: theme.primaryButtonBackgroundColor,
                  }}
                  onPress={() => amountRef.current?.focus()}
                >
                  <TextInput
                    ref={amountRef}
                    className={`hidden rounded-xl px-5 shadow-sm font-semibold text-3xl ${
                      Platform.OS === "ios" ? "py-5" : "py-3"
                    }`}
                    style={{
                      backgroundColor: theme.secondBackgroundColor,
                      color: theme.primaryTextColor,
                    }}
                    keyboardType="number-pad"
                    textAlign="center"
                    textAlignVertical="center"
                    placeholder={"0đ"}
                    maxLength={10}
                    value={values.amount}
                    onChangeText={(value) =>
                      setValues({ ...values, amount: value })
                    }
                    onFocus={() =>
                      setConfigs({
                        ...configs,
                        amount: {
                          errorText: "",
                        },
                      })
                    }
                    onBlur={() =>
                      setConfigs({
                        ...configs,
                        amount: {
                          errorText: values.amount
                            ? ""
                            : "Please enter the message",
                        },
                      })
                    }
                    placeholderTextColor={theme.thirdTextColor}
                  />

                  <Text
                    className="text-3xl font-semibold"
                    style={{ color: theme.primaryTextColor }}
                  >
                    {Number(values.amount ?? 0).toLocaleString("de-DE", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                </TouchableOpacity>

                {configs.amount.errorText && (
                  <View>
                    <Text className="text-red-500 font-medium">
                      {configs.amount.errorText}
                    </Text>
                  </View>
                )}
                <View className="w-full px-4">
                  <TextInput
                    className={`w-full rounded-xl px-5 shadow-sm font-semibold text-base border ${
                      Platform.OS === "ios" ? "py-5" : "py-3"
                    }`}
                    style={{
                      backgroundColor: theme.secondBackgroundColor,
                      color: theme.primaryTextColor,
                      maxHeight: 170,
                      borderColor: theme.primaryBorderColor,
                    }}
                    multiline
                    numberOfLines={3}
                    placeholder={"Enter your message"}
                    maxLength={300}
                    value={values.message}
                    onChangeText={(value) =>
                      setValues({ ...values, message: value })
                    }
                    placeholderTextColor={theme.thirdTextColor}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
            <View
              className="w-full flex-row justify-between pt-3 border-t "
              style={{
                gap: 10,
                paddingHorizontal: 10,
                paddingBottom: getResponesive(safeAreaInsets, dimensions)
                  .locationReportStyle.spacingTopBottom.marginTop,
                // backgroundColor: theme.primaryBackgroundColor,
                borderColor: theme.primaryBorderColor,
              }}
            >
              <KCButton
                styleContainer={{ flex: 1 }}
                variant="Filled"
                onPress={handleMomoRequest}
              >
                Continue
              </KCButton>
            </View>
          </View>
        );
      case "momoPay":
        const injectScript =
          " const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.head.appendChild(meta); ";
        return (
          <KCContainer className="flex-1 relative" isEmpty={!momo.data?.payUrl}>
            {loading && (
              <View className="absolute z-10 top-0 bottom-0 left-0 right-0 flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
              </View>
            )}
            <WebView
              ref={ref}
              onLoad={() => setTimeout(() => setLoading(false), 600)}
              source={{
                uri: momo.data?.payUrl ?? "",
              }}
              style={{ flex: 1 }}
              scalesPageToFit={false}
              javaScriptEnabled={true}
              setBuiltInZoomControls={false}
              setDisplayZoomControls={false}
              injectedJavaScript={injectScript}
              onNavigationStateChange={(navState) => {
                console.log(navState.url);
                if (
                  navState.url.includes(
                    "https://leading-inherently-toad.ngrok-free.app"
                  )
                ) {
                  momoTransactionStatus.mutate({
                    orderId: momo.data?.orderId ?? "",
                  });
                  navigate.goBack();
                }
              }}
            />
          </KCContainer>
        );

      default:
        return null;
    }
  };

  return (
    <StackScreen headerTitle="MoMo Payments">
      <KCModal
        title="Notification"
        content="Please check your network connection again"
        showModal={showModal}
        buttons={[
          {
            text: "Go back",
            variant: "Outline",
            onPress: ({ setVisible }) => {
              setShowModal(false);
              navigate.goBack();
            },
          },
          {
            text: "Await",
            onPress: ({ setVisible }) => {
              setShowModal(false);
            },
          },
        ]}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => <></>}
        swipeEnabled={false}
      />
    </StackScreen>
  );
}

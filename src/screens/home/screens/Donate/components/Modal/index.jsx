import Checkbox from "expo-checkbox";
import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { KCButton } from "~components";
import { useTheme } from "~hooks";

export const ModalListsPayment = (props) => {
  const { title, content, buttons, ...other } = props;
  const [visible, setVisible] = React.useState(false);
  const { theme } = useTheme();
  const [selectMethod, setSelectMethod] = React.useState("");

  React.useEffect(() => {
    if (props?.showModal !== undefined) setVisible(props?.showModal);
  }, [props?.showModal]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
    >
      <View className="flex-1 justify-center items-center bg-[#00000030] px-5 max-w-md">
        <View
          className="px-3 py-5 rounded-lg justify-center items-center w-full"
          style={{
            backgroundColor: theme.primaryBackgroundColor,
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              setSelectMethod((prev) => (prev === "momo" ? "" : "momo"))
            }
            className={`bg-pink-600 p-3 py-2 rounded-lg shadow-sm flex-row items-center relative`}
            style={{ gap: 5 }}
          >
            <Image
              className="w-10 h-10"
              source={{
                uri: "https://test-payment.momo.vn/v2/gateway/images/logo-momo.png",
              }}
            />
            <View className="flex-1">
              <Text
                className="text-sm font-semibold"
                style={{ color: theme.primaryFocusedColor }}
              >
                Payments with MoMo wallet
              </Text>
            </View>
            {selectMethod === "momo" && (
              <Checkbox
                onChange={() =>
                  setSelectMethod((prev) => (prev === "momo" ? "" : "momo"))
                }
                value={selectMethod === "momo"}
                className="mr-3"
                color={theme.primaryButtonBackgroundColor}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setSelectMethod((prev) => (prev === "zalopay" ? "" : "zalopay"))
            }
            className={`bg-blue-600 p-3 py-2 rounded-lg shadow-sm flex-row items-center relative`}
            style={{ gap: 5 }}
          >
            <Image
              className="w-10 h-10"
              source={{
                uri: "https://res.cloudinary.com/dudwjr0ux/image/upload/v1717074196/public/1622682588188_zalopay_yx8evw.png",
              }}
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text
                className="text-sm font-semibold"
                style={{ color: theme.primaryFocusedColor }}
              >
                Payments with ZaloPay wallet
              </Text>
            </View>
            {selectMethod === "zalopay" && (
              <Checkbox
                value={selectMethod === "zalopay"}
                className="mr-3"
                color={theme.primaryButtonBackgroundColor}
              />
            )}
          </TouchableOpacity>
          <View className="w-full flex-row justify-around items-center pt-2">
            {buttons?.map((button, index) => (
              <KCButton
                key={index}
                variant={button.variant || "Filled"}
                onPress={() =>
                  button.onPress({ visible, setVisible, selectMethod })
                }
                styleContainer={{ paddingVertical: 8, ...button.style }}
                disabled={
                  button?.disabled &&
                  button?.disabled({ selectMethod, setSelectMethod })
                }
              >
                {button?.text || "Change text here"}
              </KCButton>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

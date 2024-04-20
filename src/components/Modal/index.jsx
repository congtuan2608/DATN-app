import { View, Text, Modal } from "react-native";
import React from "react";
import { KCButton } from "~components";
import { useTheme } from "~hooks";
import { useNavigation } from "@react-navigation/native";

export function KCModal(props) {
  const navigate = useNavigation();
  const {
    title,
    content,
    titleButtonLeft,
    titleButtonRight,
    hideButtonLeft,
    ...other
  } = props;
  const [showModal, setShowModal] = React.useState(false);
  const { theme } = useTheme();

  React.useEffect(() => {
    if (props?.showModal !== undefined) setShowModal(props?.showModal);
  }, [props?.showModal]);

  const onGoBack = async () => {
    setShowModal(!showModal);
    navigate.goBack();
  };
  const onStayHere = () => {
    setShowModal(!showModal);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(!showModal)}
    >
      <View className="flex-1 justify-center items-center bg-[#00000030] px-10">
        <View
          className="p-5 rounded-lg justify-center items-center w-full"
          style={{
            backgroundColor: theme.primaryBackgroundColor,
            gap: 20,
          }}
        >
          {title && (
            <View>
              <Text className="text-center font-semibold text-lg">{title}</Text>
            </View>
          )}
          {content && (
            <View>
              <Text className="text-center">{content}</Text>
            </View>
          )}

          <View
            className="w-full flex-row justify-around items-center"
            // style={{ gap: 10 }}
          >
            {!hideButtonLeft && (
              <KCButton
                variant="Outline"
                onPress={onGoBack}
                styleContainer={{ paddingVertical: 8 }}
              >
                {titleButtonLeft || "Go back"}
              </KCButton>
            )}
            <KCButton
              variant="Filled"
              onPress={onStayHere}
              styleContainer={{ paddingVertical: 8 }}
            >
              {titleButtonRight || "Stay here"}
            </KCButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

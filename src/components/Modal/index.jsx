import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Modal, Text, View } from "react-native";
import { KCButton } from "~components";
import { useTheme } from "~hooks";

export function KCModal(props) {
  const navigate = useNavigation();
  const {
    title,
    content,
    titleButtonLeft,
    titleButtonRight,
    hideButtonLeft,
    cbButtonLeft,
    cbButtonRight,
    ...other
  } = props;
  const [showModal, setShowModal] = React.useState(false);
  const { theme } = useTheme();

  React.useEffect(() => {
    if (props?.showModal !== undefined) setShowModal(props?.showModal);
  }, [props?.showModal]);

  const onGoBack = async () => {
    setShowModal(!showModal);
    cbButtonLeft && cbButtonLeft();
    navigate.goBack();
  };
  const onStayHere = () => {
    setShowModal(!showModal);
    cbButtonRight && cbButtonRight();
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

import React from "react";
import { Modal, Text, View } from "react-native";
import { KCButton } from "~components";
import { useTheme } from "~hooks";

export function KCModal(props) {
  const { title, content, buttons, ...other } = props;
  const [visible, setVisible] = React.useState(false);
  const { theme } = useTheme();

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
            {buttons?.map((button, index) => (
              <KCButton
                key={index}
                variant={button.variant || "Filled"}
                onPress={() => button.onPress({ visible, setVisible })}
                styleContainer={{ paddingVertical: 8, ...button.style }}
              >
                {button?.text || "Change text here"}
              </KCButton>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

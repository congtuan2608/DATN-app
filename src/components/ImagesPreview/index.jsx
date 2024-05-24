import React from "react";
import { Modal, View } from "react-native";
import { ImagePreview } from "react-native-images-preview";

export function KCImagesPreview(props) {
  const [showModal, setShowModal] = React.useState(props.visible ?? false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  React.useEffect(() => {
    setShowModal(props.visible);
  }, [props.visible]);
  return (
    <Modal
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(!showModal)}
    >
      <View className="flex-1 justify-center items-center bg-[#00000030]">
        <ImagePreview
          imageSource={{ uri: props?.data[0]?.url ?? "" }}
          imageStyle={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
        {/* <FlatList
          style={{ width: "100%", height: "100%" }}
          data={props?.data ?? []}
          initialNumToRender={2}
          pagingEnabled
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ImagePreview
              imageSource={{ uri: item.uri }}
              imageStyle={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          )}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          onViewableItemsChanged={(item) => {
            setCurrentIndex(item.viewableItems[0]?.index);
          }}
        /> */}
      </View>
    </Modal>
  );
}

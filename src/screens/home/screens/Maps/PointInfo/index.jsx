import React from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KCContainer, KCIcon } from "~components";
import { useTheme } from "~hooks";

export function PointInfo(props) {
  const [visible, setVisible] = React.useState(false);
  const { theme } = useTheme();
  return (
    <View>
      <View
        className="flex-row justify-center items-center"
        style={{ gap: 10 }}
      >
        <TouchableOpacity className="px-2" onPress={() => setVisible(true)}>
          <Image
            source={require("~assets/images/info-icon.png")}
            className="w-8 h-8"
          />
        </TouchableOpacity>
      </View>
      <Modal
        presentationStyle="formSheet"
        animationType="slide"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View
          className="flex-1"
          style={{ backgroundColor: theme.primaryBackgroundColor }}
        >
          <View
            className="flex-row items-center px-2 py-3 relative"
            style={{ backgroundColor: theme.secondBackgroundColor }}
          >
            <TouchableOpacity
              className="px-[12px] absolute z-10"
              onPress={() => setVisible(false)}
            >
              <KCIcon
                family="Entypo"
                name="chevron-small-left"
                size={30}
                color={theme.primaryTextColor}
              />
            </TouchableOpacity>
            <View className="flex-1 items-center justify-center">
              <Text
                className="text-base font-semibold"
                style={{ color: theme.primaryTextColor }}
              >
                Point information
              </Text>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              gap: 10,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <KCContainer
              className="p-2"
              isLoading={props.pollutionType.isPending}
              isEmpty={(props.pollutionType.data ?? []).length === 0}
              style={{ gap: 10 }}
            >
              {(props.pollutionType.data ?? []).map((item, index) => (
                <View
                  key={index}
                  className="p-2 rounded-lg shadow-sm flex-row items-center"
                  style={{
                    gap: 10,
                    backgroundColor: theme.secondBackgroundColor,
                  }}
                >
                  <Image
                    source={{ uri: item?.asset?.url }}
                    className="w-14 h-14"
                  />
                  <View className="flex-1" style={{ gap: 5 }}>
                    <Text
                      className="font-semibold"
                      style={{ color: theme.primaryTextColor }}
                    >
                      {item?.contaminatedName ?? "Undefined"}
                    </Text>
                  </View>
                </View>
              ))}
            </KCContainer>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

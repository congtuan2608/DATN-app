import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useTheme } from "~hooks";

export function KCFlatList(props) {
  const { onPressItem, isLoading, ...other } = props;
  const { theme } = useTheme();
  const [isSelected, setIsSelected] = React.useState(0);
  const handleOnPress = async (item, index) => {
    setIsSelected(index);
    if (props?.onPressItem) props?.onPressItem(item);
  };
  if (isLoading) {
    return (
      <View className="justify-center items-center" {...other}>
        <ActivityIndicator size="large" color={theme.primaryIconColor} />
      </View>
    );
  }
  return (
    <View className="py-2">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleOnPress(item, index)}>
            <View
              className="rounded-lg border px-3 py-2"
              style={{
                borderColor: theme.primaryButtonBackgroundColor,
                ...(index === isSelected && {
                  backgroundColor: theme.primaryButtonBackgroundColor,
                }),
              }}
            >
              <Text
                className="font-medium"
                style={{
                  color: theme.primaryTextColor,
                  ...(index === isSelected && {
                    color: theme.primaryFocusedColor,
                  }),
                }}
              >
                {props?.renderText(item) ?? ""}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, idx) => `HorizontalList_Item__${idx}`}
        ItemSeparatorComponent={() => <View className="w-5" />}
        {...other}
      />
    </View>
  );
}

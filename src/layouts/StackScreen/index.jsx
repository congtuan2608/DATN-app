import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { KCIcon } from "~components";
import { useScreenUtils, useTheme } from "~hooks";
export const StackScreen = (props) => {
  const { theme } = useTheme();
  const screenUtils = useScreenUtils();
  const navigate = useNavigation();
  const onGoBack = () => {
    if (props.before) props.before();
    navigate.goBack();
  };

  return (
    <View
      className="flex-1 relative"
      style={{
        paddingTop: screenUtils.safeAreaInsets.top - 5,
        backgroundColor: theme.secondBackgroundColor ?? undefined,
        ...props?.styleContainer,
      }}
    >
      {props.headerShown !== false && (
        <View>
          {props.header ?? (
            <View
              className="flex flex-row justify-between items-center py-3 relative"
              style={{
                borderBottomWidth: props.showBorderBottom ? 1 : 0,
                borderBottomColor: theme.primaryBorderColor,
              }}
            >
              <View className="flex flex-1 flex-row items-center">
                <View className="absolute z-20">
                  <TouchableOpacity className="px-[12px]" onPress={onGoBack}>
                    <KCIcon
                      family="Entypo"
                      name="chevron-small-left"
                      className="pt-[2px]"
                      size={30}
                      color={theme.primaryTextColor}
                    />
                  </TouchableOpacity>
                </View>
                <View className="flex-1 justify-center items-center">
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="text-base font-semibold"
                    style={{ color: theme.primaryTextColor }}
                  >
                    {props.headerTitle}
                  </Text>
                </View>
              </View>
              <View className="absolute right-0 px-2">{props.headerRight}</View>
            </View>
          )}
        </View>
      )}
      {props.children}
    </View>
  );
};

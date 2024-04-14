import { Text, TouchableOpacity, View } from "react-native";
import { useScreenUtils, useTheme } from "~hooks";
import { KCIcon } from "~components";
import { useNavigation } from "@react-navigation/native";
export const StackScreen = (props) => {
  const { theme } = useTheme();
  const screenUtils = useScreenUtils();
  const navigate = useNavigation();
  const onGoBack = () => {
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
              className="flex flex-row justify-between items-center pb-[6px] px-4 pl-0"
              style={{
                borderBottomWidth: props.showBorderBottom ? 1 : 0,
                borderBottomColor: "#e7e7e7",
              }}
            >
              <View className="flex flex-1 flex-row items-center">
                <View>
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
                <View className="flex-1">
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
              {props.headerRight}
            </View>
          )}
        </View>
      )}
      {props.children}
    </View>
  );
};

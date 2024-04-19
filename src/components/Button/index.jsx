import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "~hooks";
import { ThemeConfig } from "~themes";

export const KCButton = (props) => {
  const { styleContainer, ...other } = props;
  const { theme } = useTheme();
  if (typeof props.children === "string") {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className="rounded-lg"
        style={{
          backgroundColor: props?.disabled
            ? theme.primaryDisabledButtonColor
            : theme.primaryButtonBackgroundColor,
          paddingVertical: 12,
          paddingHorizontal: 20,
          ...(styleContainer ?? {}),
        }}
        {...other}
      >
        {props?.isLoading ? (
          <View className="py-[2px]">
            <ActivityIndicator size="small" color={theme.primaryTextColor} />
          </View>
        ) : (
          <Text
            className="text-center text-base font-medium"
            style={{
              color: props?.disabled
                ? theme?.primaryTextColor
                : theme?.secondTextColor,
            }}
          >
            {props.children}
          </Text>
        )}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className="rounded-lg"
        style={{
          backgroundColor: props?.disabled
            ? theme.primaryDisabledButtonColor
            : theme.primaryButtonBackgroundColor,
          padding: 12,
          paddingHorizontal: 20,
          ...(styleContainer ?? {}),
        }}
        {...other}
      >
        {props.children}
      </TouchableOpacity>
    );
  }
};

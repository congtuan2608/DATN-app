import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "~hooks";
import { ThemeConfig } from "~themes";

export const KCButton = (props) => {
  const { theme } = useTheme();
  if (typeof props.children === "string") {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full py-3 rounded-lg px-5"
          style={{
            backgroundColor: props?.disabled
              ? theme.primaryDisabledButtonColor
              : theme.primaryButtonBackgroundColor,
          }}
          {...props}
        >
          {props?.isLoading ? (
            <View className="py-[2px]">
              <ActivityIndicator size="small" color={theme.primaryIconColor} />
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
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-full py-3 rounded-lg px-5"
        style={{
          backgroundColor: props?.disabled
            ? theme.primaryDisabledButtonColor
            : theme.primaryButtonBackgroundColor,
        }}
        {...props}
      >
        {props.children}
      </TouchableOpacity>
    );
  }
};

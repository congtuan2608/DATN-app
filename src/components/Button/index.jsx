import { Text, TouchableOpacity, View } from "react-native";
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
        </TouchableOpacity>
      </View>
    );
  } else {
    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
  }
};

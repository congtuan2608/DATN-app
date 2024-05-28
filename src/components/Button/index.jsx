import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "~hooks";

export const KCButton = (props) => {
  const { styleContainer, onPress, ...other } = props;
  const { theme } = useTheme();
  switch (props.variant) {
    case "Filled": {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: props?.disabled
              ? theme.primaryDisabledButtonColor
              : theme.primaryButtonBackgroundColor,
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: props?.disabled
              ? theme.primaryDisabledButtonColor
              : theme.primaryButtonBackgroundColor,
            ...(styleContainer ?? {}),
          }}
          onPress={() => {
            if (props.isLoading) return;
            onPress();
          }}
          {...other}
        >
          <View>
            {props?.isLoading ? (
              <View>
                <ActivityIndicator
                  size="small"
                  color={theme.primaryTextColor}
                />
              </View>
            ) : (
              typeof props.children === "string" && (
                <Text
                  style={{
                    color: props?.disabled
                      ? theme?.primaryTextColor
                      : theme?.secondTextColor,
                    textAlign: "center",
                    fontWeight: "600",
                    ...(props.textStyle ?? {}),
                  }}
                >
                  {props.children}
                </Text>
              )
            )}
            {typeof props.children !== "string" && props.children}
          </View>
        </TouchableOpacity>
      );
    }
    case "Outline": {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: "transparent",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: props?.disabled
              ? theme.primaryDisabledButtonColor
              : theme.primaryButtonBackgroundColor,
            ...(props.styleContainer ?? {}),
          }}
          onPress={() => {
            if (props.isLoading) return;
            onPress();
          }}
          {...other}
        >
          <View>
            {props?.isLoading ? (
              <View>
                <ActivityIndicator
                  size="small"
                  color={theme.primaryButtonBackgroundColor}
                />
              </View>
            ) : (
              typeof props.children === "string" && (
                <Text
                  style={{
                    color: props?.disabled
                      ? theme?.thirdTextColor
                      : theme?.primaryTextColor,
                    textAlign: "center",
                    fontWeight: "600",
                    ...(props.textStyle ?? {}),
                  }}
                >
                  {props.children}
                </Text>
              )
            )}
            {typeof props.children !== "string" && props.children}
          </View>
        </TouchableOpacity>
      );
    }
    default: {
      return <Text>Error variant</Text>;
    }
  }
};

import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { KCIcon } from "~components";
import { useTheme } from "~hooks";

const isIOS = Platform.OS === "ios";
const animate1 = {
  0: { scale: 0.5, translateY: isIOS ? 5 : 0 },
  0.92: { translateY: -15 },
  1: { scale: 1.2, translateY: -8 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -8 },
  1: { scale: 1, translateY: isIOS ? 5 : 0 },
};
const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.5 },
  0.5: { scale: 0.3 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = {
  0: { scale: 1 },
  1: { scale: 0 },
};
export const TabButton = (props) => {
  const viewRef = React.useRef();
  const textRef = React.useRef();
  const circleRef = React.useRef();
  const focused = props.accessibilityState.selected;
  const { theme } = useTheme();
  React.useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      circleRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      circleRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.6}
      className="flex-1 flex-col items-center justify-center"
    >
      <Animatable.View ref={viewRef} duration={300}>
        <View
          className="justify-center items-center w-12 h-12 border-4 border-white"
          style={{ borderRadius: 100 }}
        >
          <Animatable.View
            ref={circleRef}
            duration={300}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: theme.primaryIconColor,
              borderRadius: 100,
            }}
          />
          <KCIcon
            {...props.item.icon()}
            style={{
              color: focused
                ? theme.primaryFocusedColor
                : theme.primaryIconColor,
            }}
          />
        </View>

        {focused && (
          <Animatable.Text
            ref={textRef}
            duration={300}
            className="text-[8px] text-center font-medium"
            style={{
              color: theme.primaryIconColor,
            }}
          >
            {props.item.label}
          </Animatable.Text>
        )}
      </Animatable.View>
    </TouchableOpacity>
  );
};

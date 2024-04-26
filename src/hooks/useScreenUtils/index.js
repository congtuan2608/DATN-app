import React from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");
export const useScreenUtils = () => {
  const insets = useSafeAreaInsets();
  const [dimensions, setDimensions] = React.useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  const safeAreaInsets = React.useMemo(() => insets, [insets]);
  return { safeAreaInsets, dimensions };
};

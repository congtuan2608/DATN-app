import React from "react";
import { ActivityIndicator, BackHandler, View } from "react-native";
import WebView from "react-native-webview";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";

// const URL = "https://maps.pamair.org/";
// const URL = "https://map.purpleair.com/1/mAQI/a10/p604800/cC0#7.57/11.749/107.328";
const URL = "https://www.breezometer.com/air-quality-map/";
// const URL =
//   "https://www.iqair.com/air-quality-map?lat=10.782773&lng=106.700035&zoomLevel=6";

export function AirPollutionScreen() {
  const [loading, setLoading] = React.useState(true);
  const { theme } = useTheme();
  const ref = React.useRef(null);

  const handleBackButtonPress = () => {
    try {
      ref.current?.goBack();
    } catch (err) {
      console.log("[handleBackButtonPress] Error : ", err.message);
    }
  };
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonPress
      );
    };
  }, []);
  const removeAdsScript = `
  const adSelectors = [
    'iframe[src*="adservice"]',
    'div[id*="ad"]',
    // add more selectors that match ad elements
  ];
  document.querySelector('.airvisual-earth-button').style.display = 'none';
  document.querySelector('.iqair-map-earth__header').style.display = 'none';
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(node => node.style.display = 'none');
    document.querySelectorAll(selector).forEach(node => node.remove());
  });
  true; 
`;
  return (
    <StackScreen headerShown={false}>
      <View className="flex-1 relative">
        {loading && (
          <View className="absolute z-10 top-0 bottom-0 left-0 right-0 flex-1 justify-center items-center">
            <ActivityIndicator size="large" />
          </View>
        )}
        {/* <TouchableOpacity
          className="absolute rounded-full justify-center items-center shadow-sm p-2 z-20"
          onPress={handleBackButtonPress}
          style={{
            bottom: 10,
            right: 50,
            backgroundColor: theme.secondBackgroundColor,
          }}
        >
          <Text>Go</Text>
          <Text>Back</Text>
        </TouchableOpacity> */}
        <WebView
          ref={ref}
          onLoad={() => setTimeout(() => setLoading(false), 700)}
          source={{ uri: URL }}
          style={{ flex: 1 }}
          injectedJavaScript={removeAdsScript}
          injectedJavaScriptBeforeContentLoaded={removeAdsScript}
          javaScriptEnabledAndroid={true}
        />
      </View>
    </StackScreen>
  );
}

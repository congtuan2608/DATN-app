import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { bottomTabScreens } from "./data";
import { Text, TouchableOpacity, View } from "react-native";
import { KCIcon } from "~components";
import { TabButton } from "./components/TabButton";
import { getResponesive } from "~utils";
import { useScreenUtils } from "~hooks";

const Tab = createBottomTabNavigator();
export const BottomTabNavigator = () => {
  const { dimensions, safeAreaInsets } = useScreenUtils();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: getResponesive(safeAreaInsets, dimensions).tabBarStyle,
      }}
    >
      {Object.entries(bottomTabScreens).map(([tabKey, tabInfo]) => (
        <Tab.Screen
          key={tabKey}
          name={tabKey}
          component={tabInfo.component}
          options={{
            headerShown: false,
            tabBarButton(props) {
              return <TabButton {...props} item={tabInfo} />;
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

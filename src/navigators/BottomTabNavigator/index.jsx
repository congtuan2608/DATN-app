import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { bottomTabScreens } from "./data";
import { Text, TouchableOpacity, View } from "react-native";
import { KCIcon } from "~components";
import { TabButton } from "./components/TabButton";
import { getResponesive } from "~utils";
import { useScreenUtils, useTheme } from "~hooks";

const Tab = createBottomTabNavigator();
export const BottomTabNavigator = () => {
  const { theme } = useTheme();
  const { dimensions, safeAreaInsets } = useScreenUtils();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          ...getResponesive(safeAreaInsets, dimensions).tabBarStyle,
          backgroundColor: theme.secondBackgroundColor,
          borderTopColor: theme.primaryBorderColor,
        },
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

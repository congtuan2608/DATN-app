import { createDrawerNavigator } from "@react-navigation/drawer";
import { BottomTabNavigator } from "../BottomTabNavigator";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={(props) => ({
        headerShown: false,
        swipeEnabled: false,
      })}
      // drawerContent={DrawerContent}
    >
      <Drawer.Screen
        name={"BottomTabNavigator"}
        component={BottomTabNavigator}
      />
    </Drawer.Navigator>
  );
};

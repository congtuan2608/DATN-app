import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import { TabListLocations } from "./TabListLocations";
import { TabLocationDetail } from "./TabLocationDetail";

export function MapTabsView(props) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [initTabs, setInitTabs] = React.useState({ listLocations: true });

  const tabs = React.useMemo(() => {
    return {
      listLocations: <TabListLocations />,
      locationDetail: <TabLocationDetail />,
    };
  }, []);
  const routes = React.useMemo(() => {
    return [
      { key: "listLocations", title: "List Locations" },
      { key: "locationDetail", title: "Location Detail" },
    ];
  }, []);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        return initTabs[route.key] ? tabs[route.key] : <></>;
      }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      swipeEnabled={false}
    />
  );
}

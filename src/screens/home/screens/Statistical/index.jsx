import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { TabView } from "react-native-tab-view";
import { KCContainer } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { CampaignStatistical, LocationStatistical } from "./tab";

export function StatisticalScreen() {
  const layout = useWindowDimensions();
  const { theme } = useTheme();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "location", title: "Location" },
    { key: "campaign", title: "Campaign" },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "location":
        return <LocationStatistical {...{ index }} />;
      case "campaign":
        return <CampaignStatistical {...{ index }} />;
      default:
        return null;
    }
  };
  return (
    <StackScreen headerTitle="Statistical">
      <KCContainer>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          // swipeEnabled={false}
          renderTabBar={(props) => {
            return (
              <>
                <View
                  className="py-2"
                  style={{ backgroundColor: theme.primaryBackgroundColor }}
                >
                  <ScrollView
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View className="flex-row px-2" style={{ gap: 10 }}>
                      {props.navigationState?.routes?.map((route, idx) => (
                        <TouchableOpacity
                          key={idx}
                          className="px-2 py-2 border rounded-lg"
                          onPress={() => index !== idx && setIndex(idx)}
                          style={{
                            borderColor: theme.primaryButtonBackgroundColor,
                            backgroundColor: theme.secondBackgroundColor,
                            ...(idx === props.navigationState.index && {
                              backgroundColor:
                                theme.primaryButtonBackgroundColor,
                            }),
                          }}
                        >
                          <Text
                            className="font-medium"
                            style={{
                              color: theme.primaryTextColor,
                              ...(idx === props.navigationState.index && {
                                color: theme.primaryFocusedColor,
                              }),
                            }}
                          >
                            {route.title}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </>
            );
          }}
        />
      </KCContainer>
    </StackScreen>
  );
}

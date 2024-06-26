import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { TabView } from "react-native-tab-view";
import { RestAPI } from "~apis";
import { KCContainer } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { AirPrediction } from "./tabs";

export function AirPredictionScreen() {
  const layout = useWindowDimensions();
  const { theme } = useTheme();
  const [index, setIndex] = React.useState(0);
  const airPrediction = RestAPI.GetAirPrediction();
  const [routes] = React.useState([
    { key: "NO2_2015", title: "NO2_2015" },
    { key: "SO2_2015", title: "SO2_2015" },
    { key: "CO_2015", title: "CO_2015" },

    { key: "NO2_2016", title: "NO2_2016" },
    { key: "SO2_2016", title: "SO2_2016" },
    { key: "CO_2016", title: "CO_2016" },

    { key: "NO2_2017", title: "Predict NO2_2017" },
    { key: "SO2_2017", title: "Predict SO2_2017" },
    { key: "CO_2017", title: "Predict CO_2017" },
  ]);

  const renderScene = ({ route }) => {
    if (airPrediction.isFetching || !airPrediction.data) {
      return null;
    }
    switch (route.key) {
      case "NO2_2015":
      case "SO2_2015":
      case "CO_2015":

      case "NO2_2016":
      case "SO2_2016":
      case "CO_2016":

      case "NO2_2017":
      case "SO2_2017":
      case "CO_2017":
        return (
          <AirPrediction
            {...{
              setIndex,
              index,
              data: airPrediction.data[route.key],
              unit: "ug/m^3",
            }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <StackScreen headerTitle="Statistical">
      <KCContainer isLoading={airPrediction.isFetching}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => {
            return (
              <>
                <View>
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
          swipeEnabled={false}
        />
      </KCContainer>
    </StackScreen>
  );
}

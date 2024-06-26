import { Dimensions, ScrollView, Text } from "react-native";
import { View } from "react-native-animatable";
import { LineChart } from "react-native-chart-kit";
import { KCContainer } from "~components";

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export function AirPrediction(props) {
  // const handleRefresh = async () => {
  //   airPrediction.refetch();
  // };

  return (
    <KCContainer
      className="flex-1 px-2 my-2 items-center"
      // isLoading={airPrediction.isFetching}
      isEmpty={!props.data}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        // refreshControl={
        //   <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        // }
      >
        {(props.data ?? []).slice(0, 12).map((item, idx) => (
          <View key={idx}>
            <Text
              className="font-medium text-lg"
              style={{ color: theme.primaryTextColor }}
            >
              {month[Number(item.month) - 1]} - Average:{" "}
              {item.data[item.data.length - 1]}{" "}
              <Text className="text-slate-400">{props.unit}</Text>
            </Text>
            <LineChart
              data={{
                labels: [
                  ...item.data
                    .slice(0, item.data.length - 1)
                    .map((i, idx2) => idx2 + 1),
                  "ave",
                ],
                datasets: [
                  {
                    data: item.data,
                  },
                ],
              }}
              width={Dimensions.get("window").height} // from react-native
              height={250}
              // yAxisLabel="$"
              // yAxisSuffix={props.unit || "ug/m^3"} // "k
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                // backgroundGradientFrom: "#fb8c00",
                // backgroundGradientTo: "#eaeaea",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                paddingRight: 20,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        ))}
        {/* <LineChart
          data={{
            labels: month,
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").height} // from react-native
          height={250}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          verticalLabelRotation={90}
          chartConfig={{
            backgroundColor: "#e26a00",
            // backgroundGradientFrom: "#fb8c00",
            // backgroundGradientTo: "#eaeaea",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            transforms: {
              transform: [{ rotateY: "90deg" }],
            },
          }}
        /> */}
      </ScrollView>
    </KCContainer>
  );
}

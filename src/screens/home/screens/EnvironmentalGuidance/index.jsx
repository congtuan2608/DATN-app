import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import { StackScreen } from "~layouts";
import { KCContainer, KCFlatList } from "~components";
import { GuidanceItem } from "./components";

const fakeData = [
  {
    id: "1",
    label: "Thuy Tinh",
  },
  {
    id: "2",
    label: "Chai nhua",
  },
  {
    id: "3",
    label: "Nilon",
  },
  {
    id: "4",
    label: "Giaasy",
  },
];
export function EnvironmentalGuidanceScreen() {
  const onPressItem = (item) => {
    console.log(item);
  };
  return (
    <StackScreen headerTitle="Environmental guidance">
      <View className="flex-1 px-2">
        <KCFlatList data={fakeData} onPressItem={onPressItem} label={"label"} />
        <KCContainer className="mt-2">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View className="" style={{ gap: 10 }}>
              {fakeData.map((item) => {
                return <GuidanceItem />;
              })}
            </View>
          </ScrollView>
        </KCContainer>
      </View>
    </StackScreen>
  );
}

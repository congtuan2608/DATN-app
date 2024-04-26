import React from "react";
import { View } from "react-native";
import { GroupItem } from "~screens/home/components";

const MAX_ROW = 2;
const MAX_COL = 4;
export function ServiceGroups(props) {
  const rows = React.useMemo(() => {
    if (!props.data.length === 0) return [];
    const result = [];
    const arr = [...props.data];
    for (let i = 0; i < arr.length; i += MAX_COL) {
      if (arr.slice(i, i + MAX_COL).length !== MAX_COL) {
        const arr2 = [
          ...arr.slice(i, i + MAX_COL),
          ...Array(MAX_COL - arr.slice(i, i + MAX_COL).length),
        ];

        result.push(arr2);
      } else {
        result.push(arr.slice(i, i + MAX_COL));
      }
    }
    return result.slice(0, MAX_ROW);
  }, [props.data]);
  return (
    <View className="flex-col" style={{ gap: 15 }}>
      {rows.map((row, row_idx) => (
        <View key={row_idx} className="flex-row justify-between items-start">
          {row.map((item, item_idx) => {
            if (!item) return <View key={item_idx} className="w-16" />;
            return <GroupItem key={item_idx} {...item} />;
          })}
        </View>
      ))}
    </View>
  );
}

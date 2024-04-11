import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreen } from "~layouts";
import { useTheme, useAuth, useScreenUtils } from "~hooks";
import { getResponesive } from "~utils";
import { GroupItem } from "../../components";
import { serviceList } from "./data";
import { KCIcon } from "~components";
import React from "react";

export const HomeScreen = () => {
  const { theme, changeTheme } = useTheme();
  const { safeAreaInsets, dimensions } = useScreenUtils();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const auth = useAuth();

  console.log("root:", process.env.EXPO_PUBLIC_ROOT_BE_URL);

  const handleOnScroll = React.useMemo(
    () => ({
      transform: [
        {
          translateY: scrollY,
        },
        {
          scale: scrollY.interpolate({
            inputRange: [-208, 5, 208],
            outputRange: [2, 1, 1],
          }),
        },
      ],
    }),
    [scrollY.current]
  );

  return (
    <StackScreen
      headerShown={false}
      styleContainer={{
        paddingTop: 0,
        backgroundColor: theme.primaryBackgroundColor,
      }}
    >
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#dddddd",
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View className="flex-1">
          <Animated.View
            className=""
            style={{
              backgroundColor: "#dddddd",
              ...getResponesive(safeAreaInsets).homeStyle?.spacingTop,
              ...handleOnScroll,
            }}
          >
            <Image
              source={require("~assets/gif/2.gif")}
              className="w-full h-52"
              resizeMode="contain"
            />
          </Animated.View>
          <View className="flex-1 bg-white px-3 py-4 rounded-t-3xl">
            <View>
              <TouchableOpacity className="flex-row justify-between items-center py-1">
                <Text className="text-lg font-semibold">Dịch vụ</Text>
                <KCIcon
                  family="MaterialIcons"
                  name="keyboard-arrow-right"
                  size={25}
                />
              </TouchableOpacity>
              <View className="pt-2 pb-4">
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={serviceList}
                  renderItem={({ item }) => <GroupItem {...item} />}
                  keyExtractor={(item, idx) => `HorizontalList_Item__${idx}`}
                  ItemSeparatorComponent={() => <View className="w-6" />}
                />
              </View>
            </View>
            <View>
              <View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg font-semibold">Đề xuất</Text>
                  <KCIcon
                    family="MaterialIcons"
                    name="keyboard-arrow-right"
                    size={25}
                  />
                </View>
              </View>
              <View className="pt-3 pb-4">
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={serviceList}
                  renderItem={({ item }) => <GroupItem {...item} />}
                  keyExtractor={(item, idx) => `HorizontalList_Item__${idx}`}
                  ItemSeparatorComponent={() => <View className="w-6" />}
                />
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </StackScreen>
  );
};

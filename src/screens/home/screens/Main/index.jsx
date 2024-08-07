import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Animated,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RestAPI } from "~apis";
import { KCButton, KCIcon } from "~components";
import { useAuth, useLocation, useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { getResponesive } from "~utils";
import { GuidanceItem, InterestedItem } from "../../components";
import { KCContainer } from "./../../../../components/KCContainer/index";
import { ServiceGroups } from "./components";
import { serviceList } from "./data";

export const HomeScreen = () => {
  const { theme, changeTheme } = useTheme();
  const { location } = useLocation();
  const { safeAreaInsets, dimensions } = useScreenUtils();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const auth = useAuth();
  const RecyclingGuide = RestAPI.RecyclingGuide();
  const nearbyCampaigns = RestAPI.GetNearbyCampaigns();
  const [refreshing, setRefreshing] = React.useState(false);
  const navigate = useNavigation();

  React.useEffect(() => {
    RecyclingGuide.getRecyclingGuide.mutate({});
  }, [refreshing]);
  React.useEffect(() => {
    if (location)
      nearbyCampaigns.mutate({
        latitude: location.latitude,
        longitude: location.longitude,
      });
  }, [location, refreshing]);

  const handleRefresh = () => {
    setRefreshing(!refreshing);
  };
  const handleOnScroll = React.useMemo(
    () => ({
      transform: [
        {
          translateY: scrollY,
        },
        {
          scale: scrollY.interpolate({
            inputRange: [-208, 5, 208],
            outputRange: [2, 1, 0.5],
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
        refreshControl={
          <RefreshControl
            style={{
              zIndex: 10,
            }}
            refreshing={false}
            onRefresh={handleRefresh}
          />
        }
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
            className=" mb-3"
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
          <View
            className="flex-1 bg-white px-3 pt-4 rounded-t-3xl"
            style={{ backgroundColor: theme.primaryBackgroundColor }}
          >
            <View>
              <TouchableOpacity
                className="flex-row justify-between items-center py-1"
                disabled={serviceList.length < 8}
                onPress={() => {
                  console.log("will navigate to services");
                }}
              >
                <Text
                  className="text-lg font-semibold"
                  style={{ color: theme.primaryTextColor }}
                >
                  Services
                </Text>
                {serviceList.length > 8 && (
                  <KCIcon
                    family="MaterialIcons"
                    name="keyboard-arrow-right"
                    size={25}
                    color={theme.primaryTextColor}
                  />
                )}
              </TouchableOpacity>
              <View className="pt-2 pb-4">
                <ServiceGroups data={serviceList} />
              </View>
            </View>
            {/* <View>
              <View>
                <View className="flex-row justify-between items-center">
                  <Text
                    className="text-lg font-semibold"
                    style={{ color: theme.primaryTextColor }}
                  >
                    Đề xuất
                  </Text>
                  <KCIcon
                    family="MaterialIcons"
                    name="keyboard-arrow-right"
                    size={25}
                    color={theme.primaryTextColor}
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
            </View> */}
            <View>
              <View>
                <View className="flex-row justify-between items-center">
                  <Text
                    className="text-lg font-semibold"
                    style={{ color: theme.primaryTextColor }}
                  >
                    Maybe you are interested
                  </Text>
                </View>
              </View>
              <View className="pt-3 pb-4">
                <KCContainer
                  className={
                    !(location && (nearbyCampaigns.data ?? []).length !== 0)
                      ? ""
                      : ""
                  }
                  isLoading={!location || nearbyCampaigns.isPending}
                  isEmpty={
                    !(location && (nearbyCampaigns.data ?? []).length !== 0)
                  }
                  textEmpty="There are no volunteer trash cleanups nearby (1km)"
                  childrenEmpty={
                    <KCButton
                      onPress={() =>
                        navigate.navigate("CampaignsScreen", {
                          headerShown: true,
                        })
                      }
                      variant="Outline"
                      styleContainer={{ flex: 1, marginTop: 10 }}
                    >
                      See other activities
                    </KCButton>
                  }
                >
                  <FlatList
                    style={{ paddingBottom: 12 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={nearbyCampaigns.data ?? []}
                    renderItem={({ item }) => <InterestedItem {...item} />}
                    keyExtractor={(item, idx) => `HorizontalList_Item__${idx}`}
                    ItemSeparatorComponent={() => <View className="w-4" />}
                  />
                </KCContainer>
              </View>
            </View>
            <View>
              <View>
                <View className="flex-row justify-between items-center">
                  <Text
                    className="text-lg font-semibold"
                    style={{ color: theme.primaryTextColor }}
                  >
                    Instructions for recycling waste
                  </Text>
                </View>
              </View>
              <KCContainer
                className="pt-3 pb-1"
                isLoading={RecyclingGuide.getRecyclingGuide.isPending}
                isEmpty={
                  (RecyclingGuide.getRecyclingGuide.data ?? []).length === 0
                }
              >
                <FlatList
                  horizontal
                  initialNumToRender={3}
                  style={{ paddingBottom: 12 }}
                  showsHorizontalScrollIndicator={false}
                  data={RecyclingGuide.getRecyclingGuide?.data ?? []}
                  renderItem={({ item }) => <GuidanceItem {...item} />}
                  keyExtractor={(item, idx) => `HorizontalList_Item__${idx}`}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </KCContainer>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </StackScreen>
  );
};

import {
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KCContainer, KCFlatList } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { HistoryItem } from "../components";

const data = [
  {
    id: "0",
    activity: "All",
  },
  {
    id: "1",
    activity: "Campaign",
  },
  {
    id: "2",
    activity: "Report location",
  },
  {
    id: "3",
    activity: "Donate",
  },
  {
    id: "4",
    activity: "Detect",
  },
];
const data2 = [
  {
    title: "You had joined the campaign",
    activity: {
      activityType: "campaign",
      activityName: "Campaign",
    },
    description: "lorem ipsum dolor sit amet",
    createAt: "11:20 - 14/02/2024",
  },
  {
    title: "You had joined the campaign",
    activity: {
      activityType: "report-location",
      activityName: "Campaign",
    },
    description: "lorem ipsum dolor sit amet",
    createAt: "11:20 - 14/02/2024",
  },
  {
    title: "You had joined the campaign",
    activity: {
      activityType: "detect",
      activityName: "Campaign",
    },
    description: "lorem ipsum dolor sit amet",
    createAt: "11:20 - 14/02/2024",
  },
];
export const HistoryScreens = () => {
  const { theme } = useTheme();
  return (
    <StackScreen
      headerTitle="History"
      headerShown={false}
      styleContainer={{
        backgroundColor: theme.primaryBackgroundColor,
      }}
    >
      <View
        className="flex-1 px-2 pt-2"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <View className="relative">
          <TextInput
            autoComplete="name-given"
            className={`shadow-sm rounded-xl px-5 pr-14 ${
              Platform.OS === "ios" ? "py-4" : "py-3"
            }`}
            placeholder="Search on history"
            style={{
              backgroundColor: theme.secondBackgroundColor,
              color: theme.primaryTextColor,
            }}
            // value=""
            // onChangeText={(value) => {}}
            placeholderTextColor={theme.thirdTextColor}
          />
          <View
            className="absolute right-0 h-full flex-row items-center justify-center mr-3"
            style={{ gap: 10 }}
          >
            <TouchableOpacity className="opacity-80">
              <Image
                source={require("~assets/images/history-search-icon.png")}
                className="h-8 w-8"
              />
            </TouchableOpacity>
          </View>
        </View>
        <KCFlatList
          data={data ?? []}
          // onPressItem={onPressItem}
          // isLoading={RecyclingTypes.getRecyclingType.isFetching}
          renderText={(item) => item.activity}
        />
        <KCContainer
          style={{ backgroundColor: theme.primaryBackgroundColor, gap: 10 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "start",
              alignItems: "center",
              gap: 5,
              paddingBottom: 10,
            }}
          >
            {data2.map((item, idx) => (
              <HistoryItem key={idx} {...item} />
            ))}
          </ScrollView>
        </KCContainer>
      </View>
    </StackScreen>
  );
};

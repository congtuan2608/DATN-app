import { useRoute } from "@react-navigation/native";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreen } from "~layouts";
import { KCContainer } from "./../../../components/KCContainer/index";
import { KCButton, KCIcon } from "~components";
import { useTheme } from "~hooks";

const arr = [1, 2, 3, 4, 5, 6];
export const CampaignsScreens = () => {
  const navigateParams = useRoute();
  const { theme } = useTheme();
  return (
    <StackScreen
      headerTitle="Campaigns"
      headerShown={navigateParams.params?.headerShown ?? false}
      styleContainer={
        !navigateParams.params?.headerShown && {
          backgroundColor: theme.primaryBackgroundColor,
        }
      }
    >
      <KCContainer
        className="pt-2 px-2"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <View className="relative mb-2">
          <TextInput
            autoComplete="name-given"
            className={` rounded-xl px-5 pr-16 ${
              Platform.OS === "ios" ? "py-4" : "py-3"
            }`}
            placeholder="Search on the map"
            style={{
              backgroundColor: theme.secondBackgroundColor,
              color: theme.primaryTextColor,
            }}
            // value=""
            // onChangeText={(value) => {}}
            placeholderTextColor={theme.thirdTextColor}
          />
          <TouchableOpacity className="absolute right-0 items-center h-full justify-center opacity-40 px-5">
            <Image
              source={require("~assets/images/search-icon.png")}
              className="h-8 w-8"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 30,
          }}
        >
          <View
            className="flex-1 justify-center items-center"
            style={{ gap: 15 }}
          >
            {arr.map((item) => (
              <View
                key={item}
                className="justify-center rounded-lg px-2 py-3"
                style={{
                  gap: 10,
                  backgroundColor: theme.secondBackgroundColor,
                }}
              >
                <View>
                  <Text
                    className="font-semibold text-lg"
                    style={{ color: theme.primaryTextColor }}
                  >
                    Chiến dịch dọn dẹp rác ở Ngãi Giao
                  </Text>
                </View>
                <View style={{ gap: 5 }}>
                  <Text
                    className="text-sm"
                    numberOfLines={3}
                    style={{ color: theme.primaryTextColor }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Fugit magni soluta voluptates blanditiis perspiciatis,
                    cupiditate dolores dolorum asperiores natus nam, aspernatur
                    alias cumque amet deserunt perferendis eaque, suscipit illo
                    totam.
                  </Text>
                  <Text style={{ color: theme.primaryTextColor }}>
                    <Text className="font-medium">
                      Participation deadline:{" "}
                    </Text>
                    20/03/2024 - 25/03/2024
                  </Text>
                  <Text style={{ color: theme.primaryTextColor }}>
                    <Text className="font-medium">
                      Number of participants :{" "}
                    </Text>
                    23
                  </Text>
                  <Text style={{ color: theme.primaryTextColor }}>
                    <Text className="font-medium">Organizer: </Text>Cong Tuan
                  </Text>
                </View>
                <View className="flex-row" style={{ gap: 10 }}>
                  <KCButton
                    variant="Filled"
                    // disabled={true}
                    styleContainer={{
                      flex: 1,
                      paddingVertical: 8,
                    }}
                  >
                    Join
                  </KCButton>
                  <KCButton
                    variant="Outline"
                    styleContainer={{ flex: 1, paddingVertical: 8 }}
                  >
                    View details
                  </KCButton>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </KCContainer>
    </StackScreen>
  );
};

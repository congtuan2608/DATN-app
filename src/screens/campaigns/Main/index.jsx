import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KCButton } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";

import { NO_DATA } from "~constants";
import { CampaignItem } from "../components";
import { KCContainer } from "./../../../components/KCContainer/index";

const arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
export const CampaignsScreens = () => {
  const navigateParams = useRoute();
  const { theme } = useTheme();
  const navigate = useNavigation();
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
        style={{ backgroundColor: theme.primaryBackgroundColor, gap: 10 }}
      >
        <View className="relative">
          <TextInput
            autoComplete="name-given"
            className={`shadow-sm rounded-xl px-5 pr-24 ${
              Platform.OS === "ios" ? "py-4" : "py-3"
            }`}
            placeholder="Search on the campaigns"
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
            <TouchableOpacity
              className="opacity-80"
              onPress={() => navigate.navigate("EditCampaigns")}
            >
              <Image
                source={require("~assets/images/add-campaigns-icon.png")}
                className="h-8 w-8"
              />
            </TouchableOpacity>
            <TouchableOpacity className="opacity-80">
              <Image
                source={require("~assets/images/search-icon.png")}
                className="h-8 w-8"
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <View
            className="flex-1 justify-center items-center"
            style={{ gap: 15 }}
          >
            {arr.length !== 0 ? (
              arr.map((item, idx) => <CampaignItem key={idx} {...item} />)
            ) : (
              <View
                className="w-full rounded-lg shadow-sm justify-center items-center py-3 px-5"
                style={{
                  backgroundColor: theme.secondBackgroundColor,
                  gap: 10,
                }}
              >
                <Image source={NO_DATA} className="w-10 h-10" />
                <Text className="text-base font-medium mb-2">
                  No campaigns were organized
                </Text>
                <KCButton
                  variant="Outline"
                  onPress={() => navigate.navigate("EditCampaigns")}
                >
                  Create a campaign now
                </KCButton>
              </View>
            )}
          </View>
        </ScrollView>
      </KCContainer>
    </StackScreen>
  );
};

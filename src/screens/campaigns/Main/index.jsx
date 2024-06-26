import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RestAPI } from "~apis";
import { KCButton, KCContainer, KCIcon } from "~components";
import { NO_DATA } from "~constants";
import { useAuth, useDebounce, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { CampaignItem } from "../components";

export function CampaignsScreen() {
  const navigateParams = useRoute();
  const { theme } = useTheme();
  const { userProfile } = useAuth();
  const navigate = useNavigation();
  const Campaign = RestAPI.GetCampaigns();
  const [joinedCampaigns, setJoinedCampaigns] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [params, setParams] = React.useState({ page: 0, limit: 10 });
  const [listCampaigns, setListCampaigns] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const res = await Campaign.mutateAsync({ ...params, q: search });
      if (res.length) {
        if (params.page === 0) setListCampaigns(res ?? []);
        else setListCampaigns((prev) => [...prev, ...res]);

        const newJoined = res
          .filter((item) => {
            return item.participants.find(
              (participant) => participant._id === userProfile?._id
            );
          })
          .map((item) => item?._id);
        setJoinedCampaigns(newJoined);
      }
    })();
  }, [params]);

  const handleRefresh = () => {
    setParams((p) => ({ ...p, page: 0 }));
    setJoinedCampaigns([]);
  };

  const handleSearch = useDebounce(async (text) => {
    setParams((p) => ({ ...p, page: 0 }));
    const res = await Campaign.mutateAsync({ ...params, page: 0, q: text });
    setListCampaigns(res ?? []);
  }, 250);

  const handleLoadMore = () => {
    if ((Campaign.data ?? []).length) {
      setParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

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
      <View
        className="flex-1 pt-2 px-2"
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
            value={search}
            onChangeText={(value) => {
              setSearch(value);
              handleSearch(value);
            }}
            placeholderTextColor={theme.thirdTextColor}
          />
          <View
            className="absolute right-0 h-full flex-row items-center justify-center mr-3"
            style={{ gap: 10 }}
          >
            {search && (
              <TouchableOpacity
                onPress={() => {
                  setSearch("");
                  handleSearch("");
                }}
              >
                <KCIcon
                  family="Ionicons"
                  name="close-circle-outline"
                  size={30}
                  color={theme.primaryIconColor}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="opacity-80"
              onPress={() => navigate.navigate("EditCampaignsScreen")}
            >
              <Image
                source={require("~assets/images/add-campaigns-icon.png")}
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
            paddingBottom: 10,
          }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={handleRefresh} />
          }
          onScrollEndDrag={handleLoadMore}
        >
          <KCContainer
            className="flex-1"
            isLoading={Campaign.isPending && params.page === 0}
            style={{ gap: 15 }}
          >
            {(listCampaigns ?? []).map((item, idx) => (
              <CampaignItem
                key={idx}
                data={item}
                joinedCampaigns={joinedCampaigns}
                setJoinedCampaigns={setJoinedCampaigns}
              />
            ))}
            {Campaign.isPending && (
              <View className="w-full flex-col justify-center items-center py-3">
                <ActivityIndicator
                  size="small"
                  color={theme.primaryButtonBackgroundColor}
                />
              </View>
            )}
            {(listCampaigns ?? []).length === 0 && (
              <View className="flex-1 justify-center items-center">
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
                    onPress={() => navigate.navigate("EditCampaignsScreen")}
                  >
                    Create a campaign now
                  </KCButton>
                </View>
              </View>
            )}
          </KCContainer>
        </ScrollView>
      </View>
    </StackScreen>
  );
}

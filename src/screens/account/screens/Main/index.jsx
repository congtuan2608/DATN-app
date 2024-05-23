import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { KCContainer } from "~components";
import { AVATAR_URL } from "~constants";
import { useAuth, useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { generateMenuGroups } from "./data";
export const AccountScreens = () => {
  const { theme, changeTheme } = useTheme();
  const navigate = useNavigation();
  const screenUtils = useScreenUtils();
  const auth = useAuth();
  return (
    <StackScreen
      headerShown={false}
      styleContainer={{
        backgroundColor: theme.primaryBackgroundColor,
      }}
    >
      <KCContainer className="justify-start items-center py-4 px-2">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, gap: 5 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            className="w-full rounded-xl p-2 flex-row items-center justify-between shadow-sm"
            style={{ backgroundColor: theme.secondBackgroundColor, gap: 20 }}
          >
            <View
              className="relative rounded-full border-[0.5px] shadow-md"
              style={{
                borderColor: theme.primaryBorderColor,
              }}
            >
              <Image
                source={{
                  uri: auth.userProfile?.avatar?.url || AVATAR_URL,
                }}
                className="w-24 h-24 rounded-full"
                resizeMode="cover"
              />
            </View>

            <View className="flex-1">
              <Text
                className="text-lg font-semibold"
                style={{
                  color: theme.primaryTextColor,
                }}
              >
                {auth.userProfile?.fullName ?? "<Unknown>"}
              </Text>
              <Text
                className="text-base"
                style={{ color: theme.thirdTextColor }}
              >
                {auth.userProfile?.email ?? "<Unknown>"}
              </Text>
            </View>
          </View>
          <View></View>
          <View>
            {generateMenuGroups({ auth, navigate }).map((group, index) => (
              <View key={group.groupTitle} className="shadow-sm">
                <View className="py-3 px-1 ">
                  <Text
                    className="text-base font-semibold"
                    style={{
                      color: theme.primaryTextColor,
                    }}
                  >
                    {group.groupTitle}
                  </Text>
                </View>
                <View
                  className="rounded-xl"
                  style={{
                    backgroundColor: theme.secondBackgroundColor,
                    gap: 3,
                  }}
                >
                  {group.groupItems.map((item, index) => (
                    <TouchableOpacity
                      key={item.text}
                      onPress={item.onPress}
                      activeOpacity={0.3}
                      className="w-full p-3 flex-row items-center justify-between"
                      style={{
                        gap: 15,
                      }}
                    >
                      <Image source={item.image} className="w-7 h-7" />
                      <View className="flex-1">
                        <Text
                          style={{
                            color: theme.primaryTextColor,
                            ...(item?.style ?? {}),
                          }}
                        >
                          {item.text}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </KCContainer>
    </StackScreen>
  );
};

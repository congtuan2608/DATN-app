import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { KCContainer } from "~components";
import { AVATAR_URL } from "~constants";
import { useAuth, useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { generateMenuGroups } from "./data";
export const AccountScreens = () => {
  const { theme, changeTheme } = useTheme();
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
            className="w-full rounded-xl p-2 flex-row items-center justify-between"
            style={{ backgroundColor: theme.secondBackgroundColor, gap: 20 }}
          >
            <View
              className="relative rounded-full border-[0.5px]"
              style={{
                borderColor: theme.primaryBorderColor,
              }}
            >
              <Image
                source={{
                  uri: auth.userProfile?.avatar || AVATAR_URL,
                }}
                className="w-24 h-24 rounded-full"
                resizeMode="cover"
              />
            </View>

            <View className="flex-1">
              <Text className="text-lg font-semibold">
                {auth.userProfile?.fullName ?? "<Unknown>"}
              </Text>
              <Text style={{ color: theme.thirdTextColor }}>
                {auth.userProfile?.email ?? "<Unknown>"}
              </Text>
            </View>
          </View>
          <View></View>
          <View>
            {generateMenuGroups({ auth }).map((group, index) => (
              <View key={group.groupTitle}>
                <View className="py-3 px-1">
                  <Text className="text-base font-semibold">
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
      {/* <Text>Hello Home</Text>
      <TouchableOpacity onPress={() => changeTheme("DarkTheme")}>
        <Text>Change theme</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeTheme()}>
        <Text>Change theme default</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeTheme("GreenTheme")}>
        <Text>Change theme green</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-20" onPress={onLogout}>
        <Text>logout</Text>
      </TouchableOpacity> */}
    </StackScreen>
  );
};

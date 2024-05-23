import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { KCContainer, KCIcon } from "~components";
import { useAuth, useScreenUtils, useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { generateMenuSetting } from "./data";

export function SettingScreen() {
  const { theme, changeTheme } = useTheme();
  const navigate = useNavigation();
  const screenUtils = useScreenUtils();
  const auth = useAuth();
  return (
    <StackScreen headerTitle="Setting">
      <KCContainer
        className="px-2"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: 10,
            paddingVertical: 10,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {generateMenuSetting({ navigate }).map((item, index) => (
            <View
              key={index}
              className="rounded-xl shadow-sm"
              style={{
                backgroundColor: theme.secondBackgroundColor,
                gap: 3,
              }}
            >
              <TouchableOpacity
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
                <KCIcon
                  family="Entypo"
                  name="chevron-small-right"
                  className="pt-[2px]"
                  size={30}
                  color={theme.primaryTextColor}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </KCContainer>
    </StackScreen>
  );
}

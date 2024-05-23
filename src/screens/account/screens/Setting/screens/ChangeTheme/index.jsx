import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { KCContainer } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { ThemeConfigs, listTheme } from "~themes";

export function ChangeThemeScreen() {
  const { theme, currentTheme, changeTheme } = useTheme();

  return (
    <StackScreen headerTitle="Change theme">
      <KCContainer
        className="px-2"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: 10,
            paddingVertical: 20,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {listTheme.map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => changeTheme(item.key)}
              className="px-2 py-4 rounded-lg shadow-sm flex-row justify-between items-center"
              style={{
                backgroundColor: theme.secondBackgroundColor,
                borderWidth: 1,
                borderColor: theme.secondBackgroundColor,
                ...(currentTheme === item.key && {
                  borderColor: theme.primaryButtonBackgroundColor,
                }),
              }}
            >
              <View>
                <Text
                  className={currentTheme === item.key ? "font-medium" : ""}
                  style={{ color: theme.primaryTextColor }}
                >
                  {item.label}
                </Text>
              </View>
              <View className="flex-row" style={{ gap: 10 }}>
                <View
                  className="w-4 h-4 rounded-full "
                  style={{
                    backgroundColor:
                      ThemeConfigs[item.key].primaryButtonBackgroundColor,
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </KCContainer>
    </StackScreen>
  );
}

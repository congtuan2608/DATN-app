import React from "react";
import { ScrollView, Text, View } from "react-native";
import { KCLinking } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { generateContent } from "./data";

export function ContactSupportScreen() {
  const { theme } = useTheme();

  const content = React.useMemo(() => generateContent(), []);

  return (
    <StackScreen headerTitle="Contact support">
      <View
        className="px-2"
        style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {content.map((group, groupIdx) => (
            <View key={groupIdx}>
              <View className="flex flex-col" style={{ gap: 10 }}>
                <View className="p-4 pb-0">
                  <Text
                    className="text-base"
                    style={{ color: theme.primaryTextColor }}
                  >
                    {group.description}
                  </Text>
                </View>
                <View style={{ gap: 10 }}>
                  {group.items.map((item, idx) => (
                    <KCLinking
                      configs={item.linkConfigs}
                      key={idx}
                      className="rounded-lg shadow-sm"
                      style={{ backgroundColor: theme.secondBackgroundColor }}
                    >
                      <View
                        className="flex flex-row items-center px-4 py-2"
                        style={{ gap: 12 }}
                      >
                        <View
                          className="flex justify-center items-center"
                          style={{ width: 36, height: 36 }}
                        >
                          {item.icon}
                        </View>
                        <View className="flex flex-col" style={{ gap: 2 }}>
                          <Text
                            className="text-base font-medium"
                            style={{ color: theme.primaryTextColor }}
                          >
                            {item.mainText}
                          </Text>
                          {item.subText && (
                            <Text
                              className="text-sm"
                              style={{ color: theme.primaryTextColor }}
                            >
                              {item.subText}
                            </Text>
                          )}
                        </View>
                      </View>
                    </KCLinking>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </StackScreen>
  );
}

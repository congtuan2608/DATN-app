import { Text } from "react-native";

export const BlogScreens = () => {
  return (
    <StackScreen
      headerShown={false}
      styleContainer={{
        paddingTop: 0,
        backgroundColor: theme.primaryBackgroundColor,
      }}
    >
      <Text>Hello blog</Text>
    </StackScreen>
  );
};

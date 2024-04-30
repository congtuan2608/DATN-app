import WebView from "react-native-webview";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";

export function TermOfPrivacyPolicyScreens() {
  const { theme } = useTheme();
  const URL =
    "https://www.freeprivacypolicy.com/live/9aedfe29-afc0-4b53-8187-473975a33b5e";
  return (
    <StackScreen headerTitle="Terms of privacy policy">
      <WebView source={{ uri: URL }} style={{ flex: 1 }} />
    </StackScreen>
  );
}

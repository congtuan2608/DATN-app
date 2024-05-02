import { Linking, TouchableOpacity } from "react-native";
import { generateAppURL } from "./utils";

export function KCLinking(props) {
  const handleOpenLink = async () => {
    for (const config of props.configs) {
      const appURL = generateAppURL(config);
      if (appURL) {
        const isSupported = await Linking.canOpenURL(appURL);
        console.log(`${appURL}: ${isSupported}`);
        if (isSupported) {
          await Linking.openURL(appURL);
          if (props.callBack) await props.callBack();
          return;
        }
      }
    }
  };

  return (
    <TouchableOpacity className="flex-1" onPress={handleOpenLink} {...props}>
      {props.children}
    </TouchableOpacity>
  );
}

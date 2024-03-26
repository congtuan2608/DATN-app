import AntDesignIcons from "react-native-vector-icons/AntDesign";
import FeatherIcons from "react-native-vector-icons/Feather";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import FontAwesome6Icons from "react-native-vector-icons/FontAwesome6";

import EntypoIcons from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const Icons = {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome: FontAwesomeIcons,
  FontAwesome5: FontAwesome5Icons,
  FontAwesome6: FontAwesome6Icons,
  Feather: FeatherIcons,
  AntDesign: AntDesignIcons,
  Entypo: EntypoIcons,
};

export const KCIcon = (props) => {
  const { family, ...otherProps } = props;
  const Icon = Icons[family];
  return <Icon {...otherProps} />;
};

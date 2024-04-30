import Dayjs from "dayjs";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "~hooks";
import { getImageIcon } from "~screens/history/utils";

export function HistoryItem(props) {
  const { theme } = useTheme();
  switch (props?.activity?.activityType) {
    case "campaign": {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          className="w-full rounded-lg items-center p-3 flex-row shadow-sm"
          style={{ backgroundColor: theme.secondBackgroundColor, gap: 10 }}
        >
          <View>
            <Image
              source={getImageIcon(props.activity.activityType)}
              className="h-8 w-8"
            />
          </View>
          <View
            className="flex-1 items-start justify-center"
            style={{ gap: 5 }}
          >
            <Text
              className="font-semibold text-base"
              style={{ color: theme.primaryTextColor }}
            >
              {props.title ?? "<Empty>"}
            </Text>
            <Text style={{ color: theme.thirdTextColor }}>
              {Dayjs(props.createdAt).format("hh:mm DD/MM/YYYY")}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    case "report-location": {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          className="w-full rounded-lg items-center p-3 flex-row shadow-sm"
          style={{ backgroundColor: theme.secondBackgroundColor, gap: 10 }}
        >
          <View>
            <Image
              source={getImageIcon(props.activity.activityType)}
              className="h-8 w-8"
            />
          </View>
          <View
            className="flex-1 items-start justify-center"
            style={{ gap: 5 }}
          >
            <Text
              className="font-semibold text-base"
              style={{ color: theme.primaryTextColor }}
            >
              {props.title ?? "<Empty>"}
            </Text>
            <Text style={{ color: theme.thirdTextColor }}>
              {Dayjs(props.createdAt).format("hh:mm DD/MM/YYYY")}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    default: {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          className="w-full rounded-lg items-center p-3 flex-row shadow-sm"
          style={{ backgroundColor: theme.secondBackgroundColor, gap: 10 }}
        >
          <View>
            <Image
              source={getImageIcon(props.activity.activityType)}
              className="h-8 w-8"
            />
          </View>
          <View
            className="flex-1 items-start justify-center"
            style={{ gap: 5 }}
          >
            <Text
              className="font-semibold text-base"
              style={{ color: theme.primaryTextColor }}
            >
              {props.title}
            </Text>
            <Text style={{ color: theme.thirdTextColor }}>
              {Dayjs(props.createdAt).format("hh:mm DD/MM/YYYY")}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

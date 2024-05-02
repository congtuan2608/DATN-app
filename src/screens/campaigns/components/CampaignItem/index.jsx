import { Text, View } from "react-native";
import { KCButton } from "~components";
import { useTheme } from "~hooks";

export function CampaignItem(props) {
  const { theme } = useTheme();
  return (
    <View
      className="justify-center rounded-lg px-2 py-3 shadow-sm"
      style={{
        gap: 10,
        backgroundColor: theme.secondBackgroundColor,
      }}
      {...props}
    >
      <View>
        <Text
          className="font-semibold text-lg"
          style={{ color: theme.primaryTextColor }}
        >
          Chiến dịch dọn dẹp rác ở Ngãi Giao
        </Text>
      </View>
      <View style={{ gap: 5 }}>
        <Text
          className="text-sm"
          numberOfLines={3}
          style={{ color: theme.primaryTextColor }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit magni
          soluta voluptates blanditiis perspiciatis, cupiditate dolores dolorum
          asperiores natus nam, aspernatur alias cumque amet deserunt
          perferendis eaque, suscipit illo totam.
        </Text>
        <Text style={{ color: theme.primaryTextColor }}>
          <Text className="font-medium">Participation deadline: </Text>
          20/03/2024 - 25/03/2024
        </Text>
        <Text style={{ color: theme.primaryTextColor }}>
          <Text className="font-medium">Number of participants: </Text>
          23/{Math.floor(Math.random() * 24) + 23}
        </Text>
        <Text style={{ color: theme.primaryTextColor }}>
          <Text className="font-medium">Organizer: </Text>Cong Tuan
        </Text>
      </View>
      <View className="flex-row" style={{ gap: 10 }}>
        <KCButton
          variant="Filled"
          // disabled={true}
          styleContainer={{
            flex: 1,
            paddingVertical: 8,
          }}
        >
          Join
        </KCButton>
        <KCButton
          variant="Outline"
          styleContainer={{ flex: 1, paddingVertical: 8 }}
        >
          View details
        </KCButton>
      </View>
    </View>
  );
}

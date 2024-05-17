import { useNavigation } from "@react-navigation/native";
import Dayjs from "dayjs";
import React from "react";
import { Text, View } from "react-native";
import { RestAPI } from "~apis";
import { KCButton } from "~components";
import { useAuth, useTheme } from "~hooks";

export function CampaignItem({ data, joinedCampaigns, setJoinedCampaigns }) {
  const { theme } = useTheme();
  const { userProfile } = useAuth();
  const navigate = useNavigation();
  const [join, setJoin] = React.useState(
    Boolean(data?.participants?.find((item) => item?._id === userProfile?._id))
  );
  const Join = RestAPI.JoinCampaign();
  const Leave = RestAPI.LeaveCampaign();

  React.useEffect(() => {
    setJoin(joinedCampaigns.includes(data?._id));
  }, [joinedCampaigns]);

  React.useEffect(() => {
    if (data?.participants?.find((item) => item?._id === userProfile?._id))
      setJoinedCampaigns((prev) => [...prev, data?._id]);
  }, []);

  const handleAction = () => {
    if (data?.organizer?._id === userProfile?._id) return;
    if (join) {
      Leave.mutate({ id: data?._id });
      setJoinedCampaigns((prev) => prev.filter((item) => item !== data?._id));
    } else {
      Join.mutate({ id: data?._id });
      setJoinedCampaigns((prev) => [...prev, data?._id]);
    }
    setJoin(!join);
    return;
  };

  const disabledJoin = Boolean(
    data?.participants.length >= data?.limit ||
      Dayjs().isBefore(Dayjs(data.startDate)) ||
      Dayjs().isAfter(Dayjs(data.endDate)) ||
      data?.organizer?._id === userProfile?._id
  );
  const renderStyle = () => {
    if (
      data?.organizer?._id === userProfile?._id ||
      Dayjs().isBefore(Dayjs(data.startDate)) ||
      Dayjs().isAfter(Dayjs(data.endDate))
    ) {
      return { backgroundColor: theme.primaryBackgroundColor };
    }
    if (join) {
      return {
        backgroundColor: "#F87171",
        borderColor: "#F87171",
      };
    }
  };
  const renderTextJoin = () => {
    if (data?.organizer?._id === userProfile?._id) return "Organizer";
    if (join || joinedCampaigns.includes(data?._id)) return "Leave";

    return "Join";
  };

  return (
    <View
      className="justify-center rounded-lg px-2 py-3 shadow-sm"
      style={{
        gap: 10,
        backgroundColor: theme.secondBackgroundColor,
      }}
    >
      <View>
        <Text
          className="font-semibold text-lg"
          style={{ color: theme.primaryTextColor }}
        >
          {data?.title ?? "<Empty>"}
        </Text>
      </View>
      <View style={{ gap: 5 }}>
        <Text
          className="text-sm"
          numberOfLines={3}
          style={{ color: theme.primaryTextColor }}
        >
          {data?.description ?? "<Empty>"}
        </Text>
        <Text style={{ color: theme.primaryTextColor }}>
          <Text className="font-medium">Participation deadline: </Text>
          {Dayjs(data.startDate).format("A hh:mm DD/MM/YYYY")} -{" "}
          {Dayjs(data.endDate).format("A hh:mm DD/MM/YYYY")}
        </Text>
        <Text style={{ color: theme.primaryTextColor }}>
          <Text className="font-medium">Number of participants: </Text>
          {data?.participants.length ?? 0}/{data?.limit ?? 0}
        </Text>
        <Text style={{ color: theme.primaryTextColor }}>
          <Text className="font-medium">Organizer: </Text>
          {data?.organizer?.fullName ?? "<Empty>"}
        </Text>
      </View>
      <View className="flex-row" style={{ gap: 10 }}>
        <KCButton
          variant="Filled"
          styleContainer={{
            flex: 1,
            paddingVertical: 8,
            ...renderStyle(),
          }}
          isLoading={Join.isPending || Leave.isPending}
          disabled={disabledJoin}
          onPress={handleAction}
        >
          {renderTextJoin()}
        </KCButton>
        <KCButton
          variant="Outline"
          styleContainer={{ flex: 1, paddingVertical: 8 }}
          onPress={() =>
            navigate.navigate("CampaignDetailScreen", {
              id: data._id,
              setJoinedCampaigns,
            })
          }
        >
          View details
        </KCButton>
      </View>
    </View>
  );
}

import { useRoute } from "@react-navigation/native";
import React from "react";
import { RestAPI } from "~apis";
import { KCContainer } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";

export function CampaignDetailScreen(props) {
  const navigateParams = useRoute();
  const campaign = RestAPI.GetCampaignById();
  const { theme } = useTheme();
  React.useEffect(() => {
    if (navigateParams.params?.id) {
      campaign.mutate({ id: navigateParams.params.id });
    }
  }, [navigateParams.params?.id]);
  console.log(campaign.data);
  return (
    <StackScreen headerTitle="Campaigns detail">
      <KCContainer></KCContainer>
    </StackScreen>
  );
}

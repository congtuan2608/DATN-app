import { useRoute } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import { RestAPI } from "~apis";
import { KCContainer } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import {
  HistoryDetailHeader,
  MomoPayItem,
  ReportLocaionItem,
} from "./components";
import { CampaignItem } from "./components/CampaignItem";

export function HistoryDetailScreen() {
  const { theme } = useTheme();
  const navigateParams = useRoute();
  const HistoryDetail = RestAPI.GetHistoryDetail();
  React.useEffect(() => {
    if (navigateParams.params?.id)
      HistoryDetail.mutate({ id: navigateParams.params?.id });
  }, [navigateParams.params?.id]);
  const renderComponent = (activity) => {
    switch (activity) {
      case "report-location": {
        return <ReportLocaionItem {...HistoryDetail.data?.details} />;
      }
      case "campaign": {
        return (
          <CampaignItem
            {...{
              ...HistoryDetail.data?.details,
              campaign: HistoryDetail.data?.details?.reference,
            }}
          />
        );
      }
      case "payment": {
        // if (HistoryDetail.data?.details?.method === "MOMO") {
        return <MomoPayItem {...HistoryDetail.data} />;
        // }
        // return <></>;
      }

      default:
        return <KCContainer isEmpty />;
    }
  };

  return (
    <StackScreen headerTitle="History detail">
      <KCContainer
        className="p-2"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
        isLoading={HistoryDetail.isPending}
        isEmpty={!HistoryDetail.data}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "start",
            alignItems: "center",
            gap: 10,
          }}
        >
          {HistoryDetail.data && (
            <HistoryDetailHeader {...HistoryDetail.data} />
          )}

          {renderComponent(HistoryDetail.data?.activity?.activityType)}
        </ScrollView>
      </KCContainer>
    </StackScreen>
  );
}

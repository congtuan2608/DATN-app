import { useRoute } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import { RestAPI } from "~apis";
import { KCContainer } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { HistoryDetailHeader, ReportLocaionItem } from "./components";

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

      default:
        return <></>;
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
            gap: 20,
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

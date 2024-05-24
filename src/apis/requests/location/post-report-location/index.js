import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function CreateReportLocation() {
  return useRestAPIMutation({
    request: (params) => {
      const formData = new FormData();
      formData.append("reportedBy", params.user_id);

      params?.location &&
        formData.append("location", JSON.stringify(params?.location));

      formData.append("address", params.address);

      params?.description &&
        formData.append("description", params?.description);

      formData.append("severity", params?.severity);

      params?.isAnonymous &&
        formData.append("isAnonymous", params?.isAnonymous);

      (params?.contaminatedType ?? []).map((typeId) => {
        return formData.append("contaminatedType", typeId);
      });

      (params?.assets ?? []).map((asset) => {
        formData.append("assets", {
          uri: asset.uri || "",
          type: asset?.mimeType || "image/jpeg",
          name: asset?.fileName || String(Date.now()),
        });
      });

      return {
        method: HTTPMethod.POST,
        configs: [
          APIPaths.ContaminatedLocation,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          },
        ],
      };
    },
  });
}

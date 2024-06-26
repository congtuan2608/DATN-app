import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function RoboflowDetectImages() {
  return useRestAPIMutation({
    request: (params) => {
      const formData = new FormData();

      (params?.images ?? []).map((asset) => {
        formData.append("images", {
          uri: asset.uri || "",
          type: asset?.mimeType || "image/jpg",
          name: asset?.fileName || `${String(Date.now())}.jpg`,
        });
      });

      return {
        method: HTTPMethod.POST,
        configs: [
          APIPaths.RoboflowDetectImages,
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

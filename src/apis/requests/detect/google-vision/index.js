import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function GoogleVisionDetectImages() {
  return useRestAPIMutation({
    request: (params) => {
      const formData = new FormData();

      (params?.images ?? []).map((asset) => {
        formData.append("images", {
          uri: asset.uri || "",
          type: asset?.mimeType || "image/jpeg",
          name: asset?.fileName || String(Date.now()),
        });
      });

      return {
        method: HTTPMethod.POST,
        configs: [
          APIPaths.GoogleVisionDetectImages,
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

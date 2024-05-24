import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function PostRecyclingGuide() {
  return useRestAPIMutation({
    request: (params) => {
      const formData = new FormData();
      formData.append("author", params.user_id);
      formData.append("title", params.title);
      formData.append("descriptsion", params.descriptsion);
      formData.append("recyclingTips", params.recyclingTips);

      params.recyclingTypes.map((typeId) => {
        return formData.append("recyclingTypes", typeId);
      });
      params.assets.map((asset) => {
        formData.append("assets", {
          uri: asset.uri || "",
        });
      });

      return {
        method: HTTPMethod.POST,
        configs: [
          APIPaths.RecyclingGuide,
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

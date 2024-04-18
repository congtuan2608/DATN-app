import { useMutation } from "@tanstack/react-query";
import { APIPaths } from "~apis/path";

export function PostRecyclingGuide() {
  const mutationResult = useMutation({
    mutationFn: (params) => {
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
          uri: asset.uri,
        });
      });

      return axios
        .post(`${APIPaths.RecyclingGuide}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((response) => response.data)
        .catch((error) => error);
    },
  });

  return mutationResult;
}

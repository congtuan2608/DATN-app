import { useMutation } from "@tanstack/react-query";
import { APIPaths } from "~apis/path";
import { HTTPMethod, useRestAPIMutation } from "~hooks/useRestAPI";

export function CreateReportLocation() {
  // const mutationResult = useMutation({
  //   mutationFn: (params) => {
  //     const formData = new FormData();
  //     formData.append("reportedBy", params.user_id);
  //     formData.append("title", params.title);
  //     formData.append("descriptsion", params.descriptsion);
  //     formData.append("recyclingTips", params.recyclingTips);

  //     params.recyclingTypes.map((typeId) => {
  //       return formData.append("recyclingTypes", typeId);
  //     });
  //     params.assets.map((asset) => {
  //       formData.append("assets", {
  //         uri: asset.uri,
  //       });
  //     });

  //     return axios
  //       .post(`${APIPaths.RecyclingGuide}`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Accept: "application/json",
  //         },
  //       })
  //       .then((response) => response.data)
  //       .catch((error) => error);
  //   },
  // });

  // return mutationResult;
  return useRestAPIMutation({
    request: (params) => {
      const formData = new FormData();
      formData.append("reportedBy", params.user_id);
      formData.append("location", JSON.stringify(params?.location));
      formData.append("address", params.address);
      formData.append("description", params?.description);
      formData.append("severity", params?.severity);
      formData.append("status", params?.status);
      formData.append("populationDensity", params?.populationDensity);
      formData.append("isAnonymous", params?.isAnonymous ?? false);

      (params?.contaminatedType ?? []).map((typeId) => {
        return formData.append("contaminatedType", typeId);
      });
      (params?.assets ?? []).map((asset) => {
        formData.append("assets", {
          uri: asset.uri,
          type: asset.mimeType,
          name: asset.fileName,
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

import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { getAxiosRequestFn } from "./utils";

export function useRestAPIQuery(props) {
  const axiosRequestFn = React.useCallback(
    (requestParams) => {
      return getAxiosRequestFn(
        props.request(requestParams ?? {}),
        props?.otherConfigs ?? {}
      );
    },
    [props.request]
  );

  const { request, ...reactQueryProps } = props;

  const restAPI = useQuery({
    queryFn: (requestParams) => axiosRequestFn(requestParams ?? {}),
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    ...reactQueryProps,
  });

  return restAPI;
}

export function useRestAPIMutation(props) {
  const axiosRequestFn = React.useCallback(
    (requestParams) => {
      return getAxiosRequestFn(
        props.request(requestParams ?? {}),
        props?.otherConfigs ?? {}
      );
    },
    [props.request]
  );

  const { request, ...reactQueryProps } = props;
  const restAPI = useMutation({
    mutationFn: (requestParams) => axiosRequestFn(requestParams ?? {}),
    ...reactQueryProps,
  });

  return restAPI;
}

export const HTTPMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import queryString from "query-string";
import { AsyncStorageKey } from "~configs/async-storage";
import { useAuth } from "~hooks";

const ROOT_BE_URL = process.env.EXPO_PUBLIC_ROOT_BE_URL;

const uninterceptedAxiosInstance = axios.create();

export const initAxiosConfigs = (props) => {
  axios.interceptors.request.use(async function (config) {
    const accessToken = await AsyncStorage.getItem(
      AsyncStorageKey.ACCESS_TOKEN
    );
    console.log({
      accessToken: accessToken?.substring(accessToken.length - 5),
    });
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error?.config;

      if (
        error &&
        error.response &&
        error.response.status === 401 &&
        originalRequest
      ) {
        if (originalRequest._retry === true) {
          // Refresh token expired
          await props.auth.logout();
        } else {
          originalRequest._retry = true; // Request to refresh accessToken will have _retry=true

          // Handle when accessToken expired
          console.log("Get new accessToken by using refreshToken");
          const refreshToken = await AsyncStorage.getItem(
            AsyncStorageKey.REFRESH_TOKEN
          );
          if (refreshToken) {
            // Get new accessToken by using refreshToken
            const newAccessToken = await refreshAccessToken(refreshToken);
            console.log({ newAccessToken });

            if (newAccessToken) {
              // Save new accessToken
              await AsyncStorage.setItem(
                AsyncStorageKey.ACCESS_TOKEN,
                newAccessToken
              );

              // Retry original request with the new accessToken
              error.config.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios.request(error.config);
            } else {
              return Promise.reject({
                title: "Session expired",
                message: "Please login again!",
                ignoreTransformer: true,
              });
            }
          } else {
            await props.auth.logout();
          }
        }
      }
      return Promise.reject(
        error?.response ?? error ?? new Error(`Unknown error ${error?.status}`)
      );
    }
  );

  async function refreshAccessToken(refreshToken) {
    // Send an API request to get a new accessToken
    try {
      const response = await uninterceptedAxiosInstance.post(
        `${ROOT_BE_URL}/v1/auth/refresh-token`,
        queryString.stringify({ refresh_token: refreshToken }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      // Handle errors when unable to get new accessToken
      console.log("Unable to get new accessToken", error);
      await props.auth.logout();
      return null;
    }
  }
};

const ROOT_BE_URL = process.env.EXPO_PUBLIC_ROOT_BE_URL;
export const APIPaths = {
  //api User-Authentication
  Login: `${ROOT_BE_URL}/v1/auth/login`,
  SignUp: `${ROOT_BE_URL}/v1/auth/sign-up`,
  GetUserProfile: `${ROOT_BE_URL}/v1/auth`,
  RefreshToken: `${ROOT_BE_URL}/v1/token/refresh`,
  GoogleLogin: `${ROOT_BE_URL}/v1/auth/google-login`,

  // recycling
  //type
  RecyclingType: `${ROOT_BE_URL}/v1/recycling/recycling-type`,
  //guide
  RecyclingGuide: `${ROOT_BE_URL}/v1/recycling/recycling-guide`,

  //contaminated type
  ContaminatedType: `${ROOT_BE_URL}/v1/polluted/contaminated-type`,
  //contaminated location
  ContaminatedLocation: `${ROOT_BE_URL}/v1/polluted/contaminated-location`,
  ContaminatedLocationNear: `${ROOT_BE_URL}/v1/polluted/contaminated-location-nearby`,

  // detect images
  TensorflowDetectImages: `${ROOT_BE_URL}/v1/detect/tensorflow`,
  GoogleVisionDetectImages: `${ROOT_BE_URL}/v1/detect/google-vision`,

  // campaign
  GetCampaign: `${ROOT_BE_URL}/v1/canpaign`,
  GetCampaignById: `${ROOT_BE_URL}/v1/canpaign/by-id`,
  CreateCampaign: `${ROOT_BE_URL}/v1/canpaign/create`,
  UpdateCampaign: `${ROOT_BE_URL}/v1/canpaign/update`,
  JoinCampaign: `${ROOT_BE_URL}/v1/canpaign/join-campaign`,
  LeaveCampaign: `${ROOT_BE_URL}/v1/canpaign/leave-campaign`,

  // history
  History: `${ROOT_BE_URL}/v1/history`,
  HistoryDetails: `${ROOT_BE_URL}/v1/history/details`,
  HistoryActivityType: `${ROOT_BE_URL}/v1/history/activity-type`,
};

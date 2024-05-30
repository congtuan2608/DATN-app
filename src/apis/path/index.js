const ROOT_BE_URL = process.env.EXPO_PUBLIC_ROOT_BE_URL;
export const APIPaths = {
  //api Authentication
  Login: `${ROOT_BE_URL}/v1/auth/login`,
  SignUp: `${ROOT_BE_URL}/v1/auth/sign-up`,
  GoogleLogin: `${ROOT_BE_URL}/v1/auth/google-login`,
  SendOTP: `${ROOT_BE_URL}/v1/auth/send-otp`,
  VerifyOTP: `${ROOT_BE_URL}/v1/auth/verify-otp`,
  ResetPassword: `${ROOT_BE_URL}/v1/auth/reset-password`,

  //api User
  GetUserProfile: `${ROOT_BE_URL}/v1/auth`,
  RefreshToken: `${ROOT_BE_URL}/v1/token/refresh`,
  User: `${ROOT_BE_URL}/v1/user`,

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
  RoboflowDetectImages: `${ROOT_BE_URL}/v1/detect/roboflow`,

  // campaign
  GetCampaign: `${ROOT_BE_URL}/v1/campaign`,
  GetCampaignById: `${ROOT_BE_URL}/v1/campaign/by-id`,
  CreateCampaign: `${ROOT_BE_URL}/v1/campaign/create`,
  UpdateCampaign: `${ROOT_BE_URL}/v1/campaign/update`,
  JoinCampaign: `${ROOT_BE_URL}/v1/campaign/join-campaign`,
  LeaveCampaign: `${ROOT_BE_URL}/v1/campaign/leave-campaign`,
  NearbyCampaign: `${ROOT_BE_URL}/v1/campaign/nearby`,

  // history
  History: `${ROOT_BE_URL}/v1/history`,
  HistoryDetails: `${ROOT_BE_URL}/v1/history/details`,
  HistoryActivityType: `${ROOT_BE_URL}/v1/history/activity-type`,

  //payment
  MomoRequestPayment: `${ROOT_BE_URL}/v1/payment/momo`,
};

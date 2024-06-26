import { Alert } from "react-native";

export const generateMenuGroups = ({ auth, navigate }) => {
  return [
    {
      groupTitle: "Personal",
      groupItems: [
        {
          text: "My profile",
          image: require("~assets/images/user-profile-icon.png"),
          onPress: async () => {
            navigate.navigate("MyProfileScreen");
          },
        },
        {
          text: "Change password",
          image: require("~assets/images/change-pw.png"),
          onPress: async () => {
            navigate.navigate("PasswordScreen");
          },
        },
      ],
    },

    {
      groupTitle: "Genaral",
      groupItems: [
        {
          text: "Contact support",
          image: require("~assets/images/contact-support-icon.png"),
          onPress: async () => {
            navigate.navigate("ContactSupportScreen");
          },
        },
        {
          text: "Terms of privacy policy",
          image: require("~assets/images/terms-policy-icon.png"),
          onPress: async () => {
            navigate.navigate("TermOfPrivacyPolicyScreens");
          },
        },
        // {
        //   text: "Settings",
        //   image: require("~assets/images/setting-icon.png"),
        //   onPress: async () => {
        //     navigate.navigate("SettingScreen");
        //   },
        // },
      ],
    },
    {
      groupTitle: "Setting",
      groupItems: [
        {
          text: "Method payment",
          image: require("~assets/images/payment-method-icon.png"),
          onPress: async () => {
            navigate.navigate("MethodPaymentScreen");
          },
        },
        {
          text: "Change theme",
          image: require("~assets/images/theme-icon.png"),
          onPress: async () => {
            navigate.navigate("ChangeThemeScreen");
          },
        },
        {
          text: "Delete account",
          image: require("~assets/images/delete-account-icon.png"),
          onPress: async () => {
            Alert.alert("Notification", "This feature is not available yet!");
            // navigate.navigate("ChangeThemeScreen");
          },
        },
      ],
    },
    {
      groupTitle: "System",
      groupItems: [
        {
          text: "Logout",
          image: require("~assets/images/logout-icon.png"),
          style: { color: "red" },
          onPress: async () => {
            auth.logout();
          },
        },
      ],
    },
  ];
};

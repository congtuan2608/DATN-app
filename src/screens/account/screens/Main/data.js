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
        {
          text: "Settings",
          image: require("~assets/images/setting-icon.png"),
          onPress: async () => {
            navigate.navigate("SettingScreen");
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

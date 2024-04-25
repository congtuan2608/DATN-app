export const generateMenuGroups = ({ auth }) => {
  return [
    {
      groupTitle: "Personal",
      groupItems: [
        {
          text: "My profile",
          image: require("~assets/images/user-profile-icon.png"),
          onPress: async () => {},
        },
      ],
    },
    {
      groupTitle: "Genaral",
      groupItems: [
        {
          text: "Contact support",
          image: require("~assets/images/contact-support-icon.png"),
          onPress: async () => {},
        },
        {
          text: "Terms of privacy policy",
          image: require("~assets/images/terms-policy-icon.png"),
          onPress: async () => {},
        },
        {
          text: "Settings",
          image: require("~assets/images/setting-icon.png"),
          onPress: async () => {},
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

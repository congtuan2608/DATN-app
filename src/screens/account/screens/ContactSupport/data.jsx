import { KCSVGAsset } from "~components";

export const generateContent = () => [
  {
    description:
      "You can contact us at any time through the following channels:",
    items: [
      {
        mainText: "Email",
        subText: "lctuan.dev@gmail.com",
        icon: (
          <KCSVGAsset
            name="BrandLogo_Gmail"
            style={{ width: 32, height: 32 }}
          />
        ),
        linkConfigs: [
          { app: "Gmail", emailAddress: "lctuan.dev@gmail.com" },
          { app: "Outlook", emailAddress: "lctuan.dev@gmail.com" },
          { app: "Email", emailAddress: "lctuan.dev@gmail.com" },
        ],
      },
      {
        mainText: "Facebook",
        subText: "Tuấn Lê",
        icon: (
          <KCSVGAsset name="Facebook_Color" style={{ width: 32, height: 32 }} />
        ),
        linkConfigs: [
          {
            app: "Facebook",
            type: "profile",
            pageId: "100026041985048",
          },
          {
            app: "HTTP_URL",
            url: "https://www.facebook.com/profile.php?id=100026041985048",
          },
        ],
      },
      {
        mainText: "Messenger",
        subText: "Tuấn Lê",
        icon: (
          <KCSVGAsset
            name="BrandLogo_FBMessenger"
            style={{ width: 32, height: 32 }}
          />
        ),
        linkConfigs: [
          {
            app: "HTTP_URL",
            url: "https://www.messenger.com/t/100026041985048",
          },
        ],
      },
    ],
  },
];

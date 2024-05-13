export function generateAppURL(config) {
  switch (config.app) {
    case "Email": {
      return `mailto:${config.emailAddress}`;
    }

    case "Gmail": {
      return `googlegmail://co?to=${config.emailAddress}`;
    }

    case "Outlook": {
      return `ms-outlook://compose?to=${config.emailAddress}`;
    }

    case "FacebookMessenger": {
      return `fb-messenger://user-thread/${config.userId}`;
    }

    case "Facebook": {
      return `fb://profile/${config.pageId}`;
    }

    case "Telegram": {
      return `tg://resolve?domain=${config.username}`;
    }

    case "Tiktok": {
      return `tiktok://${config.params}`;
    }

    case "Zalo": {
      return `zalo://qr/link/${config.phoneNumber}`;
    }

    case "HTTP_URL": {
      return config.url;
    }

    default: {
      return undefined;
    }
  }
}

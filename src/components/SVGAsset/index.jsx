import Add_Document from "~assets/svg/add_document.svg";
import Apple_Black from "~assets/svg/apple_black.svg";
import Book_Color from "~assets/svg/book_color.svg";
import Book_Lineal from "~assets/svg/book_lineal.svg";
import CreditCard_Color from "~assets/svg/credit_card_color.svg";
import EditText from "~assets/svg/edit_text.svg";
import Facebook_Color from "~assets/svg/facebook_color.svg";
import Feedback_Color from "~assets/svg/feedback_color.svg";
import Google_Color from "~assets/svg/google_color.svg";
import Headphone_Color from "~assets/svg/headphones_color.svg";
import Headphone_Lineal from "~assets/svg/headphones_lineal.svg";
import History_Clock from "~assets/svg/history_clock.svg";
import Idea_Color from "~assets/svg/idea_color.svg";
import List_Color from "~assets/svg/list_color.svg";
import Logout_Color from "~assets/svg/logout_color.svg";
import Menu_4Circle from "~assets/svg/menu_4circle.svg";
import Microphone_Color from "~assets/svg/microphone_color.svg";
import Microphone_Lineal from "~assets/svg/microphone_lineal.svg";
import Pencil_Color from "~assets/svg/pencil_color.svg";
import Pencil_Lineal from "~assets/svg/pencil_lineal.svg";
import Plus_Green from "~assets/svg/plus_green.svg";
import Profile_Color from "~assets/svg/profile_color.svg";
import Saved_Color from "~assets/svg/saved_color.svg";
import Settings_Color from "~assets/svg/settings_color.svg";
import Statistics_Color from "~assets/svg/statistics_color.svg";

import BrandLogo_FBMessenger from "~assets/svg/brand-logo/fb-messenger.svg";
import BrandLogo_Gmail from "~assets/svg/brand-logo/gmail.svg";
import BrandLogo_Telegram from "~assets/svg/brand-logo/telegram.svg";
import BrandLogo_Tiktok from "~assets/svg/brand-logo/tiktok.svg";
import BrandLogo_Zalo from "~assets/svg/brand-logo/zalo.svg";

const SVGs = {
  Add_Document,
  Apple_Black,
  Book_Color,
  Book_Lineal,
  CreditCard_Color,
  EditText,
  Facebook_Color,
  Feedback_Color,
  Google_Color,
  Headphone_Color,
  Headphone_Lineal,
  History_Clock,
  Idea_Color,
  List_Color,
  Logout_Color,
  Menu_4Circle,
  Microphone_Color,
  Microphone_Lineal,
  Pencil_Color,
  Pencil_Lineal,
  Plus_Green,
  Profile_Color,
  Saved_Color,
  Settings_Color,
  Statistics_Color,

  // Brand logo
  BrandLogo_FBMessenger,
  BrandLogo_Gmail,
  BrandLogo_Telegram,
  BrandLogo_Tiktok,
  BrandLogo_Zalo,
};

export function KCSVGAsset(props) {
  const { name, ...otherProps } = props;
  const SVGElement = SVGs[name];
  return <SVGElement {...otherProps} />;
}

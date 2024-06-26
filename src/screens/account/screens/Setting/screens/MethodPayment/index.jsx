import { ScrollView } from "react-native";
import { KCContainer } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";
import { CardPayments } from "./components";

const listCards = [
  {
    nameCard: "Momo",
    userName: "LE CONG TUAN",
    type: "phone",
    color: "bg-pink-600",
    phone: "0377969735",
    image: "https://test-payment.momo.vn/v2/gateway/images/logo-momo.png",
  },
  {
    nameCard: "ZaloPay",
    userName: "LE CONG TUAN",
    type: "phone",
    color: "bg-blue-500",
    phone: "0377969735",
    image:
      "https://res.cloudinary.com/dudwjr0ux/image/upload/v1717074196/public/1622682588188_zalopay_yx8evw.png",
  },
];
export const MethodPaymentScreen = () => {
  const { theme } = useTheme();

  return (
    <StackScreen headerTitle="Method payment">
      <KCContainer
        className="px-2"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: 10,
            paddingVertical: 15,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {listCards.map((item, index) => (
            <CardPayments key={index} {...item} />
          ))}
          {/* <KCButton variant="Outline" styleContainer={{ paddingVertical: 20 }}>
            Add the new card
          </KCButton> */}
        </ScrollView>
      </KCContainer>
    </StackScreen>
  );
};

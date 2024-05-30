import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "~hooks";

export const CardPayments = (props) => {
  const { theme } = useTheme();
  const [configs, setConfigs] = React.useState({
    phoneCard: {
      edit: false,
    },
    atmCard: {
      edit: false,
    },
  });
  const [phoneCard, setPhoneCard] = React.useState({});
  const [atmCard, setAtmCard] = React.useState({});

  React.useEffect(() => {
    switch (props.type) {
      case "phone":
        setPhoneCard(props);
        break;
      case "atm":
        setPhoneCard(props);
        break;
      default:
        return;
    }
  }, []);
  switch (props.type) {
    case "phone":
      return (
        <>
          <View
            className={`${props.color} p-3 py-5 rounded-lg shadow-sm`}
            style={{ gap: 5 }}
          >
            <Text
              className="text-lg font-semibold"
              style={{ color: theme.primaryFocusedColor }}
            >
              {props.nameCard}
            </Text>
            <Text
              className="text-base font-semibold"
              style={{ color: theme.primaryFocusedColor }}
            >
              {props.userName}
            </Text>
            <View className="justify-between flex-row items-center">
              {configs.phoneCard.edit ? (
                <>
                  <TextInput
                    autoComplete="phone"
                    keyboardType="phone-pad"
                    className={`flex-1 rounded-xl px-5 mr-3 py-3 shadow-sm `}
                    style={{
                      backgroundColor: theme.secondBackgroundColor,
                      color: theme.primaryTextColor,
                      maxHeight: 170,
                    }}
                    placeholder={"Phone number"}
                    value={phoneCard.phone}
                    onChangeText={(value) =>
                      setPhoneCard({ ...phoneCard, phone: value })
                    }
                    placeholderTextColor={theme.thirdTextColor}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setConfigs({
                        ...configs,
                        phoneCard: { ...configs.phoneCard, edit: false },
                      })
                    }
                  >
                    <Text
                      className="text-base"
                      style={{ color: theme.primaryFocusedColor }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text
                    className="font-semibold text-base"
                    style={{ color: theme.primaryFocusedColor }}
                  >
                    Phone number: {phoneCard.phone || "<Undefined>"}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setConfigs({
                        ...configs,
                        phoneCard: { ...configs.phoneCard, edit: true },
                      })
                    }
                  >
                    <Text
                      className="text-base"
                      style={{ color: theme.primaryFocusedColor }}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </>
      );
    case "atm":
      return <></>;

    default:
      return <></>;
  }
};

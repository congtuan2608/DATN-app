import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "~hooks";

export function KCInputOTP(props) {
  const { theme } = useTheme();
  const [text, setText] = React.useState(new Array(props.inputCount).fill(""));
  const [isFocused, setIsFocused] = React.useState(false);
  const ref = React.useRef(null);

  const onFocused = () => {
    ref.current.focus();
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };
  const onChangeText = (value) => {
    if (value.length > props.inputCount) return;
    const newText = [];
    text.map((_, index) => {
      newText.push(value[index] ?? "");
    });
    setText(newText);
    props.setOTP(value);
  };
  const currentInput = text.filter((i) => i !== "").length;

  return (
    <View className="flex-row justify-center items-center" style={{ gap: 10 }}>
      <TextInput
        ref={ref}
        maxLength={props.inputCount}
        className="flex-none hidden"
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType="number-pad"
      />
      {(text || []).map((_, index) => (
        <TouchableOpacity
          onPress={onFocused}
          key={index}
          className="justify-center rounded-lg items-center p-1 border-2 w-12 h-12 shadow-sm"
          style={{
            backgroundColor: theme.primaryBackgroundColor,
            borderColor:
              currentInput === index + 1 && isFocused
                ? theme.primaryButtonBackgroundColor
                : theme.primaryBorderColor,
          }}
        >
          <Text className="font-semibold text-lg">{text[index] ?? ""}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

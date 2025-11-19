import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors, fonts, fontSizes, spacing } from "../constants/theme";

interface Props {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<Props> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
}) => {
  const backgroundColor =
    variant === "primary"
      ? colors.primary
      : variant === "secondary"
      ? colors.graySoft
      : "transparent";

  const borderColor =
    variant === "outline" ? colors.primary : "transparent";

  const textColor =
    variant === "secondary" ? colors.textPrimary : colors.white;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? colors.graySoft : backgroundColor,
          borderColor,
          borderWidth: variant === "outline" ? 1.5 : 0,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.button,
    textTransform: "uppercase",
  },
});

export default CustomButton;

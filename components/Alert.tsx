import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts, fontSizes, spacing, metrics } from "../constants/theme";

// Define the type for the Ionicons names
type IconName = keyof typeof Ionicons.glyphMap;

type AlertProps = {
  visible: boolean;
  title?: string;
  message: string;
  icon?: IconName; // Correctly typed
  onClose: () => void;
  type?: "success" | "error" | "warning" | "info";
};

const Alert: React.FC<AlertProps> = ({
  visible,
  title = "Aviso",
  message,
  icon,
  onClose,
  type = "info",
}) => {
  const typeColors = {
    success: colors.success,
    error: colors.error,
    warning: "#facc15",
    info: colors.primary,
  };

  // FIX: Explicitly type the typeIcons object to resolve TS2322 error
  const typeIcons: Record<NonNullable<AlertProps['type']>, IconName> = {
    success: "checkmark-circle-outline",
    error: "close-circle-outline",
    warning: "alert-circle-outline",
    info: "information-circle-outline",
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: spacing.lg,
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: spacing.md,
            padding: spacing.lg,
            width: metrics.width * 0.9,
            shadowColor: colors.black,
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 5,
            alignItems: "center",
          }}
        >
          
          <Ionicons
            name={icon || typeIcons[type]} // This line now works without error
            size={metrics.scale(52)}
            color={typeColors[type]}
            style={{ marginBottom: spacing.sm }}
          />

          
          <Text
            style={{
              fontSize: fontSizes.body,
              fontFamily: fonts.bold,
              color: colors.textPrimary,
              marginBottom: spacing.xs,
              textAlign: "center",
            }}
          >
            {title}
          </Text>

          
          <Text
            style={{
              fontSize: fontSizes.small,
              fontFamily: fonts.regular,
              color: colors.textSecondary,
              textAlign: "center",
              marginBottom: spacing.md,
              lineHeight: 22,
            }}
          >
            {message}
          </Text>

          
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.85}
            style={{
              backgroundColor: typeColors[type],
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.xl,
              borderRadius: 12,
              shadowColor: typeColors[type],
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: fontSizes.button,
                fontFamily: fonts.regular,
                textAlign: "center",
              }}
            >
              Aceptar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Alert;
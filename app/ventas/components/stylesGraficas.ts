import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing } from "../../../constants/theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },

  emptyText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.sm,
  },

  resumenTotales: {
    marginTop: spacing.sm,
  },

  resumenTexto: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
    color: colors.textPrimary,
    textAlign: "center",
  },
});

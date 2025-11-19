import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayLight,
    padding: spacing.md,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: spacing.sm,
    fontSize: fontSizes.body,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.graySoft,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  titulo: {
    fontSize: fontSizes.body,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
  },
  total: {
    fontSize: fontSizes.subtitle,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  variacion: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  subText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  detalleText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.textPrimary,
    marginTop: 4,
  },
  detalleValue: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
    marginTop: 4,
  },
  // === Extra para visualización atractiva ===
  resumenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xs,
    borderTopWidth: 1,
    borderColor: colors.graySoft,
    paddingTop: spacing.xs,
  },
  resumenLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  resumenValue: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
    color: colors.textPrimary,
  },
});

import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing, metrics } from "../../../constants/theme";

const { width, height } = metrics;

export const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.sm,
    marginTop: spacing.small,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },

  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },

  dropdownInline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: spacing.sm,
    borderWidth: 1,
    borderColor: colors.graySoft,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingVertical: height * 0.014,
    paddingHorizontal: spacing.sm,
  },

  dropdownError: {
    borderColor: colors.error,
    backgroundColor: colors.errorContainer || "#ffeaea",
  },

  dropdownText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.textPrimary,
    flex: 1,
  },

  errorText: {
    color: colors.error,
    fontSize: fontSizes.small,
    marginTop: 4,
    fontFamily: fonts.regular,
    textAlign: "left",
    marginLeft: spacing.sm,
  },

  newClientBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },

  addLink: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
    color: colors.primary,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: spacing.md,
  },

  modalContainer: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
  },

  modalTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: spacing.sm,
  },

  modalItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.graySoft,
  },

  modalItemText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },

  modalSubText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },

  emptyText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
    textAlign: "center",
    paddingVertical: spacing.sm,
  },

  modalCloseBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    marginTop: spacing.md,
  },

  modalCloseText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.button,
    color: colors.white,
    textTransform: "uppercase",
  },
});

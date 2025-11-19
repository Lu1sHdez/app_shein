import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing, metrics } from "../../../constants/theme";

const { height } = metrics;

export const styles = StyleSheet.create({
  
  errorText: {
    color: colors.error,
    fontSize: fontSizes.small,
    marginTop: 4,
    marginBottom: 4,
    fontFamily: fonts.regular,
    textAlign: "left",
  },
  
  inputError: {
    borderColor: colors.error,
    backgroundColor: colors.errorContainer || "#ffeaea",
  },
  
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: spacing.md,
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

  input: {
    borderWidth: 1,
    borderColor: colors.graySoft,
    borderRadius: 10,
    paddingVertical: height * 0.014,
    paddingHorizontal: spacing.sm,
    fontSize: fontSizes.body,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },

  genderOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: colors.graySoft,
    borderRadius: 10,
  },

  genderOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  genderText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },

  genderTextSelected: {
    color: colors.white,
    fontFamily: fonts.medium,
  },

  modalCloseBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
  },

  modalCloseText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.button,
    color: colors.white,
    textTransform: "uppercase",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
  },
  
  actionButton: {
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.xs, 
  },
  
  actionButtonText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.button,
    color: colors.white,
    textTransform: "uppercase",
  },
});

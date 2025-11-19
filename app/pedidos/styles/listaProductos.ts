
import { StyleSheet, Platform } from "react-native";
import { colors, fonts, fontSizes, spacing, metrics } from "../../../constants/theme";

const { width, height } = metrics;

export const styles = StyleSheet.create({
  inputError: {
    borderColor: colors.error,
    backgroundColor: colors.errorContainer || "#ffeaea",
  },
  
  errorText: {
    color: colors.error,
    fontSize: fontSizes.small,
    fontFamily: fonts.regular,
    marginTop: 2,
    marginBottom: spacing.xs,
  },
  section: {
    paddingTop: spacing.small,
    paddingBottom: spacing.lg,
    marginHorizontal: spacing.sm,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
  },
  emptyText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginVertical: spacing.md,
  },

  
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderColor: colors.graySoft,
  },

  itemName: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },

  itemSub: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.grayDark,
    marginTop: 2,
  },

  
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    backgroundColor: colors.suave,
  },

  addButtonText: {
    marginLeft: spacing.xs,
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.primary,
  },

  
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
  },

  modalContainer: {
    width: width * 0.9,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  modalTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: spacing.md,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.graySoft,
    borderRadius: 10,
    paddingVertical: Platform.OS === "ios" ? 12 : height * 0.015,
    paddingHorizontal: spacing.sm,
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    backgroundColor: colors.white,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.xs,
  },

  checkboxLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.sm,
  },

  qtyText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    marginHorizontal: spacing.md,
  },

  saveBtn: {
    backgroundColor: colors.primary,
    paddingVertical: Platform.OS === "ios" ? 14 : height * 0.018,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.sm,
  },

  saveBtnText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.button,
    color: colors.white,
    textTransform: "uppercase",
  },

  label: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.small,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  
  cancelBtnText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.button,
    color: colors.textPrimary,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm, 
    marginTop: spacing.md,
  },

  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48, 
    borderRadius: 12,
    paddingVertical: 12,
  },

  addBtn: {
    backgroundColor: colors.primary,
  },

  cancelBtn: {
    backgroundColor: colors.grayLight,
  },

  buttonTextAdd: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.button,
    color: colors.white,
    textTransform: "uppercase",
  },

  buttonTextCancel: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.button,
    color: colors.textPrimary,
    textTransform: "uppercase",
  },
});

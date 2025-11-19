import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing, metrics } from "../../../constants/theme";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.md,
  },  
  container: {
    backgroundColor: colors.white,
    width: "90%",
    borderRadius: 16,
    padding: spacing.md,
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.graySoft,
    borderRadius: 10,
    paddingVertical: 22,
    paddingHorizontal: spacing.sm,
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    textAlign: "center",
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    marginBottom: 4,
    color: colors.textPrimary,
  },
  totalText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.primary,
    marginBottom: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  optionSelected: {
    backgroundColor: "#E0ECFF",
    borderRadius: 8,
  },
  optionText: {
    marginLeft: 8,
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  infoText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: "#4B5563",
  },
  actions: {
    marginTop: 16,
    flexDirection: "column",
    gap: 10,
  },
  btn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnPrimary: {
    backgroundColor: colors.primary,
  },
  btnCancel: {
    backgroundColor: colors.grayLight,
  },
  btnText: {
    fontFamily: fonts.medium,
    color: colors.white,
  },
  btnTextCancel: {
    fontFamily: fonts.medium,
    color: colors.textPrimary,
  },
});

import { StyleSheet } from "react-native";
import { colors, spacing, fonts, fontSizes, metrics } from "../../../constants/theme";

const { width, height } = metrics;

export const perfilStyles = StyleSheet.create({
  container:{
    alignItems:"center"
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: height * 0.05,
  },

  avatar: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: (width * 0.35) / 2,
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: spacing.md,
  },

  name: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: spacing.xs,
  },

  role: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.md,
  },

  infoBox: {
    width: "90%",
    backgroundColor: colors.grayLight,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },

  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },

  value: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },

  divider: {
    height: 1,
    backgroundColor: colors.graySoft,
    marginVertical: spacing.sm,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },

  loadingText: {
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    fontSize: fontSizes.small,
  },

  errorText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.error,
    textAlign: "center",
  },

  footer: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.lg,
  },
});

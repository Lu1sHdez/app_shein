import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing } from "../../../../constants/theme";

export const estadoStyles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.white,
  },

  title: {
    fontSize: fontSizes.title,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },

  subtitle: {
    fontSize: fontSizes.body,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },

  card: {
    backgroundColor: colors.grayLight,
    padding: spacing.md,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.graySoft,
  },

  cardTextBox: {
    marginLeft: spacing.sm,
  },

  cardTitle: {
    fontSize: fontSizes.body,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },

  cardSubtitle: {
    fontSize: fontSizes.small,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
});

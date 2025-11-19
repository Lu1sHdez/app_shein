import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing, metrics } from "../../../../constants/theme";

const { height } = metrics;

export const actividadStyles = StyleSheet.create({
  activitySection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.graySoft,
    padding: spacing.md,
    marginBottom: height * 0.05,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  linkText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.primary,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  activityContent: { flex: 1, marginRight: 10 },
  activityTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  activityMeta: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  activityTime: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
});

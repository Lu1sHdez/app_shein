import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing } from "../../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.md,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: colors.textSecondary,
    fontFamily: fonts.medium,
  },
  emptyText: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    fontFamily: fonts.medium,
  },
  card: {
    backgroundColor: colors.grayLight,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.graySoft,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    fontSize: fontSizes.body,
  },
  fechaText: {
    color: colors.textSecondary,
    fontSize: fontSizes.small,
    fontFamily: fonts.regular,
  },
  estadoBox: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  estadoText: {
    color: colors.white,
    fontSize: fontSizes.xtraSmall,
    fontFamily: fonts.medium,
  },
  totalText: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    color: colors.textPrimary,
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
  },
  bold: {
    fontFamily: fonts.medium,
  },
  productList: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  productText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.textPrimary,
  },
  btnPorEntregar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: spacing.sm,
    gap: 6,
    marginTop: spacing.sm,
  },
  btnText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
  },
});

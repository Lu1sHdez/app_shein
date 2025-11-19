import { StyleSheet, Platform } from "react-native";
import { colors, fonts, fontSizes, spacing, metrics } from "../../../constants/theme";

const {scale, verticalScale } = metrics;

export const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    marginTop: spacing.xs,
    textAlign: "left",
  },
  
  sectionTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.subtitle,
    color: colors.black,        
    marginBottom: spacing.sm,
    textAlign: "left",
  },
  content:{
    alignItems:"flex-end",
    marginTop:2
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  paymentSummary: {
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
  },
  

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    paddingTop: verticalScale(28),
    paddingBottom: verticalScale(10),
    borderBottomWidth: 1,
    borderColor: colors.graySoft,
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  backButton: {
    padding: scale(6),
    position: "absolute",
    left:15
  },

  saveButton: {
    padding: scale(6),
  },

  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    textAlign: "center",
  },

  section: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },

  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: verticalScale(18),
    borderTopWidth: 1,
    borderColor: colors.graySoft,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    marginTop: spacing.md,
  },

  saveButtonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: Platform.OS === "ios" ? verticalScale(14) : verticalScale(12),
    borderRadius: 12,
    alignItems: "center",
  },

  saveButtonText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.button,
    color: colors.white,
    textTransform: "uppercase",
  },

  input: {
    borderWidth: 1,
    borderColor: colors.graySoft,
    borderRadius: 12,
    padding: spacing.sm,
    marginTop: spacing.xs,
    fontSize: fontSizes.body,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },

  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.graySoft,
    borderRadius: 10,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    marginTop: spacing.xs,
    backgroundColor: colors.white,
  },

  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.suave,
  },

  optionText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },

  summaryCard: {
    backgroundColor: colors.suave,
    borderRadius: 14,
    padding: spacing.md,
    marginTop: spacing.md,
    marginHorizontal: spacing.md,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },

  summaryTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    color: colors.primary,
    marginBottom: spacing.sm,
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },

  summaryText: {
    marginLeft: spacing.xs,
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },


  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  
  paymentLabel: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },
  
  paymentValue: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: spacing.xs,
  },
  
  totalContainer: {
    alignItems: "center",
    marginTop: spacing.xs,
  },
  
  textAnticipo: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary, 
  },
  
});

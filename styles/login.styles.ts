import { StyleSheet } from "react-native";
import { colors, spacing, fonts, fontSizes, metrics } from "../constants/theme";

const { width, height, verticalScale, moderateScale } = metrics;

export const styles = StyleSheet.create({
  containerSubtitle:{
    width: "100%",
    marginBottom: spacing.sm,
  },
  

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingVertical: verticalScale(40), 
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.06, 
    backgroundColor: colors.white,
  },

  logo: {
    width: width * 0.45,
    height: width * 0.45,
    marginBottom: verticalScale(25),
    resizeMode: "contain",    marginTop: -verticalScale(10),

  },

  title: {
    fontFamily: fonts.bold,
    fontSize: moderateScale(fontSizes.title), 
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: spacing.xs,
  },

  subtitleText: {
    textAlign: "left",
    fontFamily: fonts.regular,
    fontSize: fontSizes.subtitle,
    color: colors.textSecondary,
    marginBottom: verticalScale(20),
  },

  inputContainer: {
    width: "100%",
    marginBottom: spacing.sm,
  },

  inputLabel: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: verticalScale(16),
  },

  eyeIconContainer: {
    paddingHorizontal: width * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
  inputPasswordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayLight,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.graySoft,
    paddingHorizontal: width * 0.02,
    height: verticalScale(48),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayLight,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.graySoft,
    paddingHorizontal: width * 0.03,
    height: verticalScale(50),
  },
  
  inputWrapperError: {
    backgroundColor: colors.errorContainer,
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: fontSizes.small,
    marginTop: verticalScale(6),
    fontFamily: fonts.regular,
    textAlign: "left",
  },
  
  input: {
    flex: 1,
    paddingVertical: 0,
    fontSize: moderateScale(fontSizes.body),
    fontFamily: fonts.regular,
    color: colors.textPrimary,
  },
});

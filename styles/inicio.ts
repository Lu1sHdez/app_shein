import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing } from "../constants/theme";

export const responsiveStyles = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
      width: "100%",
    },

    logo: {
      width: width * 0.45,     
      height: width * 0.45,
    },

    image: {
      width: "55%",          
      aspectRatio: 0.8,
      marginTop: spacing.sm,
    },

    title: {
      fontFamily: fonts.bold,
      fontSize: width < 360 ? fontSizes.title - 2 : fontSizes.title,
      color: colors.textPrimary,
      textAlign: "center",
    },

    subtitle: {
      fontFamily: fonts.regular,
      fontSize: width < 360 ? fontSizes.subtitle - 2 : fontSizes.subtitle,
      color: colors.textSecondary,
      textAlign: "center",
      width: "80%",       
    },
  });

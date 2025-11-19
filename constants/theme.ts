import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");


const scale = (size: number) => (width / 375) * size; 
const verticalScale = (size: number) => (height / 812) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const colors = {
  errorContainer: "#ffeaea",
  primary: "#2563EB",
  white: "#FFFFFF",
  grayLight: "#F2F2F2",
  graySoft: "#E0E0E0",
  grayDark: "#828282",
  black: "#000000",
  textPrimary: "#333333",
  suave:"#D4E3FC",
  green: "#27AE60",
  textSecondary: "#828282",
  link: "#9B51E0",
  success: "#27AE60",
  error: "#EB5757",
};

export const fonts = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  bold: "Poppins_700Bold",
};

export const fontSizes = {
  title: moderateScale(22),
  subtitle: moderateScale(18),
  label:moderateScale(18),
  body: moderateScale(16),
  small: moderateScale(14),
  xtraSmall: moderateScale(10),
  button: moderateScale(18),
};

export const spacing = {
  small: scale(12),
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
};

export const metrics = { width, height, scale, verticalScale, moderateScale };

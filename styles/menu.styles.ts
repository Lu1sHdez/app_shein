import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, metrics } from "../constants/theme";

const { width, height } = metrics;

export const iconSize = fontSizes.subtitle;

export const menuStyles = StyleSheet.create({
  drawerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.72,
    height: "100%",
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 20,
  },

  header: {
    alignItems: "center",
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.025,
    borderBottomWidth: 1,
    borderColor: colors.graySoft,
  },

  closeButton: {
    position: "absolute",
    paddingTop: height * 0.05,
    top: height * 0.01,
    left: width * 0.05,
    zIndex: 10,
    padding: fontSizes.small,
  },

  avatar: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: (width * 0.28) / 2,
    borderWidth: 3,
    borderColor: colors.primary, 
    backgroundColor: colors.suave,
    shadowColor: colors.grayDark,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: height * 0.02,
  },
  

  userRole: {
    fontSize: fontSizes.small,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
  },

  userName: {
    fontSize: fontSizes.subtitle,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginTop: height * 0.005,
  },

  userEmail: {
    fontSize: fontSizes.body,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    marginTop: height * 0.004,
  },

  drawerContent: {
    paddingHorizontal: width * 0.07,
    paddingTop: height * 0.02,
  },

  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.03,
    borderRadius: 10,
    marginBottom: height * 0.005,
  },

  drawerText: {
    fontSize: fontSizes.body,
    fontFamily: fonts.medium,
    marginLeft: 10,
  },

  activeItem: {
    backgroundColor: "#D4E3FC",
  },

  divider: {
    height: 1,
    backgroundColor: colors.graySoft,
    marginVertical: height * 0.02,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 15,
  },
});

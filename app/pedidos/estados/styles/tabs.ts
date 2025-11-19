import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing } from "../../../../constants/theme";

export const estadoTabs = StyleSheet.create({
  tabContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.graySoft,
  },

  tabScrollContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  tabText: {
    fontSize: fontSizes.small,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },

  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },

  activeTabText: {
    color: colors.primary,
    fontFamily: fonts.bold,
  },
});

import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: colors.textSecondary || "#6B7280",
    marginTop: 10,
    fontSize: fontSizes.body,
    fontFamily: fonts.medium,
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: fontSizes.body,
    marginTop: 10,
    fontFamily: fonts.medium,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  nombre: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    color: "#111827",
  },
  textItem: {
    fontFamily: fonts.regular,
    color: "#374151",
    marginBottom: 4,
  },
  footerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    borderTopWidth: 0.5,
    borderColor: "#E5E7EB",
    paddingTop: 6,
  },
  genero: {
    color: "#6B7280",
    fontFamily: fonts.medium,
  },
  btnDetalles: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DBEAFE",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  btnText: {
    color: "#2563EB",
    fontFamily: fonts.medium,
    marginLeft: 4,
    fontSize: fontSizes.small,
  },
});

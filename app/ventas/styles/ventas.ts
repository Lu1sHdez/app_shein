import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: spacing.md,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: spacing.sm,
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },

  emptyText: {
    textAlign: "center",
    marginTop: spacing.lg,
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },

  // Tarjetas
  card: {
    borderRadius: 14,
    padding: spacing.md + 2,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  cardPrimary: { borderLeftWidth: 4, borderLeftColor: "#2563EB" },
  cardLightBlue: { borderLeftWidth: 4, borderLeftColor: "#3B82F6" },
  cardPurple: { borderLeftWidth: 4, borderLeftColor: "#8B5CF6" },
  cardGreen: { borderLeftWidth: 4, borderLeftColor: "#10B981" },
  cardGray: { borderLeftWidth: 4, borderLeftColor: "#6B7280" },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },

  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
  },

  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },

  metricLabel: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
    color: "#374151",
  },

  metricValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.body,
    color: "#111827",
  },

  textLabel: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
    color: "#4B5563",
  },

  textValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.small,
    color: "#111827",
  },

  // Filtros de periodo
  filtrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },

  filtro: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },

  filtroActivo: {
    backgroundColor: "#2563EB",
  },

  filtroTexto: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
    color: "#374151",
  },

  filtroTextoActivo: {
    color: "#FFFFFF",
  },
  fechaCompleta: {
    fontSize: 14,
    color: "#333",  // Color de texto
    marginTop: 10,  // Espaciado
    textAlign: "center",  // Centrado
    fontFamily: fonts.medium,  // Fuente media
  },
});

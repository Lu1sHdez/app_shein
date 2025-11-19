import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing, metrics } from "../../../../constants/theme";

const { height } = metrics;

export const styles = StyleSheet.create({
  container: {
    marginBottom: height * 0.04,
  },

  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    letterSpacing: 0.3,
  },

  // Contenedor de las tarjetas
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  // Contenedor envolvente para animaciones y separación
  cardWrapper: {
    width: "48%",
    marginBottom: spacing.md,
  },

  // Tarjeta individual
  card: {
    backgroundColor: colors.white,
    borderWidth: 1.2,
    borderRadius: 14,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 2,
  },

  iconChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
    alignSelf: "flex-start",
  },

  textContainer: {
    gap: 2,
  },

  cardTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    marginBottom: 1,
  },

  cardValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    color: "#111",
  },

  cardSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Estado de carga
  loadingContainer: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: colors.textSecondary,
    fontFamily: fonts.regular,
  },
});

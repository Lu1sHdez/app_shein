import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing, metrics } from "../constants/theme";

const { height } = metrics;

export const styles = StyleSheet.create({
  // ----- APP BAR ----- 
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: height * 0.035, // Usa un porcentaje para la altura
  },
  menuButton: {
    padding: spacing.xs,
    zIndex: 2,
  },
  titleWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
    textAlign: "center",
  },

  // --- SECCIÓN DE ACCESOS RÁPIDOS ---
  quickAccessSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.graySoft,
    padding: spacing.md,
    marginBottom: height * 0.04,  // Ajuste el margen inferior de manera relativa
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  quickAccessContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",  // Esto permite que los botones se acomoden mejor en pantallas pequeñas
  },
  quickButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.graySoft,
    backgroundColor: colors.white,
    marginHorizontal: 5,
    gap: 6,
    marginBottom: spacing.sm,  // Agregado para separar los botones
  },
  quickButtonSmall: {
    width: 55,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.graySoft,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: { borderColor: colors.primary },
  secondaryButton: { borderColor: colors.graySoft },
  quickButtonText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
    color: colors.textPrimary,
  },

  // ----- MÁS OPCIONES CON DESPLEGADO ----- 
  moreOptionsContainer: {
    position: "absolute",  // Esto asegura que los botones adicionales aparezcan por encima del contenido
    top: 50, // Ajuste para que se muestren debajo del botón "Más opciones"
    left: 0,
    right: 0,
    zIndex: 1,  // Asegura que los botones adicionales se muestren por encima de los otros
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
});

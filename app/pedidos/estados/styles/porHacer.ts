import { StyleSheet } from "react-native";
import { colors, fonts, fontSizes, spacing } from "../../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.md,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  checkboxContainer: {
    marginRight: 8,
  },
  productText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#374151",
  },

  card: {
    backgroundColor: colors.grayLight,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.graySoft,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: spacing.lg,
    paddingLeft: spacing.sm,
  },
  cardTitle: {
    flex: 1,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    fontSize: fontSizes.body,
  },
  headerLeft: {
    flex: 1, 
  },
  headerRight: {
    width: 95, 
    paddingRight: spacing.md,
    alignItems: "flex-end",
  },
  
  fechaText: {
    color: colors.textSecondary,
    fontFamily: fonts.regular,
    marginTop: spacing.xs,
    fontSize: fontSizes.small,
  },
  totalText: {
    marginTop: spacing.sm,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
    fontSize: fontSizes.body,
  },
  bold: {
    fontFamily: fonts.medium,
  },

  estadoTag: {
    width: "100%", 
    marginRight: -60,
    height: 26,
    borderRadius: 12,
    fontSize: fontSizes.xtraSmall,
    fontFamily: fonts.medium,
    color: colors.white,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
    marginLeft: spacing.md, 
  },
  estadoCapsula: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "flex-end",
    minWidth: 90,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  estadoTexto: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: fontSizes.xtraSmall,
    textTransform: "capitalize",
  },
  
  estadoParcial: {
    backgroundColor: colors.primary,
  },
  estadoPendiente: {
    backgroundColor: colors.grayDark,
  },
  estadoListo: {
    backgroundColor: colors.green,
  },

  // Productos
  productList: {
    marginTop: spacing.xs,
  },
  productTachado: {
    textDecorationLine: "line-through",
    color: colors.textSecondary,
  },

  // Botón de detalles
  detallesBtn: {
    alignSelf: "flex-end",
    marginTop: spacing.sm,
  },
  detallesText: {
    color: colors.primary,
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
  },

  // Botón nuevo pedido
  nuevoPedidoBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.lg,
    backgroundColor: colors.grayLight,
    borderRadius: 30,
    paddingVertical: spacing.sm,
  },
  nuevoPedidoIcon: {
    color: colors.primary,
  },
  nuevoPedidoText: {
    color: colors.primary,
    marginLeft: spacing.xs,
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
  },
});

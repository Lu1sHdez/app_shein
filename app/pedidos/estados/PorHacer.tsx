import React, { useState, useEffect } from "react";
import { colors } from "../../../constants/theme";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { styles } from "./styles/porHacer";
import { API_URL } from "../../../constants/config";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/navigation";
import { useAlert } from "../../context/AlertContext";
import { usePedidos } from "../../context/PedidosContext";

// Habilitar animaciones en Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type PorHacerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PorHacer"
>;

const PorHacer: React.FC = () => {
  const navigation = useNavigation<PorHacerScreenNavigationProp>();
  const { showAlert } = useAlert();
  const { actualizarResumen } = usePedidos();

  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // === Obtener pedidos "Por hacer" ===
  const fetchPedidos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/app/pedidos/estado/Por%20hacer`);
      setPedidos(response.data);
    } catch (error: any) {
      console.log("Error al obtener pedidos:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  // === Alternar estado de producto ===
  const toggleProductoCompletado = async (
    detalleId: string,
    completadoActual: boolean,
    pedidoId: string
  ) => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      // Actualización local del producto
      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === pedidoId
            ? {
                ...pedido,
                DetallePedidos: pedido.DetallePedidos.map((d: any) =>
                  d.id === detalleId ? { ...d, completado: !completadoActual } : d
                ),
              }
            : pedido
        )
      );

      // Actualiza en backend
      const { data } = await axios.put(
        `${API_URL}/api/app/pedidos/detalle/${detalleId}/completado`,
        { completado: !completadoActual }
      );

      // Recalcular estado visual (según backend)
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === pedidoId
            ? { ...p, EstadoPedido: { ...p.EstadoPedido, estado: data.pedido.EstadoPedido?.estado || p.EstadoPedido.estado } }
            : p
        )
      );

      // Si todos están completos → eliminar del listado
      const pedidoActualizado = data.pedido.EstadoPedido?.estado;
      if (pedidoActualizado === "Realizados") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setPedidos((prev) => prev.filter((p) => p.id !== pedidoId));
        showAlert("Completado", "El pedido ha pasado a 'Realizados'.", "success");
      } else if (pedidoActualizado === "Parcial") {
        showAlert("Progreso guardado", "El pedido está parcialmente completado.", "info");
      } else {
        showAlert("Actualizado", "Se actualizó el estado del producto.", "info");
      }

      await actualizarResumen();
    } catch (error: any) {
      console.log("Error al actualizar producto:", error.response?.data || error.message);
      showAlert("Error", "No se pudo actualizar el producto.", "error");
    }
  };

  // === Estado de carga ===
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4F4F4F" />
        <Text style={{ marginTop: 10, color: "#4F4F4F" }}>Cargando pedidos...</Text>
      </View>
    );
  }

  // === Sin pedidos ===
  if (pedidos.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#4F4F4F", fontFamily: "Poppins-Medium" }}>
          No hay pedidos por hacer.
        </Text>
      </View>
    );
  }

  // === Render principal ===
  return (
    <ScrollView style={styles.container}>
      {pedidos.map((p) => {
        // Contar productos completados
        const totalProductos = p.DetallePedidos.length;
        const completados = p.DetallePedidos.filter((prod: any) => prod.completado).length;
        const estado =
          completados === totalProductos
            ? "Realizados"
            : completados > 0
            ? "Parcial"
            : "Por hacer";

        return (
          <View key={p.id} style={styles.card}>
            {/* === Encabezado === */}
            <View style={styles.cardHeader}>
              <View style={styles.headerLeft}>
                <Text style={styles.cardTitle}>
                  Pedido - {p.Cliente?.nombre?.trim()} {p.Cliente?.apellido_paterno?.trim()}
                </Text>
              </View>
              <View style={styles.headerRight}>
                <View
                  style={[
                    styles.estadoCapsula,
                    estado === "Realizados"
                      ? styles.estadoListo
                      : estado === "Parcial"
                      ? styles.estadoParcial
                      : styles.estadoPendiente,
                  ]}
                >
                  <Ionicons
                    name={
                      estado === "Realizados"
                        ? "checkmark-done"
                        : estado === "Parcial"
                        ? "alert-circle-outline"
                        : "time-outline"
                    }
                    size={14}
                    color={colors.white}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.estadoTexto}>{estado}</Text>
                </View>
            </View>

            </View>

            {/* === Fecha === */}
            <Text style={styles.fechaText}>
              Creado el {new Date(p.fecha).toLocaleDateString("es-MX")}
            </Text>

            {/* === Totales === */}
            <Text style={styles.totalText}>
              <Text style={styles.bold}>Total:</Text> ${p.total}{"   "}
              <Text style={styles.bold}>Pendiente:</Text> ${p.restante}
            </Text>

            {/* === Barra de progreso textual === */}
            <Text style={{ fontFamily: "Poppins-Regular", color: "#6B7280", marginTop: 4 }}>
              {completados} de {totalProductos} productos realizados
            </Text>

            {/* === Lista de productos === */}
            <View style={styles.productList}>
              {p.DetallePedidos.map((prod: any) => (
                <TouchableOpacity
                  key={prod.id}
                  style={[styles.productItem, prod.completado && { opacity: 0.6 }]}
                  onPress={() =>
                    toggleProductoCompletado(prod.id, prod.completado, p.id)
                  }
                >
                  <Ionicons
                    name={prod.completado ? "checkbox" : "square-outline"}
                    size={22}
                    color={prod.completado ? "#22C55E" : "#9CA3AF"}
                  />
                  <Text
                    style={[
                      styles.productText,
                      prod.completado && styles.productTachado,
                    ]}
                  >
                    {prod.nombre_producto} - {prod.cantidad} x ${prod.precio}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* === Botón detalles === */}
            <TouchableOpacity style={styles.detallesBtn}>
              <Text style={styles.detallesText}>Detalles</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {/* === Nuevo pedido === */}
      <TouchableOpacity
        style={styles.nuevoPedidoBtn}
        onPress={() => navigation.navigate("RegistrarPedido")}
      >
        <Ionicons name="add-circle-outline" size={22} color={styles.nuevoPedidoIcon.color} />
        <Text style={styles.nuevoPedidoText}>Nuevo pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PorHacer;

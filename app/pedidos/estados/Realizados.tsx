import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { styles } from "./styles/realizados";
import { API_URL } from "../../../constants/config";
import { useAlert } from "../../context/AlertContext";
import { usePedidos } from "../../context/PedidosContext";

// 🔹 Habilitar animaciones en Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Realizados: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();
  const { actualizarResumen } = usePedidos();

  // === Cargar pedidos "Realizados" ===
  const fetchPedidos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/app/pedidos/estado/Realizados`);
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

  // === Cambiar estado a "Por entregar" ===
  const marcarComoPorEntregar = async (pedidoId: string) => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      // 🔹 Remover visualmente el pedido de la lista
      setPedidos((prev) => prev.filter((p) => p.id !== pedidoId));

      // 🔹 Actualizar estado en el backend
      await axios.put(`${API_URL}/api/app/pedidos/${pedidoId}/estado`, {
        nuevoEstado: "Por entregar",
      });

      // 🔹 Actualizar resumen global (tarjetas del dashboard)
      await actualizarResumen();

      // 🔹 Alerta de confirmación
      showAlert("Actualizado", "El pedido ha pasado a 'Por entregar'.", "success");
    } catch (error: any) {
      console.log("Error al cambiar estado:", error.response?.data || error.message);
      showAlert("Error", "No se pudo cambiar el estado del pedido.", "error");
    }
  };

  // === Estado de carga ===
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Cargando pedidos realizados...</Text>
      </View>
    );
  }

  // === Si no hay pedidos ===
  if (pedidos.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Sin pedidos realizados aún</Text>
      </View>
    );
  }

  // === Render principal ===
  return (
    <ScrollView style={styles.container}>
      {pedidos.map((p) => (
        <View key={p.id} style={styles.card}>
          {/* === Encabezado === */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>
                Pedido de {p.Cliente?.nombre?.trim()} {p.Cliente?.apellido_paterno?.trim()}
              </Text>
              <Text style={styles.fechaText}>
                {new Date(p.fecha).toLocaleDateString("es-MX")}
              </Text>
            </View>

            <View style={styles.estadoBox}>
              <Text style={styles.estadoText}>{p.EstadoPedido?.estado}</Text>
            </View>
          </View>

          {/* === Totales === */}
          <Text style={styles.totalText}>
            <Text style={styles.bold}>Total:</Text> ${p.total}{"   "}
            <Text style={styles.bold}>Restante:</Text> ${p.restante}
          </Text>

          {/* === Lista de productos === */}
          <View style={styles.productList}>
            {p.DetallePedidos.map((prod: any) => (
              <View key={prod.id} style={styles.productItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#22C55E"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.productText}>
                  {prod.nombre_producto} - {prod.cantidad} x ${prod.precio}
                </Text>
              </View>
            ))}
          </View>

          {/* === Botón "Marcar como por entregar" === */}
          <TouchableOpacity
            style={styles.btnPorEntregar}
            onPress={() => marcarComoPorEntregar(p.id)}
          >
            <Ionicons name="cube-outline" size={18} color="white" />
            <Text style={styles.btnText}>Marcar como por entregar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default Realizados;

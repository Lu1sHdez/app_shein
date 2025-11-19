import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Platform,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { styles } from "./styles/entregado";
import { API_URL } from "../../../constants/config";
import { usePedidos } from "../../context/PedidosContext";

// 🔹 Habilitar animaciones para Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Entregado: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { actualizarResumen } = usePedidos();

  // === Obtener pedidos "Entregado" ===
  const fetchPedidos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/app/pedidos/estado/Entregado`);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setPedidos(response.data);
      await actualizarResumen();
    } catch (error: any) {
      console.log("Error al obtener pedidos:", error.response?.data || error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  // === Recarga con gesto pull-to-refresh ===
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPedidos();
  };

  // === Estado de carga ===
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Cargando pedidos entregados...</Text>
      </View>
    );
  }

  // === Si no hay pedidos ===
  if (pedidos.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="checkmark-done-circle-outline" size={46} color="#16A34A" />
        <Text style={styles.text}>No hay pedidos entregados aún</Text>
      </View>
    );
  }

  // === Render principal ===
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563EB" />
      }
    >
      {pedidos.map((p) => (
        <View key={p.id} style={styles.card}>
          {/* === ENCABEZADO === */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>
                Pedido de {p.Cliente?.nombre?.trim()} {p.Cliente?.apellido_paterno?.trim()}
              </Text>
              <Text style={styles.subText}>
                {p.Cliente?.telefono || "Sin teléfono"}
              </Text>
              <Text style={styles.fechaText}>
                Entregado el {new Date(p.fecha).toLocaleDateString("es-MX")}
              </Text>
            </View>

            <View style={styles.estadoBox}>
              <Text style={styles.estadoText}>{p.EstadoPedido?.estado}</Text>
            </View>
          </View>

          {/* === DETALLES DE PAGO === */}
          <View style={styles.pagoBox}>
            <Ionicons name="card-outline" size={18} color="#2563EB" />
            <Text style={styles.pagoText}>
              Método de pago: <Text style={styles.bold}>{p.metodoPago}</Text>
            </Text>
          </View>

          <Text style={styles.totalText}>
            <Text style={styles.bold}>Total:</Text> ${p.total}{"   "}
            <Text style={styles.bold}>Anticipo:</Text> ${p.anticipo}{"   "}
            <Text style={styles.bold}>Restante:</Text> ${p.restante}
          </Text>

          {/* === PRODUCTOS === */}
          <View style={styles.productList}>
            {p.DetallePedidos.map((prod: any) => (
              <View key={prod.id} style={styles.productItem}>
                <Ionicons
                  name="checkmark-done-circle"
                  size={20}
                  color="#16A34A"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.productText}>
                  {prod.nombre_producto.trim()} ({prod.talla || "Sin talla"}) - {prod.cantidad} x ${prod.precio}
                </Text>
              </View>
            ))}
          </View>

          {/* === OBSERVACIONES Y FECHAS === */}
          <View style={styles.footerBox}>
            <Text style={styles.obsText}>
               {p.EstadoPedido?.observaciones || "Pedido entregado correctamente."}
            </Text>
            <Text style={styles.footerDate}>
              Actualizado el {new Date(p.updatedAt).toLocaleDateString("es-MX")} a las{" "}
              {new Date(p.updatedAt).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </View>
        </View>
      ))}

    </ScrollView>
  );
};

export default Entregado;

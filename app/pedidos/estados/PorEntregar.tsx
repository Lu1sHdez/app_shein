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
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { styles } from "./styles/porEntregar";
import { API_URL } from "../../../constants/config";
import { useAlert } from "../../context/AlertContext";
import { usePedidos } from "../../context/PedidosContext";

// 🔹 Habilitar animaciones en Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PorEntregar: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();
  const { actualizarResumen } = usePedidos();

  // 🔸 Estados para modal de confirmación
  const [showModal, setShowModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<any>(null);
  const [montoPago, setMontoPago] = useState("");
  const [metodoPago, setMetodoPago] = useState("Efectivo");

  // === Obtener pedidos "Por entregar" ===
  const fetchPedidos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/app/pedidos/estado/Por%20entregar`);
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

  // === Función que marca como entregado (usa backend con confirmación de pago) ===
  const marcarComoEntregado = async (pedidoId: string, metodo: string, pagoFinal: number) => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      await axios.put(`${API_URL}/api/app/pedidos/${pedidoId}/estado`, {
        nuevoEstado: "Entregado",
        metodoPagoFinal: metodo,
        montoPagado: pagoFinal,
        observaciones: "Pago final registrado y entrega completada",
      });

      // 🔹 Eliminar visualmente de la lista
      setPedidos((prev) => prev.filter((p) => p.id !== pedidoId));

      // 🔹 Actualizar resumen global
      await actualizarResumen();

      showAlert("Completado", "El pedido fue entregado y pagado.", "success");
    } catch (error: any) {
      console.log("Error al cambiar estado:", error.response?.data || error.message);
      showAlert(
        "Error",
        error.response?.data?.mensaje || "No se pudo marcar el pedido como entregado.",
        "error"
      );
    }
  };

  // === Estado de carga ===
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Cargando pedidos por entregar...</Text>
      </View>
    );
  }

  // === Si no hay pedidos ===
  if (pedidos.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No hay pedidos por entregar</Text>
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
            <Text style={styles.bold}>Anticipo:</Text> ${p.anticipo}{"   "}
            <Text style={styles.bold}>Restante:</Text> ${p.restante}
          </Text>

          {/* === Lista de productos === */}
          <View style={styles.productList}>
            {p.DetallePedidos.map((prod: any) => (
              <View key={prod.id} style={styles.productItem}>
                <Ionicons name="cube-outline" size={20} color="#2563EB" style={{ marginRight: 6 }} />
                <Text style={styles.productText}>
                  {prod.nombre_producto} - {prod.cantidad} x ${prod.precio}
                </Text>
              </View>
            ))}
          </View>

          {/* === Botón "Marcar como entregado" === */}
          <TouchableOpacity
            style={styles.btnEntregado}
            onPress={() => {
              setPedidoSeleccionado(p);
              setMontoPago(p.restante?.toString() || "0");
              setMetodoPago("Efectivo");
              setShowModal(true);
            }}
          >
            <Ionicons name="checkmark-done" size={18} color="white" />
            <Text style={styles.btnText}>Marcar como entregado</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* === MODAL DE CONFIRMACIÓN === */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar pago final</Text>
            <Text style={styles.modalText}>
              Restante por pagar: ${pedidoSeleccionado?.restante}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Monto pagado"
              keyboardType="numeric"
              value={montoPago}
              onChangeText={setMontoPago}
            />

            <Text style={styles.modalLabel}>Método de pago:</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 10 }}>
              {["Efectivo", "Transferencia", "Otro"].map((m) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setMetodoPago(m)}
                  style={[
                    styles.option,
                    metodoPago === m && { backgroundColor: "#2563EB" },
                  ]}
                >
                  <Text style={{ color: metodoPago === m ? "white" : "#111" }}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                style={[styles.option, { backgroundColor: "#E5E7EB" }]}
                onPress={() => setShowModal(false)}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.option, { backgroundColor: "#16A34A" }]}
                onPress={async () => {
                  await marcarComoEntregado(
                    pedidoSeleccionado.id,
                    metodoPago,
                    parseFloat(montoPago)
                  );
                  setShowModal(false);
                }}
              >
                <Text style={{ color: "white" }}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PorEntregar;

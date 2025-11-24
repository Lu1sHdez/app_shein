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
import { API_URL } from "../../../constants/config";
import { useAlert } from "../../context/AlertContext";
import { usePedidos } from "../../context/PedidosContext";

// Animaciones Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PorEntregar: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { showAlert } = useAlert();
  const { actualizarResumen } = usePedidos();

  const [showModal, setShowModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<any>(null);
  const [montoPago, setMontoPago] = useState("");
  const [metodoPago, setMetodoPago] = useState("Efectivo");

  const fetchPedidos = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/app/pedidos/estado/Por%20entregar`
      );
      setPedidos(res.data);
    } catch (error: any) {
      console.log("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const marcarComoEntregado = async (
    pedidoId: string,
    metodo: string,
    pagoFinal: number
  ) => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      await axios.put(`${API_URL}/api/app/pedidos/${pedidoId}/estado`, {
        nuevoEstado: "Entregado",
        metodoPagoFinal: metodo,
        montoPagado: pagoFinal,
      });

      setPedidos((prev) => prev.filter((p) => p.id !== pedidoId));
      await actualizarResumen();

      showAlert("Completado", "El pedido fue entregado correctamente.", "success");
    } catch (e: any) {
      showAlert("Error", "No se pudo confirmar la entrega.", "error");
    }
  };

  // === LOADING ===
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-grayLight">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-body-sm font-regular text-textSecondary mt-3">
          Cargando pedidos por entregar...
        </Text>
      </View>
    );
  }

  // === SIN PEDIDOS ===
  if (pedidos.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-grayLight">
        <Text className="text-body font-medium text-textPrimary">
          No hay pedidos por entregar
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-4 py-4 bg-grayLight">

      {pedidos.map((p) => (
        <View
          key={p.id}
          className="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-graySoft"
        >
          {/* HEADER */}
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-body font-medium text-textPrimary">
                Pedido de {p.Cliente?.nombre} {p.Cliente?.apellido_paterno}
              </Text>

              <Text className="text-body-sm font-regular text-textSecondary mt-1">
                {new Date(p.fecha).toLocaleDateString("es-MX")}
              </Text>
            </View>

            <View className="bg-primary px-3 py-1 rounded-full">
              <Text className="text-[12px] font-medium text-white">
                Por entregar
              </Text>
            </View>
          </View>

          {/* TOTALES */}
          <Text className="text-body font-regular text-textPrimary mt-2">
            <Text className="font-medium">Total:</Text> ${p.total} ·{" "}
            <Text className="font-medium">Anticipo:</Text> ${p.anticipo} ·{" "}
            <Text className="font-medium">Restante:</Text> ${p.restante}
          </Text>

          {/* PRODUCTOS */}
          <View className="mt-4 space-y-2">
            {p.DetallePedidos.map((prod: any) => (
              <View
                key={prod.id}
                className="flex-row items-center p-3 rounded-xl bg-grayLight border border-graySoft"
              >
                <Ionicons name="cube-outline" size={20} color="#2563EB" />

                <Text className="ml-3 text-body font-regular text-textPrimary">
                  {prod.nombre_producto} · {prod.cantidad} × ${prod.precio}
                </Text>
              </View>
            ))}
          </View>

          {/* BOTÓN ENTREGAR */}
          <TouchableOpacity
            onPress={() => {
              setPedidoSeleccionado(p);
              setMontoPago(p.restante?.toString() || "0");
              setMetodoPago("Efectivo");
              setShowModal(true);
            }}
            className="mt-4 bg-success py-3 rounded-xl flex-row items-center justify-center active:opacity-80"
          >
            <Ionicons name="checkmark-done" size={20} color="white" />
            <Text className="text-white font-medium text-body ml-2">
              Marcar como entregado
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* === MODAL === */}
      <Modal visible={showModal} animationType="fade" transparent>
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <View className="w-full bg-white p-6 rounded-2xl shadow-lg">

            <Text className="text-h3 font-semibold text-textPrimary text-center mb-3">
              Confirmar pago final
            </Text>

            <Text className="text-body font-regular text-textSecondary text-center mb-2">
              Restante por pagar: ${pedidoSeleccionado?.restante}
            </Text>

            <TextInput
              className="border border-graySoft bg-grayLight rounded-xl px-4 py-2 text-body font-regular text-textPrimary"
              keyboardType="numeric"
              placeholder="Monto pagado"
              value={montoPago}
              onChangeText={setMontoPago}
            />

            <Text className="text-body font-medium text-textPrimary mt-4 mb-2 text-center">
              Método de pago
            </Text>

            <View className="flex-row justify-around mt-1">
              {["Efectivo", "Transferencia", "Otro"].map((m) => (
                <TouchableOpacity
                  key={m}
                  className={`
                    px-4 py-2 rounded-xl border
                    ${
                      metodoPago === m
                        ? "bg-primary border-primary"
                        : "bg-grayLight border-graySoft"
                    }
                  `}
                  onPress={() => setMetodoPago(m)}
                >
                  <Text
                    className={`${
                      metodoPago === m
                        ? "text-white font-medium"
                        : "text-textPrimary font-regular"
                    }`}
                  >
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* BOTONES */}
            <View className="flex-row justify-between mt-6">
              <TouchableOpacity
                className="flex-1 py-3 bg-grayDark/30 rounded-xl mr-2"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-center text-textPrimary text-body font-medium">
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 py-3 bg-success rounded-xl ml-2"
                onPress={async () => {
                  await marcarComoEntregado(
                    pedidoSeleccionado.id,
                    metodoPago,
                    parseFloat(montoPago)
                  );
                  setShowModal(false);
                }}
              >
                <Text className="text-center text-white text-body font-medium">
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PorEntregar;

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
import { API_URL } from "../../../constants/config";
import { useAlert } from "../../context/AlertContext";
import { usePedidos } from "../../context/PedidosContext";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Realizados: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();
  const { actualizarResumen } = usePedidos();

  // === CARGAR PEDIDOS ===
  const fetchPedidos = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/app/pedidos/estado/Realizados`);
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

  // === CAMBIAR A "POR ENTREGAR" ===
  const marcarComoPorEntregar = async (pedidoId: string) => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      setPedidos((prev) => prev.filter((p) => p.id !== pedidoId));

      await axios.put(`${API_URL}/api/app/pedidos/${pedidoId}/estado`, {
        nuevoEstado: "Por entregar",
      });

      await actualizarResumen();

      showAlert("Actualizado", "El pedido pasó a 'Por entregar'.", "success");
    } catch (error: any) {
      showAlert("Error", "No se pudo cambiar el estado.", "error");
    }
  };

  // === CARGANDO ===
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-grayLight">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-textSecondary mt-3">Cargando pedidos...</Text>
      </View>
    );
  }

  // === VACÍO ===
  if (pedidos.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-grayLight">
        <Text className="text-textPrimary font-medium text-body">
          No hay pedidos realizados aún.
        </Text>
      </View>
    );
  }

  // === RENDER PRINCIPAL ===
  return (
    <ScrollView className="flex-1 px-4 py-4 bg-grayLight">
      {pedidos.map((p) => (
        <View
          key={p.id}
          className="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-graySoft"
        >
          {/* HEADER */}
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-body font-medium text-textPrimary">
                Pedido de {p.Cliente?.nombre} {p.Cliente?.apellido_paterno}
              </Text>
              <Text className="text-textSecondary text-body-sm mt-1">
                {new Date(p.fecha).toLocaleDateString("es-MX")}
              </Text>
            </View>

            {/* CHIP */}
            <View className="bg-success px-3 py-1 rounded-full">
              <Text className="text-white text-[12px] font-medium">
                {p.EstadoPedido?.estado}
              </Text>
            </View>
          </View>

          {/* TOTALES */}
          <Text className="text-textPrimary text-body mt-3">
            <Text className="font-medium">Total:</Text> ${p.total} ·{" "}
            <Text className="font-medium">Restante:</Text> ${p.restante}
          </Text>

          {/* LISTA DE PRODUCTOS */}
          <View className="mt-3">
            {p.DetallePedidos.map((prod: any) => (
              <View
                key={prod.id}
                className="flex-row items-center mb-2 bg-grayLight p-3 rounded-xl"
              >
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#27AE60"
                  className="mr-2"
                />

                <Text className="text-textPrimary text-body flex-1">
                  {prod.nombre_producto} – {prod.cantidad} × ${prod.precio}
                </Text>
              </View>
            ))}
          </View>

          {/* BOTÓN POR ENTREGAR */}
          <TouchableOpacity
            onPress={() => marcarComoPorEntregar(p.id)}
            className="mt-4 flex-row items-center justify-center bg-primary py-3 rounded-xl active:opacity-80"
          >
            <Text className="text-white font-medium text-body ml-2">
              Marcar como por entregar
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default Realizados;

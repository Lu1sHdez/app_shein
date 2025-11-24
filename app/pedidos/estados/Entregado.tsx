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
import { API_URL } from "../../../constants/config";
import { usePedidos } from "../../context/PedidosContext";

// Animaciones Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Entregado: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { actualizarResumen } = usePedidos();

  const fetchPedidos = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/app/pedidos/estado/Entregado`);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setPedidos(res.data);
      await actualizarResumen();
    } catch (e: any) {
      console.log("Error:", e.response?.data || e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPedidos();
  };

  // === LOADING ===
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-grayLight">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-body-sm font-regular text-textSecondary mt-3">
          Cargando pedidos entregados...
        </Text>
      </View>
    );
  }

  // === SIN PEDIDOS ===
  if (pedidos.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-grayLight px-6">
        <Ionicons
          name="checkmark-done-circle-outline"
          size={56}
          color="#16A34A"
        />
        <Text className="text-body font-medium text-textPrimary mt-3 text-center">
          No hay pedidos entregados aún
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 px-4 py-4 bg-grayLight"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#2563EB"
        />
      }
    >
      {pedidos.map((p) => (
        <View
          key={p.id}
          className="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-graySoft"
        >
          {/* ENCABEZADO */}
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-2">
              <Text className="text-body font-medium text-textPrimary">
                Pedido de {p.Cliente?.nombre?.trim()}{" "}
                {p.Cliente?.apellido_paterno?.trim()}
              </Text>

              <Text className="text-body-sm font-regular text-textSecondary mt-1">
                {p.Cliente?.telefono || "Sin teléfono"}
              </Text>

              <Text className="text-body-sm font-regular text-textSecondary mt-1">
                Entregado el{" "}
                <Text className="font-medium text-textPrimary">
                  {new Date(p.fecha).toLocaleDateString("es-MX")}
                </Text>
              </Text>
            </View>

            <View className="bg-success px-3 py-1 rounded-full">
              <Text className="text-[12px] font-medium text-white">
                Entregado
              </Text>
            </View>
          </View>

          {/* MÉTODO DE PAGO */}
          <View className="mt-4 flex-row items-center">
            <Ionicons name="card-outline" size={18} color="#2563EB" />
            <Text className="ml-2 text-body font-regular text-textPrimary">
              Método de pago:{" "}
              <Text className="font-medium">{p.metodoPago}</Text>
            </Text>
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
                <Ionicons
                  name="checkmark-done-circle"
                  size={20}
                  color="#16A34A"
                />
                <Text className="ml-3 text-body font-regular text-textPrimary">
                  {prod.nombre_producto.trim()} ({prod.talla || "Sin talla"}) ·{" "}
                  {prod.cantidad} × ${prod.precio}
                </Text>
              </View>
            ))}
          </View>

          {/* OBSERVACIONES */}
          <View className="mt-4">
            <Text className="text-body-sm font-regular text-textSecondary">
              {p.EstadoPedido?.observaciones || "Pedido entregado correctamente."}
            </Text>

            <Text className="text-body-sm font-regular text-textSecondary mt-2">
              Actualizado el{" "}
              {new Date(p.updatedAt).toLocaleDateString("es-MX")} a las{" "}
              {new Date(p.updatedAt).toLocaleTimeString("es-MX", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Entregado;

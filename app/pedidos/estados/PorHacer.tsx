import React, { useState, useEffect } from "react";
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
import { API_URL } from "../../../constants/config";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/navigation";
import { useAlert } from "../../context/AlertContext";
import { usePedidos } from "../../context/PedidosContext";

// Habilitar animaciones en Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
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
  const [loadingPedido, setLoadingPedido] = useState<string | null>(null);

  // === Obtener pedidos ===
  const fetchPedidos = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/app/pedidos/estado/Por%20hacer`
      );
      setPedidos(response.data);
    } catch (error: any) {
      console.log(
        "Error al obtener pedidos:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  // === Toggle de producto ===
  const toggleProductoCompletado = async (
    detalleId: string,
    completadoActual: boolean,
    pedidoId: string
  ) => {
    try {
      setLoadingPedido(pedidoId);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      // Actualización local instantánea
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

      // Backend
      const { data } = await axios.put(
        `${API_URL}/api/app/pedidos/detalle/${detalleId}/completado`,
        { completado: !completadoActual }
      );

      const estadoFinal = data.pedido.EstadoPedido?.estado;

      // Mensajes UI
      if (estadoFinal === "Realizados") {
        setPedidos((p) => p.filter((x) => x.id !== pedidoId));
        showAlert("Completado", "Pedido movido a 'Realizados'.", "success");
      } else if (estadoFinal === "Parcial") {
        showAlert("Actualizado", "Pedido parcialmente completado.", "info");
      } else {
        showAlert("Actualizado", "Producto actualizado.", "info");
      }

      await actualizarResumen();
    } catch (error: any) {
      console.log(
        "Error al actualizar producto:",
        error.response?.data || error.message
      );
      showAlert("Error", "No se pudo actualizar el producto.", "error");
    } finally {
      setLoadingPedido(null);
    }
  };

  // === Estado: cargando ===
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-grayLight">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-textSecondary mt-3">Cargando pedidos...</Text>
      </View>
    );
  }

  // === Sin pedidos ===
  if (pedidos.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-grayLight">
        <Text className="text-textPrimary font-medium text-body">
          No hay pedidos por hacer.
        </Text>
      </View>
    );
  }

  // === Render principal ===
  return (
    <ScrollView className="flex-1 px-4 py-4 bg-grayLight">
      {pedidos.map((p) => {
        const totalProductos = p.DetallePedidos.length;
        const completados = p.DetallePedidos.filter(
          (prod: any) => prod.completado
        ).length;

        const estado =
          completados === totalProductos
            ? "Realizados"
            : completados > 0
            ? "Parcial"
            : "Por hacer";

        return (
          <View
            key={p.id}
            className="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-graySoft"
          >
            {/* HEADER */}
            <View className="flex-row items-center justify-between">
              <Text className="text-body font-medium text-textPrimary">
                Pedido - {p.Cliente?.nombre} {p.Cliente?.apellido_paterno}
              </Text>

              {/* CHIP */}
              <View
                className={`flex-row items-center px-3 py-1 rounded-full ${
                  estado === "Realizados"
                    ? "bg-success text-white"
                    : estado === "Parcial"
                    ? "bg-yellow-400 text-black"
                    : "bg-primary text-white"
                }`}
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
                  color={estado === "Parcial" ? "#000" : "#fff"}
                  className="mr-1"
                />
                <Text className="text-[12px] font-medium capitalize">
                  {estado}
                </Text>
              </View>
            </View>

            {/* CARGA SOLO PARA ESTE PEDIDO */}
            {loadingPedido === p.id && (
              <View className="mt-3 flex-row items-center">
                <ActivityIndicator size={16} color="#2563EB" />
                <Text className="text-primary text-body-sm ml-2">
                  Guardando cambios...
                </Text>
              </View>
            )}

            {/* FECHA */}
            <Text className="text-textSecondary text-body-sm mt-1">
              Creado el{" "}
              <Text className="font-medium text-black">
                {new Date(p.fecha).toLocaleDateString("es-MX")}
              </Text>
            </Text>

            {/* TOTALES */}
            <Text className="text-textPrimary text-body mt-2">
              <Text className="font-medium">Total:</Text> ${p.total} ·{" "}
              <Text className="font-medium">Pendiente:</Text> ${p.restante}
            </Text>

            {/* PROGRESO */}
            <Text className="text-textSecondary text-body-sm mt-1">
              {completados} de {totalProductos} productos completados
            </Text>

            {/* LISTA DE PRODUCTOS */}
            <View className="mt-4 space-y-2">
              {p.DetallePedidos.map((prod: any) => (
                <TouchableOpacity
                  key={prod.id}
                  disabled={loadingPedido === p.id}
                  className={`flex-row items-center p-3 rounded-xl border ${
                    prod.completado
                      ? "bg-success/10 border-success/50"
                      : "bg-grayLight border-graySoft"
                  } ${loadingPedido === p.id ? "opacity-50" : ""}`}
                  onPress={() =>
                    toggleProductoCompletado(
                      prod.id,
                      prod.completado,
                      p.id
                    )
                  }
                >
                  <Ionicons
                    name={prod.completado ? "checkbox" : "square-outline"}
                    size={22}
                    color={prod.completado ? "#27AE60" : "#6B7280"}
                  />

                  <Text
                    className={`ml-3 text-body text-textPrimary ${
                      prod.completado ? "line-through text-grayDark" : ""
                    }`}
                  >
                    {prod.nombre_producto} · {prod.cantidad} × ${prod.precio}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* BOTÓN DETALLES */}
            <TouchableOpacity className="mt-4 items-end">
              <Text className="text-primary font-medium text-body-sm">
                Ver detalles
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}

    <TouchableOpacity
      onPress={() => navigation.navigate("RegistrarPedido")}
      className="flex-row items-center justify-center bg-white/80 border border-primary py-3 mt-5 rounded-xl shadow-sm active:opacity-80"
    >
      <Ionicons name="add-circle-outline" size={22} color="#2563EB" />
      <Text className="text-primary font-medium text-body ml-2">
        Nuevo pedido
      </Text>
    </TouchableOpacity>


    </ScrollView>
  );
};

export default PorHacer;

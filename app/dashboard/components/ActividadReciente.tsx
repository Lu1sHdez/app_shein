import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import Text from "../../../components/Text";
import axios from "axios";
import { API_URL } from "../../../constants/config";
import { Ionicons } from "@expo/vector-icons";

export default function ActividadReciente() {
  const [actividades, setActividades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/app/pedidos/actividades`);
      setActividades(res.data.slice(0, 3)); // solo las 3 más recientes
    } catch (err) {
      console.log("Error al obtener actividades:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <View className="mt-10">
      {/* HEADER */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-textPrimary">Actividad reciente</Text>
        <Text className="text-link font-medium">Ver todo</Text>
      </View>

      {/* LOADING */}
      {loading ? (
        <View className="flex items-center mt-4">
          <ActivityIndicator size="small" color="#2563EB" />
          <Text className="text-gray-500 mt-2">Cargando actividades...</Text>
        </View>
      ) : actividades.length === 0 ? (
        <Text className="text-gray-400 text-center mt-4">
          No hay actividad reciente
        </Text>
      ) : (
        actividades.map((act, index) => (
          <TouchableOpacity
            key={act.id || index}
            className="flex-row justify-between items-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm mb-3"
            activeOpacity={0.8}
          >
            {/* IZQUIERDA */}
            <View className="flex-1">
              <Text className="font-semibold text-textPrimary">
                {index + 1}. Pedido de {act.cliente} ({act.estado})
              </Text>

              <Text className="text-gray-500 text-sm mt-1">
                {act.observaciones || "Sin observaciones"} · ${act.total}
              </Text>
            </View>

            {/* FECHA */}
            <View className="items-end ml-3">
              <Ionicons name="time-outline" size={18} color="#6B7280" />
              <Text className="text-gray-500 text-sm">
                {new Date(act.fecha).toLocaleDateString("es-MX")}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

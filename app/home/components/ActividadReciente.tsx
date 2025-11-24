import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import { API_URL } from "../../../constants/config";
import { Ionicons } from "@expo/vector-icons";

const ActividadReciente = () => {
  const [actividades, setActividades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActividades = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/app/pedidos/actividades`
      );
      const ultimas = response.data.slice(0, 3);
      setActividades(ultimas);
    } catch (error: any) {
      console.log(
        "Error al obtener actividades:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActividades();
  }, []);

  return (
    <View className="mb-6">
      {/* 🔹 HEADER */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-h3 font-semibold text-textPrimary">
          Actividad reciente
        </Text>

        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-primary font-medium text-body-sm">
            Ver todo
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 LOADING */}
      {loading && (
        <View className="items-center py-4">
          <ActivityIndicator size="small" color="#2563EB" />
          <Text className="text-grayDark text-body-sm mt-2 font-regular">
            Cargando actividades...
          </Text>
        </View>
      )}

      {/* 🔹 SIN ACTIVIDADES */}
      {!loading && actividades.length === 0 && (
        <Text className="text-textSecondary text-center text-body-sm mt-4 font-regular">
          No hay actividad reciente
        </Text>
      )}

      {/* 🔹 LISTA */}
      {!loading &&
        actividades.map((act, index) => (
          <TouchableOpacity
            key={act.id || index}
            activeOpacity={0.85}
            className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-graySoft flex-row items-center justify-between"
          >
            {/* 📌 INFORMACIÓN DEL PEDIDO */}
            <View className="flex-1 pr-3">
              <Text className="text-textPrimary font-medium text-body leading-tight">
                {index + 1}. Pedido de {act.cliente} ({act.estado})
              </Text>

              <Text className="text-grayDark text-body-sm mt-1 font-regular">
                {act.observaciones || "Sin observaciones"} • ${act.total}
              </Text>
            </View>

            {/* ⏱ FECHA */}
            <View className="items-end">
              <View className="bg-blue-50 p-2 rounded-xl">
                <Ionicons name="time-outline" size={18} color="#2563EB" />
              </View>

              <Text className="text-grayDark text-[10px] mt-1 font-regular">
                {new Date(act.fecha).toLocaleDateString("es-MX")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default ActividadReciente;

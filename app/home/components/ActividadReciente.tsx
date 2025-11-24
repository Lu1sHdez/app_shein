import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import { API_URL } from "../../../constants/config";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ActividadReciente = () => {
  const [actividades, setActividades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<any>();

  const fetchActividades = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/app/pedidos/actividades`);
      setActividades(response.data.slice(0, 3));
    } catch (error: any) {
      console.log("Error al obtener actividades:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActividades();
  }, []);

  return (
    <View className="mb-6">

      {/* HEADER */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-h3 font-semibold text-textPrimary">Actividad reciente</Text>

        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Actividades")}>
          <Text className="text-primary underline font-medium text-body-sm">Ver todo</Text>
        </TouchableOpacity>
      </View>

      {/* LOADING */}
      {loading && (
        <View className="items-center py-4">
          <ActivityIndicator size="small" color="#2563EB" />
          <Text className="text-grayDark text-body-sm font-regular mt-2">
            Cargando actividades...
          </Text>
        </View>
      )}

      {/* SIN ACTIVIDADES */}
      {!loading && actividades.length === 0 && (
        <Text className="text-body-sm text-textSecondary text-center font-regular mt-4">
          No hay actividad reciente
        </Text>
      )}

      {/* LISTA */}
      {!loading &&
        actividades.map((act, index) => (
          <TouchableOpacity
            key={act.id || index}
            activeOpacity={0.85}
            className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-graySoft flex-row items-center justify-between"
          >
            {/* Información */}
            <View className="flex-1 pr-3">
              <Text className="text-body font-medium text-textPrimary leading-tight">
                {index + 1}. Pedido de {act.cliente} ({act.estado})
              </Text>

              <Text className="text-body-sm font-regular text-grayDark mt-1">
                {act.observaciones || "Sin observaciones"} • ${act.total}
              </Text>
            </View>

            {/* Fecha */}
            <View className="items-end">
              <View className="bg-blue-50 p-2 rounded-xl">
                <Ionicons name="time-outline" size={18} color="#2563EB" />
              </View>

              <Text className="text-[10px] text-grayDark font-regular mt-1">
                {new Date(act.fecha).toLocaleDateString("es-MX")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default ActividadReciente;

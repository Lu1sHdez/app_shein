import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "../../../constants/config";

const ActividadReciente = () => {
  const [actividades, setActividades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchActividades = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/app/pedidos/actividades`);
      const ultimas = response.data.slice(0, 3);
      setActividades(ultimas);
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
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-gray-900">Actividad reciente</Text>
        <TouchableOpacity>
          <Text className="text-blue-600 font-medium text-sm">Ver todo</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="items-center py-3">
          <ActivityIndicator size="small" color="#2563EB" />
          <Text className="text-gray-500 text-sm mt-1">Cargando...</Text>
        </View>
      ) : actividades.length === 0 ? (
        <View className="bg-gray-50 rounded-xl p-4 items-center">
          <Text className="text-gray-500 text-sm">No hay actividad reciente</Text>
        </View>
      ) : (
        <View className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
          {actividades.map((act, index) => (
            <TouchableOpacity 
              key={act.id || index} 
              className="flex-row items-center py-2 border-b border-gray-100 last:border-b-0"
            >
              {/* Indicador numérico */}
              <View className="w-6 h-6 rounded-full bg-blue-100 items-center justify-center mr-3">
                <Text className="text-blue-600 font-bold text-xs">{index + 1}</Text>
              </View>
              
              {/* Información principal */}
              <View className="flex-1">
                <Text className="text-gray-900 font-medium text-sm">
                  {act.cliente}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-gray-500 text-xs flex-1">
                    {act.observaciones || "Sin observaciones"}
                  </Text>
                  <Text className="text-gray-900 font-bold text-xs">
                    ${act.total}
                  </Text>
                </View>
              </View>
              
              {/* Estado y fecha */}
              <View className="items-end ml-2">
                <View className="px-2 py-1 bg-green-100 rounded-full mb-1">
                  <Text className="text-green-800 text-xs font-medium">
                    {act.estado}
                  </Text>
                </View>
                <Text className="text-gray-400 text-xs">
                  {new Date(act.fecha).toLocaleDateString("es-MX")}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default ActividadReciente;
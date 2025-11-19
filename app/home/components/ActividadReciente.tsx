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

  // Función para obtener el color del estado
  const getEstadoColor = (estado: string) => {
    const estados: { [key: string]: string } = {
      "completado": "bg-green-100 text-green-800",
      "pendiente": "bg-yellow-100 text-yellow-800",
      "entregado": "bg-blue-100 text-blue-800",
      "cancelado": "bg-red-100 text-red-800",
      "procesando": "bg-purple-100 text-purple-800"
    };
    return estados[estado?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  // Función para obtener el icono del estado
  const getEstadoIcon = (estado: string) => {
    const iconos: { [key: string]: keyof typeof Ionicons.glyphMap } = {
      "completado": "checkmark-circle",
      "pendiente": "time",
      "entregado": "cube",
      "cancelado": "close-circle",
      "procesando": "sync"
    };
    return iconos[estado?.toLowerCase()] || "document-text";
  };

  return (
    <View className="mb-8">
      {/* Header con icono */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center mr-3">
            <Ionicons name="time" size={18} color="#2563EB" />
          </View>
          <Text className="text-xl font-bold text-gray-900">Actividad reciente</Text>
        </View>
        <TouchableOpacity className="flex-row items-center active:opacity-70">
          <Text className="text-blue-600 font-medium text-sm mr-1">Ver todo</Text>
          <Ionicons name="chevron-forward" size={16} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="bg-white rounded-2xl p-6 items-center justify-center border border-gray-200">
          <ActivityIndicator size="small" color="#2563EB" />
          <Text className="text-gray-500 text-sm mt-3">Cargando actividades...</Text>
        </View>
      ) : actividades.length === 0 ? (
        <View className="bg-gray-50 rounded-2xl p-8 items-center justify-center border border-gray-200">
          <Ionicons name="document-text-outline" size={48} color="#9CA3AF" />
          <Text className="text-gray-500 text-base mt-3 text-center">
            No hay actividad reciente
          </Text>
          <Text className="text-gray-400 text-sm mt-1 text-center">
            Los pedidos recientes aparecerán aquí
          </Text>
        </View>
      ) : (
        <View className="bg-white rounded-2xl p-1 border border-gray-200 shadow-sm">
          {actividades.map((act, index) => (
            <TouchableOpacity 
              key={act.id || index} 
              className="flex-row items-center p-4 border-b border-gray-100 last:border-b-0 active:bg-gray-50"
            >
              {/* Indicador numérico con gradiente */}
              <View className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 items-center justify-center mr-3">
                <Text className="text-white font-bold text-xs">{index + 1}</Text>
              </View>
              
              {/* Información principal */}
              <View className="flex-1">
                <View className="flex-row items-center flex-wrap">
                  <Text className="text-gray-900 font-semibold text-base mr-2">
                    {act.cliente}
                  </Text>
                  <View className={`px-2 py-1 rounded-full flex-row items-center ${getEstadoColor(act.estado)}`}>
                    <Ionicons 
                      name={getEstadoIcon(act.estado)} 
                      size={12} 
                      color={getEstadoColor(act.estado).includes('green') ? '#059669' : 
                             getEstadoColor(act.estado).includes('yellow') ? '#D97706' :
                             getEstadoColor(act.estado).includes('blue') ? '#2563EB' :
                             getEstadoColor(act.estado).includes('red') ? '#DC2626' :
                             getEstadoColor(act.estado).includes('purple') ? '#7C3AED' : '#6B7280'} 
                      style={{ marginRight: 4 }}
                    />
                    <Text className="text-xs font-medium capitalize">
                      {act.estado}
                    </Text>
                  </View>
                </View>
                
                <Text className="text-gray-500 text-sm mt-1 leading-5">
                  {act.observaciones || "Sin observaciones específicas"}
                </Text>
                
                <View className="flex-row items-center mt-2">
                  <View className="flex-row items-center bg-gray-100 rounded-lg px-2 py-1">
                    <Ionicons name="pricetag" size={12} color="#6B7280" />
                    <Text className="text-gray-700 font-semibold text-sm ml-1">
                      ${parseFloat(act.total).toLocaleString('es-MX')}
                    </Text>
                  </View>
                </View>
              </View>
              
              {/* Fecha y tiempo */}
              <View className="items-end">
                <Text className="text-gray-400 text-xs font-medium mb-1">
                  {new Date(act.fecha).toLocaleDateString("es-MX", {
                    day: 'numeric',
                    month: 'short'
                  })}
                </Text>
                <Text className="text-gray-400 text-xs">
                  {new Date(act.fecha).toLocaleTimeString("es-MX", {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Footer informativo */}
      {!loading && actividades.length > 0 && (
        <View className="flex-row items-center justify-center mt-4">
          <Ionicons name="information-circle" size={16} color="#6B7280" />
          <Text className="text-gray-500 text-xs ml-1">
            Mostrando {actividades.length} actividades recientes
          </Text>
        </View>
      )}
    </View>
  );
};

export default ActividadReciente;
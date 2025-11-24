import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "../../../constants/config";
import HeaderGlobal from "../../../components/HeaderGlobal";
import Layout from "../../../components/Layout";
const TodasLasActividades = () => {
  const [actividades, setActividades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActividades = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/app/pedidos/actividades`);
      setActividades(res.data);
    } catch (e: any) {
      console.log("Error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActividades();
  }, []);

  return (
    <Layout>
    <View className="flex-1 bg-white">
      <HeaderGlobal titulo="Todas las actividades" subtitulo="Historial reciente" />

      <ScrollView className="flex-1 bg-grayLight px-4 py-4">
        {/* LOADING */}
        {loading && (
          <View className="items-center mt-20">
            <ActivityIndicator size="large" color="#2563EB" />
            <Text className="mt-3 font-regular text-body-sm text-textSecondary">
              Cargando actividades...
            </Text>
          </View>
        )}

        {/* SIN ACTIVIDADES */}
        {!loading && actividades.length === 0 && (
          <View className="items-center mt-16">
            <Ionicons name="time-outline" size={48} color="#9CA3AF" />
            <Text className="text-body font-medium text-textSecondary mt-4">
              No hay actividades registradas
            </Text>
          </View>
        )}

        {/* LISTA COMPLETA */}
        {!loading &&
          actividades.map((act: any, index: number) => (
            <View
              key={act.id || index}
              className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-graySoft flex-row justify-between"
            >
              {/* INFO */}
              <View className="flex-1 pr-3">
                <Text className="text-body font-medium text-textPrimary">
                  Pedido de {act.cliente} ({act.estado})
                </Text>
                <Text className="text-body-sm font-regular text-grayDark mt-1">
                  {act.observaciones || "Sin observaciones"} • ${act.total}
                </Text>
              </View>

              {/* FECHA */}
              <View className="items-center">
                <View className="bg-primary/10 p-2 rounded-xl">
                  <Ionicons name="time-outline" size={18} color="#2563EB" />
                </View>
                <Text className="text-[10px] font-regular text-grayDark mt-1">
                  {new Date(act.fecha).toLocaleDateString("es-MX")}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
    </Layout>
  );
};

export default TodasLasActividades;

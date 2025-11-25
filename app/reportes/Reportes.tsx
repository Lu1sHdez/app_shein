import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../components/Layout";
import HeaderGlobal from "../../components/HeaderGlobal";
import axios from "axios";
import { API_URL } from "../../constants/config";

const Reportes = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/app/reporte/general`);
        setData(res.data);
      } catch (error: any) {
        console.log("Error al obtener reportes:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Estado de carga
  if (loading) {
    return (
      <Layout>
        <HeaderGlobal 
          titulo="Reportes"
          subtitulo="Información general del sistema"
        />

        <View className="flex-1 items-center justify-center bg-white py-12">
          <ActivityIndicator size="large" color="#2563EB" />
          <Text className="text-gray-600 font-semibold mt-4 text-center">
            Cargando reportes...
          </Text>
        </View>
      </Layout>
    );
  }

  // Estado sin datos
  if (!data) {
    return (
      <Layout>
        <HeaderGlobal 
          titulo="Reportes"
          subtitulo="Información general del sistema"
        />
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 font-semibold">No hay datos disponibles.</Text>
        </View>
      </Layout>
    );
  }

  // Contenido cargado
  return (
    <Layout>
      <HeaderGlobal 
        titulo="Reportes"
        subtitulo="Información general del sistema"
      />

      <ScrollView 
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* CARD: Ventas Totales */}
        <View className="bg-white rounded-2xl p-6 mx-4 mt-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="bg-blue-50 p-2 rounded-xl">
                <Ionicons name="cash-outline" size={24} color="#2563EB" />
              </View>
              <Text className="text-h3 font-semibold text-gray-900 ml-3">
                Ventas Totales
              </Text>
            </View>
            <Text className="text-h2 font-bold text-blue-600">
              ${data.totalVentas}
            </Text>
          </View>
          <Text className="text-body-sm text-gray-500 font-regular">
            {data.crecimientoMensual} respecto al mes anterior
          </Text>
        </View>

        {/* CARD: Ganancias */}
        <View className="bg-white rounded-2xl p-6 mx-4 mt-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="bg-green-50 p-2 rounded-xl">
                <Ionicons name="trending-up-outline" size={24} color="#16A34A" />
              </View>
              <Text className="text-h3 font-semibold text-gray-900 ml-3">
                Ganancia Neta
              </Text>
            </View>
            <Text className="text-h2 font-bold text-green-600">
              ${data.totalGanancia}
            </Text>
          </View>
          <Text className="text-body-sm text-gray-500 font-regular">
            Ticket promedio: ${data.ticketPromedio}
          </Text>
        </View>

        {/* CARD: Pedidos */}
        <View className="bg-white rounded-2xl p-6 mx-4 mt-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-50 p-2 rounded-xl">
              <Ionicons name="bag-check-outline" size={24} color="#2563EB" />
            </View>
            <Text className="text-h3 font-semibold text-gray-900 ml-3">
              Pedidos
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-body text-gray-600 font-regular">Entregados</Text>
              <Text className="text-h3 font-semibold text-gray-900 mt-1">
                {data.entregados}
              </Text>
            </View>
            <View className="h-8 w-px bg-gray-200" />
            <View>
              <Text className="text-body text-gray-600 font-regular">En proceso</Text>
              <Text className="text-h3 font-semibold text-gray-900 mt-1">
                {data.enProceso}
              </Text>
            </View>
          </View>
        </View>

        {/* CARD: Clientes */}
        <View className="bg-white rounded-2xl p-6 mx-4 mt-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-50 p-2 rounded-xl">
              <Ionicons name="people-outline" size={24} color="#2563EB" />
            </View>
            <Text className="text-h3 font-semibold text-gray-900 ml-3">
              Clientes
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-body text-gray-600 font-regular">Totales</Text>
              <Text className="text-h3 font-semibold text-gray-900 mt-1">
                {data.clientesTotales}
              </Text>
            </View>
            <View className="h-8 w-px bg-gray-200" />
            <View>
              <Text className="text-body text-gray-600 font-regular">Nuevos este mes</Text>
              <Text className="text-h3 font-semibold text-gray-900 mt-1">
                {data.clientesNuevos}
              </Text>
            </View>
          </View>
        </View>

        {/* CARD: Top Productos */}
        <View className="bg-white rounded-2xl p-6 mx-4 mt-4 mb-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-4">
            <View className="bg-amber-50 p-2 rounded-xl">
              <Ionicons name="trophy-outline" size={24} color="#F59E0B" />
            </View>
            <Text className="text-h3 font-semibold text-gray-900 ml-3">
              Top productos más vendidos
            </Text>
          </View>

          <View className="space-y-3">
            {data.topProductos.map((p: any, i: number) => (
              <View 
                key={i} 
                className="flex-row justify-between items-center bg-gray-50 rounded-lg p-3"
              >
                <View className="flex-row items-center">
                  <View className="bg-white w-6 h-6 rounded-full items-center justify-center mr-3">
                    <Text className="text-body-sm font-semibold text-gray-700">
                      {i + 1}
                    </Text>
                  </View>
                  <Text className="text-body font-regular text-gray-800">{p.nombre}</Text>
                </View>
                <View className="bg-amber-100 px-2 py-1 rounded-full">
                  <Text className="text-body-sm font-semibold text-amber-800">
                    {p.ventas} ventas
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </Layout>
  );
};

export default Reportes;

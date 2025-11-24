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

  return (
    <Layout>
      <HeaderGlobal 
        titulo="Reportes"
        subtitulo="Información general del sistema"
      />

      <ScrollView 
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
      >

        {/* 🔹 CARD: Ventas Totales */}
        <View className="bg-white rounded-2xl p-5 mx-4 mt-4 shadow-sm border border-gray-200">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Ionicons name="cash-outline" size={28} color="#2563EB" />
              <Text className="text-lg font-semibold text-gray-900 ml-2">
                Ventas Totales
              </Text>
            </View>
            <Text className="text-xl font-bold text-blue-600">
              ${data.totalVentas}
            </Text>
          </View>

          <Text className="text-gray-500 text-sm">
            {data.crecimientoMensual} respecto al mes anterior
          </Text>
        </View>

        {/* 🔹 CARD: Ganancias */}
        <View className="bg-white rounded-2xl p-5 mx-4 mt-4 shadow-sm border border-gray-200">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Ionicons name="trending-up-outline" size={28} color="#16A34A" />
              <Text className="text-lg font-semibold text-gray-900 ml-2">
                Ganancia Neta
              </Text>
            </View>

            <Text className="text-xl font-bold text-green-600">
              ${data.totalGanancia}
            </Text>
          </View>

          <Text className="text-gray-500 text-sm">
            Ticket promedio: ${data.ticketPromedio}
          </Text>
        </View>

        {/* 🔹 CARD: Pedidos */}
        <View className="bg-white rounded-2xl p-5 mx-4 mt-4 shadow-sm border border-gray-200">
          <View className="flex-row items-center mb-2">
            <Ionicons name="bag-check-outline" size={28} color="#2563EB" />
            <Text className="text-lg font-semibold text-gray-900 ml-2">
              Pedidos
            </Text>
          </View>

          <Text className="text-gray-700 font-medium">
            Entregados: {data.entregados}
          </Text>
          <Text className="text-gray-700 font-medium">
            En proceso: {data.enProceso}
          </Text>
        </View>

        {/* 🔹 CARD: Clientes */}
        <View className="bg-white rounded-2xl p-5 mx-4 mt-4 shadow-sm border border-gray-200">
          <View className="flex-row items-center mb-2">
            <Ionicons name="people-outline" size={28} color="#2563EB" />
            <Text className="text-lg font-semibold text-gray-900 ml-2">
              Clientes
            </Text>
          </View>

          <Text className="text-gray-700 font-medium">
            Totales: {data.clientesTotales}
          </Text>
          <Text className="text-gray-700 font-medium">
            Nuevos este mes: {data.clientesNuevos}
          </Text>
        </View>

        {/* 🔹 CARD: Top Productos */}
        <View className="bg-white rounded-2xl p-5 mx-4 mt-4 mb-8 shadow-sm border border-gray-200">
          <View className="flex-row items-center mb-2">
            <Ionicons name="trophy-outline" size={28} color="#F59E0B" />
            <Text className="text-lg font-semibold text-gray-900 ml-2">
              Top productos más vendidos
            </Text>
          </View>

          {data.topProductos.map((p: any, i: number) => (
            <View key={i} className="flex-row justify-between mt-2">
              <Text className="text-gray-700">{p.nombre}</Text>
              <Text className="text-gray-900 font-semibold">{p.ventas} ventas</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </Layout>
  );
};

export default Reportes;

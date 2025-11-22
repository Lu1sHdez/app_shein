import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../components/Layout";
import axios from "axios";
import { API_URL } from "../../constants/config";
import GraficasCirculares from "./components/GraficasCirculares";

type FiltroPeriodo = "dia" | "semana" | "mes" | "general";

const Ventas = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<FiltroPeriodo>("general");

  const cargarDatos = async (periodo: FiltroPeriodo) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/api/app/reporte/ventas?periodo=${periodo}`
      );
      setData(res.data);
    } catch (error: any) {
      console.log("Error al obtener ventas:", error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos(filtro);
  }, [filtro]);

  if (loading) {
    return (
      <Layout>
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center px-6 py-5 bg-white border-b border-gray-100">
            <View className="flex-1">
              <Text className="text-2xl text-center font-medium text-gray-900">Ventas</Text>
              <Text className="text-gray-500 text-center text-sm mt-1">
                Reportes y estadísticas
              </Text>
            </View>
          </View>
          <View className="flex-1 items-center justify-center py-12">
            <ActivityIndicator size="large" color="#2563EB" />
            <Text className="text-gray-600 font-medium mt-4 text-center">
              Cargando información de ventas...
            </Text>
          </View>
        </View>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center px-6 py-5 bg-white border-b border-gray-100">
            <View className="flex-1">
              <Text className="text-2xl text-center font-medium text-gray-900">Ventas</Text>
              <Text className="text-gray-500 text-center text-sm mt-1">
                Reportes y estadísticas
              </Text>
            </View>
          </View>
          <View className="flex-1 items-center justify-center py-12">
            <Ionicons name="alert-circle-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 font-medium mt-4 text-center">
              No hay datos disponibles en este momento.
            </Text>
          </View>
        </View>
      </Layout>
    );
  }

  // Transformar ventasPorPeriodo del backend a un arreglo amigable
  const ventasPeriodo = data.ventasPorPeriodo
    ? Object.entries(data.ventasPorPeriodo).map(
        ([label, total]: [string, any]) => ({
          label,
          total: Number(total),
        })
      )
    : [];

  const totalVentasNumber = Number(data.totalVentas || 0);
  const totalGananciaNumber = Number(data.totalGanancia || 0);

  // Cambiar "Día" a "Hoy" en el filtro de periodo
  const labelPeriodo = (() => {
    switch (filtro) {
      case "dia":
        return "Hoy";
      case "semana":
        return "por semana";
      case "mes":
        return "por mes";
      default:
        return "general";
    }
  })();

  // Mostrar la fecha y hora completa para "Hoy"
  const mostrarFechaCompleta = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleString("es-MX", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric", 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const FiltroButton = ({ periodo, label }: { periodo: FiltroPeriodo; label: string }) => (
    <TouchableOpacity
      onPress={() => setFiltro(periodo)}
      className={`
        flex-1 mx-1 py-3 rounded-xl border-2 items-center justify-center
        ${filtro === periodo 
          ? 'border-primary bg-primary' 
          : 'border-gray-300 bg-white'
        }
      `}
    >
      <Text className={`
        font-medium text-sm
        ${filtro === periodo ? 'text-white' : 'text-gray-600'}
      `}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center px-6 py-5 bg-white border-b border-gray-100">
          <View className="flex-1">
            <Text className="text-2xl text-center font-medium text-gray-900">Ventas</Text>
            <Text className="text-gray-500 text-center text-sm mt-1">
              Reportes y estadísticas
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
          {/* === RESUMEN GENERAL === */}
          <View className="bg-white rounded-2xl p-5 mx-4 mt-4 shadow-sm border border-gray-200">
            {/* Header */}
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 rounded-xl bg-blue-100 items-center justify-center mr-3">
                <Ionicons name="stats-chart" size={24} color="#2563EB" />
              </View>
              <View>
                <Text className="text-xl font-medium text-gray-900">Resumen General</Text>
                <Text className="text-gray-500 text-sm">Reporte de ventas</Text>
              </View>
            </View>

            {/* Métricas */}
            <View className="space-y-3">
              <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                <Text className="text-gray-600 font-medium">Tipo de reporte</Text>
                <View className="bg-primary/10 px-3 py-1 rounded-full">
                  <Text className="text-primary font-medium text-sm uppercase">
                    {data.tipoReporte || "GENERAL"}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                <Text className="text-gray-600 font-medium">Total vendido</Text>
                <Text className="text-primary text-lg font-medium">
                  ${data.totalVentas}
                </Text>
              </View>

              <View className="flex-row justify-between items-center py-2">
                <Text className="text-gray-600 font-medium">Ganancia neta</Text>
                <Text className="text-green-600 text-lg font-medium">
                  ${data.totalGanancia}
                </Text>
              </View>
            </View>
          </View>

          {/* === FILTROS DE PERIODO === */}
          <View className="mx-4 mt-6 mb-4">
            <Text className="text-gray-900 font-bold text-lg mb-3">Filtrar por período</Text>
            <View className="flex-row justify-between space-x-2">
              <FiltroButton periodo="dia" label="Hoy" />
              <FiltroButton periodo="semana" label="Semana" />
              <FiltroButton periodo="mes" label="Mes" />
              <FiltroButton periodo="general" label="General" />
            </View>
          </View>

          {/* === GRAFICAS CIRCULARES === */}
          <GraficasCirculares
            ventasPeriodo={ventasPeriodo}
            totalVentas={totalVentasNumber}
            totalGanancia={totalGananciaNumber}
            etiquetaPeriodo={labelPeriodo}
          />

          {/* === FECHA COMPLETA PARA HOY === */}
          {filtro === "dia" && (
            <View className="mx-4 mt-4 mb-6">
              <View className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={16} color="#2563EB" />
                  <Text className="text-blue-800 font-medium ml-2 text-sm">
                    {mostrarFechaCompleta(new Date().toString())}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* === INFORMACIÓN ADICIONAL === */}
          <View className="mx-4 mt-4 mb-8">
            <View className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="information-circle-outline" size={18} color="#6B7280" />
                  <Text className="text-gray-700 font-medium ml-2 text-sm">
                    Resumen del período
                  </Text>
                </View>
                <Text className="text-gray-900 font-bold">
                  {ventasPeriodo.length} registros
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default Ventas;
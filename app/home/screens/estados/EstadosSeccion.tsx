import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/navigation";
import { usePedidos, ResumenPedido } from "../../../context/PedidosContext";

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const Estados: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const { resumenData, loading } = usePedidos();

  if (loading) {
    return (
      <View className="py-8 items-center justify-center">
        <ActivityIndicator size="large" color="#6366F1" />
        <Text className="mt-3 text-gray-600 font-medium">Cargando resumen...</Text>
      </View>
    );
  }

  // Función segura para calcular el total
  const calcularTotal = () => {
    return resumenData.reduce((total, item) => {
      const value = parseInt(item.value?.toString() || '0');
      return total + (isNaN(value) ? 0 : value);
    }, 0);
  };

  // Función segura para calcular el porcentaje de la barra de progreso
  const calcularPorcentaje = (value: string | number) => {
    const numValue = parseInt(value?.toString() || '0');
    return Math.min(100, (isNaN(numValue) ? 0 : numValue / 50) * 100);
  };

  const EstadoCard = ({ item, index }: { item: ResumenPedido; index: number }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-[48%] mb-4"
      onPress={() => {
        const screens: any = {
          "Por hacer": "PorHacer",
          "Realizados": "Realizados",
          "Por entregar": "PorEntregar",
          "Entregados": "Entregados",
        };
        navigation.navigate("EstadoPedidos", {
          screen: screens[item.title],
        });
      }}
    >
      <View 
        className="bg-white rounded-2xl p-5 border-l-4 shadow-sm"
        style={{ borderLeftColor: item.color }}
      >
        {/* Header con icono */}
        <View className="flex-row items-center justify-between mb-3">
          <View 
            className="w-12 h-12 rounded-2xl items-center justify-center"
            style={{ backgroundColor: item.color + '20' }}
          >
            <Ionicons name={item.icon as any} size={24} color={item.color} />
          </View>
          
          {/* Indicador de estado */}
          <View 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
        </View>

        {/* Contenido */}
        <View className="space-y-1">
          <Text className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            {item.title}
          </Text>
          
          <Text className="text-h1 font-medium text-black">
            {item.value}
          </Text>
          
          <Text className="text-gray-400 text-xs font-medium">
            {item.subtitle}
          </Text>
        </View>

        {/* Barra de progreso sutil */}
        <View className="mt-3 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <View 
            className="h-full rounded-full"
            style={{ 
              backgroundColor: item.color,
              width: `${calcularPorcentaje(item.value)}%` 
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mb-8">
      {/* Header de la sección */}
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="text-2xl font-medium text-gray-900">
            Resumen de pedidos
          </Text>
          <Text className="text-gray-500 font-regular text-base mt-1">
            Estado actual de tus pedidos
          </Text>
        </View>
      </View>

      {/* Grid de tarjetas */}
      <View className="flex-row flex-wrap justify-between">
        {resumenData.map((item: ResumenPedido, index: number) => (
          <EstadoCard key={index} item={item} index={index} />
        ))}
      </View>

      {/* Stats resumen */}
      <View className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name="stats-chart" size={20} color="#6366F1" />
            <Text className="text-gray-700 font-medium ml-2">
              Resumen total
            </Text>
          </View>
          <Text className="text-gray-900 font-bold text-lg">
            {calcularTotal()} pedidos
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Estados;
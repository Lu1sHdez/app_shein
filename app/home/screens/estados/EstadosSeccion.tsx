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
  const { resumenData, loading, actualizarResumen } = usePedidos();

  if (loading) {
    return (
      <View className="py-6 items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const calcularTotal = () =>
    resumenData.reduce((total, item) => total + Number(item.value || 0), 0);

  const calcularPorcentaje = (value: string | number) => {
    const n = parseInt(value?.toString() || "0");
    return Math.min(100, (isNaN(n) ? 0 : n / 50) * 100);
  };

  const EstadoCard = ({ item }: { item: ResumenPedido }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-[48%] mb-3"
      onPress={() => {
        const screenMap: any = {
          "Por hacer": "PorHacer",
          "Realizados": "Realizados",
          "Por entregar": "PorEntregar",
          "Entregados": "Entregados",
        };
        navigation.navigate("EstadoPedidos", { screen: screenMap[item.title] });
      }}
    >
      <View
        className="bg-white rounded-xl p-4 border-l-4 shadow-sm"
        style={{ borderLeftColor: item.color }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-2">
          <View
            className="w-10 h-10 rounded-xl items-center justify-center"
            style={{ backgroundColor: item.color + "22" }}
          >
            <Ionicons name={item.icon as any} size={20} color={item.color} />
          </View>

          <View
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
        </View>

        {/* Títulos más compactos */}
        <Text className="text-gray-500 text-[11px] font-medium uppercase tracking-wide">
          {item.title}
        </Text>

        <Text className="text-h2 font-semibold text-black leading-none mt-1">
          {item.value}
        </Text>

        <Text className="text-gray-400 text-[11px] font-regular mt-0.5">
          {item.subtitle}
        </Text>

        {/* Barra de progreso compacta */}
        <View className="mt-2 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <View
            className="h-full rounded-full"
            style={{
              backgroundColor: item.color,
              width: `${calcularPorcentaje(item.value)}%`,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mb-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-h3 font-semibold text-gray-900 leading-tight">
            Resumen de pedidos
          </Text>
          <Text className="text-gray-500 text-body-sm font-regular">
            Estado actual de tus pedidos
          </Text>
        </View>

        <TouchableOpacity
          onPress={actualizarResumen}
          className="p-2 bg-gray-100 rounded-xl"
        >
          <Ionicons name="reload-outline" size={26} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Tarjetas */}
      <View className="flex-row flex-wrap justify-between">
        {resumenData.map((item, index) => (
          <EstadoCard key={index} item={item} />
        ))}
      </View>

      {/* Resumen total más compacto */}
      <View className="mt-4 bg-indigo-50 rounded-xl p-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="document-text-outline" size={22} color="#2563EB" />
            <Text className="text-gray-700 font-medium ml-2 text-body-sm">
              Total
            </Text>
          </View>

          <Text className="text-gray-900 font-semibold text-body">
            {calcularTotal()} pedidos
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Estados;

import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "../../../components/Text";
import axios from "axios";
import { API_URL } from "../../../constants/config";
import { useNavigation } from "@react-navigation/native";

export default function Estados() {
  const navigation = useNavigation<any>();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Config visual para tarjetas
  const estadosConfig: any = {
    "Por hacer": {
      color: "#2563EB",
      bg: "#D4E3FC",
      icon: "list-outline",
      subtitle: "Pendientes hoy",
    },
    Realizados: {
      color: "#0EA5E9",
      bg: "#CCF0FF",
      icon: "checkmark-circle-outline",
      subtitle: "Completados",
    },
    "Por entregar": {
      color: "#EF4444",
      bg: "#FFE1E1",
      icon: "car-outline",
      subtitle: "Por entregar",
    },
    Entregados: {
      color: "#16A34A",
      bg: "#D8F5DD",
      icon: "clipboard-outline",
      subtitle: "Historial",
    },
  };

  // Cargar datos
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/app/pedidos/resumen`);
        setData(res.data.resumen || []);
      } catch (err) {
        console.log("Error cargando resumen:", err);
      }
      setLoading(false);
    };

    cargar();
  }, []);

  if (loading) {
    return (
      <View className="flex items-center justify-center py-12">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-gray-500 mt-2">Cargando...</Text>
      </View>
    );
  }

  return (
    <View className="mt-8">
      <Text className="text-2xl font-bold text-textPrimary mb-4">
        Resumen de pedidos
      </Text>

      {/* GRID */}
      <View className="flex flex-row flex-wrap justify-between">
        {data.map((item, index) => {
          if (item.title === "Parcial") return null;
          const cfg = estadosConfig[item.title];

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              className="w-[48%] rounded-2xl p-5 mb-4 bg-white border border-slate-200 shadow-md"
              style={{
                shadowColor: cfg.color,
                shadowOpacity: 0.12,
                shadowRadius: 6,
                elevation: 4,
              }}
              onPress={() =>
                navigation.navigate("EstadoPedidos", {
                  screen:
                    item.title === "Por hacer"
                      ? "PorHacer"
                      : item.title === "Realizados"
                      ? "Realizados"
                      : item.title === "Por entregar"
                      ? "PorEntregar"
                      : "Entregados",
                })
              }
            >
              {/* HEADER */}
              <View className="pb-3 mb-3 border-b border-gray-200">
                <Text className="text-sm font-bold text-slate-500 uppercase">
                  {cfg.subtitle}
                </Text>
                <Text className="text-xl font-bold text-textPrimary mt-1">
                  {item.title}
                </Text>
              </View>

              {/* ICONO + LABEL */}
              <View className="flex-row items-center gap-2 mb-4">
                <View
                  className="p-3 rounded-full border border-slate-200"
                  style={{ backgroundColor: cfg.bg }}
                >
                  <Ionicons name={cfg.icon} size={22} color={cfg.color} />
                </View>

                <Text className="text-slate-500 text-base">
                  Total de pedidos
                </Text>
              </View>

              {/* VALOR */}
              <Text
                className="text-6xl font-extrabold text-center"
                style={{ color: cfg.color }}
              >
                {item.value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

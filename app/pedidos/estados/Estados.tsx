import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Layout from "../../../components/Layout";
import { estadoTabs as styles } from "./styles/tabs";
import PorHacer from "./PorHacer";
import Realizados from "./Realizados";
import PorEntregar from "./PorEntregar";
import Entregados from "./Entregado";
import { useRoute } from "@react-navigation/native";

const Estados = () => {
  const route = useRoute<any>();
  const initialTab = route.params?.screen || "PorHacer";

  const [estadoActivo, setEstadoActivo] = useState<
    "PorHacer" | "Realizados" | "PorEntregar" | "Entregados"
  >(initialTab);

  useEffect(() => {
    if (route.params?.screen) {
      setEstadoActivo(route.params.screen);
    }
  }, [route.params?.screen]);

  const renderContenido = () => {
    switch (estadoActivo) {
      case "PorHacer":
        return <PorHacer />;
      case "Realizados":
        return <Realizados />;
      case "PorEntregar":
        return <PorEntregar />;
      case "Entregados":
        return <Entregados />;
      default:
        return null;
    }
  };

  const tabs = [
    { key: "PorHacer", label: "Por hacer" },
    { key: "Realizados", label: "Realizados" },
    { key: "PorEntregar", label: "Por entregar" },
    { key: "Entregados", label: "Entregado" },
  ];

  return (
    <Layout>
      <View className="flex-1 bg-white">
        {/* Header personalizado */}
        <View className="flex-row items-center px-6 py-5 bg-white border-b border-gray-100">
          <View className="flex-1">
            <Text className="text-2xl text-center font-bold text-gray-900">Pedidos</Text>
            <Text className="text-gray-500 text-center text-sm mt-1">
              Gestión de estados de pedidos
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="bg-white border-b border-gray-200">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setEstadoActivo(tab.key as any)}
                className={`
                  px-4 py-3 mx-1 rounded-lg border-b-2 min-w-[100px] items-center
                  ${estadoActivo === tab.key 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-transparent'
                  }
                  active:opacity-70
                `}
              >
                <Text
                  className={`
                    text-sm font-medium
                    ${estadoActivo === tab.key 
                      ? 'text-blue-600' 
                      : 'text-gray-500'
                    }
                  `}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Contenido */}
        <View className="flex-1 bg-gray-50">
          {renderContenido()}
        </View>
      </View>
    </Layout>
  );
};

export default Estados;
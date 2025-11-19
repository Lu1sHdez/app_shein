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
  const initialTab =
    route.params?.screen || "PorHacer"; // ✅ recibe el parámetro del Dashboard

  const [estadoActivo, setEstadoActivo] = useState<
    "PorHacer" | "Realizados" | "PorEntregar" | "Entregados"
  >(initialTab);

  // ✅ Si cambia el parámetro (por ejemplo, vuelves a entrar desde otra card)
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
    <Layout title="Pedidos" showBack>
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setEstadoActivo(tab.key as any)}
              style={[
                styles.tab,
                estadoActivo === tab.key && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  estadoActivo === tab.key && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>{renderContenido()}</View>
    </Layout>
  );
};

export default Estados;

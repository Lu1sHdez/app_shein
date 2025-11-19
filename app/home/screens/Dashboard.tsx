import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/navigation";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Layout from "../../../components/Layout";
import { Ionicons } from "@expo/vector-icons";
import ActividadReciente from "../components/ActividadReciente";
import Estados from "./estados/EstadosSeccion";

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const Dashboard = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const toggleMoreOptions = () => {
    setShowMoreOptions((prevState) => !prevState);
  };

  const QuickAccessButton = ({ 
    onPress, 
    icon, 
    title, 
    variant = "secondary",
    small = false 
  }: {
    onPress: () => void;
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    variant?: "primary" | "secondary";
    small?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`
        flex-row items-center justify-center rounded-xl border-2
        ${small ? 'p-3 w-12' : 'p-4 flex-1 min-w-[120px]'}
        ${variant === 'primary' 
          ? 'border-blue-600 bg-blue-50' 
          : 'border-gray-300 bg-white'
        }
        active:opacity-80 shadow-sm
      `}
    >
      <Ionicons 
        name={icon} 
        size={20} 
        color={variant === 'primary' ? "#2563EB" : "#333"} 
      />
      {!small && (
        <Text 
          className={`
            ml-2 font-medium text-base
            ${variant === 'primary' ? 'text-blue-600' : 'text-gray-800'}
          `}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <Layout>
      <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
        {/* --- Encabezado --- */}
        <View className="flex-row items-center px-4 py-4 bg-white border-b border-gray-200">
          <TouchableOpacity 
            onPress={toggleDrawer}
            className="p-2 mr-3 active:opacity-70"
          >
            <Ionicons name="menu" size={28} color="#374151" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-800">Inicio</Text>
          </View>
        </View>

        {/* Contenido principal */}
        <View className="p-4">
          {/* Sección Estados */}
          <Estados />

          {/* Sección de accesos rápidos */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Accesos rápidos
            </Text>
            
            <View className="space-y-3">
              {/* Fila principal de botones */}
              <View className="flex-row gap-3">
                <QuickAccessButton
                  onPress={() => navigation.navigate("RegistrarPedido")}
                  icon="add-circle-outline"
                  title="Nuevo pedido"
                  variant="primary"
                />
                
                <QuickAccessButton
                  onPress={() => navigation.navigate("Ventas")}
                  icon="people-outline"
                  title="Ventas"
                  variant="secondary"
                />
                
                <QuickAccessButton
                  onPress={toggleMoreOptions}
                  icon="ellipsis-horizontal"
                  title=""
                  variant="secondary"
                  small
                />
              </View>

              {/* Botones adicionales con animación */}
              {showMoreOptions && (
                <View className="flex-row gap-3 animate-fade-in">
                  <QuickAccessButton
                    onPress={() => navigation.navigate("Clientes")}
                    icon="person-outline"
                    title="Clientes"
                    variant="secondary"
                  />
                  
                  <QuickAccessButton
                    onPress={() => navigation.navigate("Reportes")}
                    icon="document-text-outline"
                    title="Reportes"
                    variant="secondary"
                  />
                  
                  <QuickAccessButton
                    onPress={() => navigation.navigate("Perfil")}
                    icon="person-circle-outline"
                    title="Perfil"
                    variant="secondary"
                  />
                </View>
              )}
            </View>
          </View>

          {/* --- Actividad reciente --- */}
          <ActividadReciente />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Dashboard;
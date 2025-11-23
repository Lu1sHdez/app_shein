import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/navigation";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  useWindowDimensions,
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
  const fadeAnim = useState(new Animated.Value(0))[0];
  const { width } = useWindowDimensions();

  const toggleMoreOptions = () => {
    if (showMoreOptions) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowMoreOptions(false));
    } else {
      setShowMoreOptions(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const QuickAccessButton = ({
    onPress,
    icon,
    title,
    variant = "secondary",
    small = false,
  }: {
    onPress: () => void;
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    variant?: "primary" | "secondary";
    small?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-center rounded-xl border-2 ${
        small ? "p-3 w-12" : "p-4 flex-1 min-w-[120px]"
      } ${variant === "primary" ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"} active:opacity-80 shadow-sm`}
    >
      <Ionicons name={icon} size={20} color={variant === "primary" ? "#2563EB" : "#4B5563"} />
      {!small && (
        <Text className={`ml-2 font-semibold text-sm ${variant === "primary" ? "text-blue-600" : "text-gray-700"}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <Layout>
      <View className="flex-1 bg-white">
        {/* Header personalizado */}
        <View className="flex-row items-center justify-center px-6 py-5 bg-white border-b border-gray-100">
          <TouchableOpacity
            onPress={toggleDrawer}
            className="absolute left-6 p-2 bg-gray-100 rounded-xl active:bg-gray-200"
          >
            <Ionicons name="menu" size={40} color="#374151" />
          </TouchableOpacity>

          <View className="flex-1 items-center">
            <Text className="text-2xl font-medium text-gray-900">Inicio</Text>
            <Text className="text-gray-500 font-regular text-sm mt-1">Resumen general de tu actividad</Text>
          </View>
        </View>

        {/* Contenido con scroll */}
        <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
          <View className="p-6">
            {/* Sección Estados */}
            <Estados />

            {/* Sección de accesos rápidos */}
            <View className="mb-8">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-medium text-gray-900">Accesos rápidos</Text>
                <View className="w-2 h-2 bg-blue-500 rounded-full" />
              </View>

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
                    icon="bar-chart-outline"
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
                  <Animated.View style={{ opacity: fadeAnim }} className="flex-row gap-3">
                    <QuickAccessButton
                      onPress={() => navigation.navigate("Clientes")}
                      icon="people-outline"
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
                  </Animated.View>
                )}
              </View>
            </View>

            {/* Separador decorativo */}
            <View className="flex-row items-center justify-center mb-8">
              <View className="h-px bg-gray-200 flex-1" />
              <Ionicons name="sparkles" size={16} color="#9CA3AF" className="mx-3" />
              <View className="h-px bg-gray-200 flex-1" />
            </View>

            {/* Actividad reciente */}
            <ActividadReciente />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default Dashboard;

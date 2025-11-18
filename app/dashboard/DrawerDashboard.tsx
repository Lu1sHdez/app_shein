import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "../../components/Text";
import Dashboard from "./Dashboard";
import { API_URL } from "../../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const drawerWidth = width * 0.75;

export default function DrawerDashboard() {
  const navigation = useNavigation<any>();

  const [isOpen, setIsOpen] = useState(false);
  const animation = useState(new Animated.Value(-drawerWidth))[0];

  const toggleDrawer = () => {
    Animated.timing(animation, {
      toValue: isOpen ? -drawerWidth : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  // === FUNCIÓN REAL DE CERRAR SESIÓN ===
  const handleLogout = async () => {
    try {
      // Cerrar sesión en el backend (opcional)
      await axios.post(`${API_URL}/api/app/autenticacion/logout`);
    } catch (error) {
      console.log("Error al cerrar sesión en backend:", error);
    }

    // Eliminar token del dispositivo
    await AsyncStorage.removeItem("userToken");

    // Cerrar drawer antes de navegar
    toggleDrawer();

    // Redirigir al Inicio
    navigation.reset({
      index: 0,
      routes: [{ name: "Inicio" }],
    });
  };

  return (
    <View className="flex-1 bg-white">

      {/* Pantalla principal */}
      <Dashboard toggleDrawer={toggleDrawer} />

      {/* Fondo oscuro cuando está abierto */}
      {isOpen && (
        <TouchableWithoutFeedback onPress={toggleDrawer}>
          <View className="absolute inset-0 bg-black/40" />
        </TouchableWithoutFeedback>
      )}

      {/* MENÚ LATERAL */}
      <Animated.View
        style={{
          width: drawerWidth,
          transform: [{ translateX: animation }],
        }}
        className="absolute left-0 top-0 bottom-0 bg-white shadow-2xl p-6"
      >
        {/* BOTÓN CERRAR */}
        <TouchableOpacity
          onPress={toggleDrawer}
          className="mb-10 self-end p-1"
        >
          <Ionicons name="close" size={36} color="#333" />
        </TouchableOpacity>

        {/* AVATAR */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-gray-200" />
          <Text className="mt-3 font-semibold text-lg text-textPrimary">
            Usuario Admin
          </Text>
          <Text className="text-textSecondary text-sm">
            admin@correo.com
          </Text>
        </View>

        {/* OPCIONES DEL MENÚ */}
        <View className="mt-4">
          {[
            { label: "Inicio", icon: "home-outline" },
            { label: "Pedidos", icon: "bag-handle-outline" },
            { label: "Clientes", icon: "people-outline" },
            { label: "Ventas", icon: "cash-outline" },
            { label: "Reportes", icon: "bar-chart-outline" },
            { label: "Ajustes", icon: "settings-outline" },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              className="flex-row items-center gap-4 py-4 px-2 rounded-xl active:bg-gray-100"
            >
              <Ionicons name={item.icon as any} size={24} color="#333" />
              <Text className="text-lg text-textPrimary">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-gray-200 my-6" />

        {/* BOTÓN CERRAR SESIÓN REAL */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-4 py-3 px-2"
        >
          <Ionicons name="log-out-outline" size={24} color="#E31610" />
          <Text className="text-lg text-[#E31610]">Cerrar sesión</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

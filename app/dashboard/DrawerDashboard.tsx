import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "../../components/Text";
import Dashboard from "./Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../../constants/config";
import { useNavigation } from "@react-navigation/native";
import { obtenerPerfil } from "../perfil/Obtener";
import AccionesRapidas from "./components/AccionesRapidas";

const { width } = Dimensions.get("window");
const drawerWidth = width * 0.75;

export default function DrawerDashboard() {
  const navigation = useNavigation<any>();
  const [isOpen, setIsOpen] = useState(false);
  const animation = useState(new Animated.Value(-drawerWidth))[0];
  const [perfil, setPerfil] = useState<any | null>(null);
  const [active, setActive] = useState("Dashboard");

  useEffect(() => {
    const verificar = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      } else {
        cargarPerfil();
      }
    };
    verificar();
  }, []);

  const cargarPerfil = async () => {
    const data = await obtenerPerfil();
    setPerfil(data);
  };

  const toggleDrawer = () => {
    Animated.timing(animation, {
      toValue: isOpen ? -drawerWidth : 0,
      duration: 260,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/app/autenticacion/logout`);
    } catch (error) {
      console.log("Error cerrando sesión:", error);
    }

    await AsyncStorage.removeItem("userToken");
    toggleDrawer();

    navigation.reset({
      index: 0,
      routes: [{ name: "Dashboard" }],
    });
  };

  const menuItems = [
    { label: "Dashboard", icon: "home-outline" },
    { label: "Pedidos", icon: "bag-handle-outline" },
    { label: "Clientes", icon: "people-outline" },
    { label: "Ventas", icon: "cash-outline" },
    { label: "Reportes", icon: "bar-chart-outline" },
    { label: "Ajustes", icon: "settings-outline" },
  ];

  return (
    <View className="flex-1 bg-white">

      <Dashboard toggleDrawer={toggleDrawer} />
      <AccionesRapidas navigation={navigation}  /> 

      {isOpen && (
        <TouchableWithoutFeedback onPress={toggleDrawer}>
          <View className="absolute inset-0 bg-black/40" />
        </TouchableWithoutFeedback>
      )}

      <Animated.View
        style={{
          width: drawerWidth,
          transform: [{ translateX: animation }],
        }}
        className="absolute left-0 top-0 bottom-0 bg-white/95 backdrop-blur-xl shadow-2xl p-6 rounded-r-3xl"
      >
        {/* Cerrar */}
        <TouchableOpacity
          onPress={toggleDrawer}
          className="mb-6 self-end p-1"
        >
          <Ionicons name="close" size={36} color="#333" />
        </TouchableOpacity>

        {/* PERFIL */}
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
            navigation.navigate("Perfil");
          }}
          className="items-center mb-10"
        >
          <Image
            source={
              perfil?.foto_perfil
                ? { uri: perfil.foto_perfil }
                : require("../../assets/user.png")
            }
            className="w-24 h-24 rounded-full border-4 border-primary shadow-md"
          />

          {perfil ? (
            <>
              <Text className="mt-3 font-semibold text-xl text-textPrimary">
                {perfil.nombre} {perfil.apellido_paterno}
              </Text>
              <Text className="text-textSecondary text-sm">
                {perfil.correo}
              </Text>
              <View className="px-4 py-1 mt-2 bg-primary/10 rounded-full">
                <Text className="text-primary capitalize text-xs">{perfil.rol}</Text>
              </View>
            </>
          ) : (
            <>
              <ActivityIndicator size="small" color="#2563EB" />
            </>
          )}
        </TouchableOpacity>

        {/* MENU */}
        <View className="gap-2">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => {
                setActive(item.label);
                toggleDrawer();
                navigation.navigate(item.label);
              }}
              className={`flex-row items-center gap-4 py-3 px-3 rounded-xl 
                ${active === item.label ? "bg-primary/15" : "bg-transparent"}
              `}
            >
              <Ionicons
                name={item.icon as any}
                size={26}
                color={active === item.label ? "#2563EB" : "#444"}
              />
              <Text
                className={`text-lg ${
                  active === item.label ? "text-primary font-semibold" : "text-textPrimary"
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-gray-300 my-6" />

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-4 py-3 px-2 bg-red-50 rounded-xl active:bg-red-100"
        >
          <Ionicons name="log-out-outline" size={24} color="#E31610" />
          <Text className="text-lg text-[#E31610] font-medium">Cerrar sesión</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

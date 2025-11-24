import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/navigation";
import { obtenerPerfilAdmin } from "../../perfil/ObtenerPerfil";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Dashboard from "./Dashboard";
import { handleLogout } from "./logout/logout";

const { width } = Dimensions.get("window");
const drawerWidth = width * 0.72;

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, "Perfil">;

const DrawerDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(-drawerWidth));
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState("Inicio");
  const [perfil, setPerfil] = useState<any | null>(null);

  const navigation = useNavigation<DashboardScreenNavigationProp>();

  useEffect(() => {
    const cargarPerfil = async () => {
      const data = await obtenerPerfilAdmin();
      if (data) setPerfil(data);
    };
    cargarPerfil();
  }, []);

  const toggleDrawer = () => {
    Animated.timing(animation, {
      toValue: isOpen ? -drawerWidth : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: string) => {
    setActiveItem(item);
    toggleDrawer();

    switch (item) {
      case "Inicio":
        navigation.navigate("Dashboard");
        break;
      case "Pedidos":
        navigation.navigate("EstadoPedidos", { screen: "PorHacer" });
        break;
      case "Clientes":
        navigation.navigate("Clientes");
        break;
      case "Perfil":
        navigation.navigate("Perfil");
        break;
      case "Ventas":
        navigation.navigate("Ventas");
        break;
      case "Reportes":
        navigation.navigate("Reportes");
        break;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Dashboard toggleDrawer={toggleDrawer} />

      {isOpen && (
        <TouchableWithoutFeedback onPress={toggleDrawer}>
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 z-10" />
        </TouchableWithoutFeedback>
      )}

      <Animated.View
        style={[
          { width: drawerWidth,height: "100%", position: "absolute", top: 0, left: 0 },
          { transform: [{ translateX: animation }] },
        ]}
        className="bg-white shadow-lg z-20"
      >
        <View className="bg-gray-100 border-b border-gray-200 pt-10 pb-3 items-center">
          {/* Botón X flotante (no ocupa espacio) */}
          <TouchableOpacity
            onPress={toggleDrawer}
            className="absolute top-10 left-4 p-2 rounded-xl bg-gray-100 active:bg-gray-200 z-20"
          >
            <Ionicons name="close" size={40} color="#333" />
          </TouchableOpacity>

          {/* Imagen más arriba */}
          <TouchableOpacity
            onPress={() => {
              toggleDrawer();
              navigation.navigate("Perfil");
            }}
            className="mt-2"
          >
            <Image
              source={
                perfil && perfil.foto_perfil
                  ? { uri: perfil.foto_perfil }
                  : require("../../../assets/user.png")
              }
              className="w-28 h-28 rounded-full border-4 border-blue-500 bg-blue-100 shadow-lg"
              resizeMode="cover"
            />
          </TouchableOpacity>

          {perfil ? (
            <View className="items-center px-4 mt-3">
              <View className="bg-blue-100 px-4 py-1.5 rounded-full">
                <Text className="text-primary font-light text-body-sm tracking-wide">
                  {perfil.rol}
                </Text>
              </View>

              <Text className="text-2xl font-medium text-gray-900 mt-3 text-center">
                {(perfil.nombre && perfil.apellido_paterno)
                  ? `${perfil.nombre} ${perfil.apellido_paterno}`
                  : perfil.nombre_usuario}
              </Text>

              <Text className="text-body font-regular text-primary text-center">
                {perfil.correo}
              </Text>
            </View>
          ) : (
            <ActivityIndicator size="small" color="#6366F1" />
          )}
          </View>


        <ScrollView contentContainerStyle={{ paddingVertical: 5, paddingBottom: 150  }} className="p-8 font space-y-4">
          {[
            { name: "Inicio", icon: "home-outline", activeIcon: "home" },
            { name: "Pedidos", icon: "bag-handle-outline", activeIcon: "bag-handle" },
            { name: "Clientes", icon: "people-outline", activeIcon: "people" },
            { name: "Ventas", icon: "cube-outline", activeIcon: "cash" },
            { name: "Reportes", icon: "bar-chart-outline", activeIcon: "bar-chart" },
            { name: "Configuración", icon: "settings-outline", activeIcon: "settings" },
            { name: "Ayuda", icon: "help-circle-outline", activeIcon: "help-circle" },
          ].map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => handleSelect(item.name)}
              className={`flex-row  items-center py-4 px-3 gap-6 rounded-xl ${
                activeItem === item.name ? "bg-blue-100" : "bg-white"
              }`}
            >
              <Ionicons
                name={activeItem === item.name ? item.activeIcon : item.icon}
                size={25}
                color={activeItem === item.name ? "#2563EB" : "#4B5563"}
              />
              <Text
                className={`text-body font-regular ${
                  activeItem === item.name ? "text-blue-600 font-regular" : "text-gray-700"
                }`}
              >
                {item.name}
              </Text>

            </TouchableOpacity>
          ))}

          <View className="h-px bg-gray-200 my-4" />

          <TouchableOpacity
            onPress={async () => {
              setLoading(true);
              await handleLogout(navigation);
              setLoading(false);
            }}
            disabled={loading}
            className="flex-row items-center py-4 gap-6 rounded-lg"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#E61610" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={25} color="#E61610" />
                <Text className="text-body text-red-600 font-semibold">Cerrar sesión</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default DrawerDashboard;
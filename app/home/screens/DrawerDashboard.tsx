import React, { useState, useEffect  } from "react";
import { menuStyles, iconSize } from "../../../styles/menu.styles";
import { colors } from "../../../constants/theme";
import { StackNavigationProp } from "@react-navigation/stack";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Dashboard from "./Dashboard";
import { useNavigation } from "@react-navigation/native";
import { handleLogout } from "./logout/logout";
import { RootStackParamList } from "../../../types/navigation";


type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Perfil"
>;

const { width } = Dimensions.get("window");
const drawerWidth = width * 0.72;


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

    if (item === "Inicio") navigation.navigate("Dashboard");
    if (item === "Pedidos") navigation.navigate("EstadoPedidos", { screen: "PorHacer" });
    if (item === "Clientes") navigation.navigate("Clientes");
    if (item === "Perfil") navigation.navigate("Perfil");
    if (item === "Ventas") navigation.navigate("Ventas");
    if (item === "Reportes") navigation.navigate("Reportes");

  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Dashboard toggleDrawer={toggleDrawer} />

      {isOpen && (
        <TouchableWithoutFeedback onPress={toggleDrawer}>
          <View style={menuStyles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <Animated.View
        style={[
          menuStyles.drawerContainer,
          { transform: [{ translateX: animation }] },
        ]}
      >
        
        <View style={menuStyles.header}>
          <TouchableOpacity onPress={toggleDrawer} style={menuStyles.closeButton}>
            <Ionicons name="close" size={40} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              toggleDrawer();
              navigation.navigate("Perfil");
            }}
          >
            <Image
              source={
                perfil?.foto_perfil
                  ? { uri: perfil.foto_perfil }  // 🔥 foto real del admin
                  : require("../../../assets/user.png")  // 🔁 imagen por defecto
              }
              style={menuStyles.avatar}
              resizeMode="cover"
              onError={(e) => console.warn("Error cargando imagen:", e.nativeEvent.error)}
            />
          </TouchableOpacity>

          {perfil ? (
            <>
              <Text style={menuStyles.userRole}>{perfil.rol}</Text>
              <Text style={menuStyles.userName}>
                {perfil.nombre || perfil.nombre_usuario}
              </Text>
              <Text style={menuStyles.userEmail}>{perfil.correo}</Text>
            </>
          ) : (
            <>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={{ color: "#777", marginTop: 5 }}>Cargando perfil...</Text>
            </>
          )}
        </View>


        
        <View style={menuStyles.drawerContent}>
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
              style={[
                menuStyles.drawerItem,
                activeItem === item.name && menuStyles.activeItem,
              ]}
              onPress={() => handleSelect(item.name)}
            > 
              <Ionicons
                name={(activeItem === item.name ? item.activeIcon : item.icon) as any}
                size={iconSize}
                color={activeItem === item.name ? colors.primary : colors.grayDark}
              />
              <Text
                style={[
                  menuStyles.drawerText,
                  { color: activeItem === item.name ? colors.primary : "#333" },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={menuStyles.divider} />

          
          <TouchableOpacity
            style={menuStyles.drawerItem}
            onPress={async () => {
              setLoading(true);
              await handleLogout(navigation); 
              setLoading(false);
            }}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#E61610" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={iconSize} color="#E61610" />
                <Text style={[menuStyles.drawerText, { color: "#E61610" }]}>
                  Cerrar sesión
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default DrawerDashboard;

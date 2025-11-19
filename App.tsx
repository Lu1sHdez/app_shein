import "./global.css";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicio from "./app/bienvenido/Inicio";
import Login from "./app/auth/Login";
import NuevoPedido from "./app/pedidos/Pedidos";
import AuthLoading from "./app/auth/AuthLoading";
import Perfil from "./app/perfil/Perfil";
import DrawerDashboard from "./app/dashboard/DrawerDashboard";

import { usePoppinsFonts } from "./hooks/fuente";

const Stack = createNativeStackNavigator();

export default function App() {
  const fontsLoaded = usePoppinsFonts();

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AuthLoading"
          screenOptions={{ headerShown: false }}
        >
          {/* PRIMERO: verifica si hay sesión */}
          <Stack.Screen name="AuthLoading" component={AuthLoading} />

          {/* Si no hay sesión, estas pantallas estarán disponibles */}
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="NuevoPedido" component={NuevoPedido} />


          {/* Si hay sesión, se envía a Dashboard */}
          <Stack.Screen name="Dashboard" component={DrawerDashboard} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </>
  );
}

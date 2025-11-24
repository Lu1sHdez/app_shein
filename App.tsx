import "./global.css";
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Text } from 'react-native';
import fuente from './styles/fuente';
import Inicio from './app/inicio';
import Login from './app/auth/login';
import DrawerDashboard from './app/home/screens/DrawerDashboard';
import RegistrarPedido from './app/pedidos/RegistrarPedido';
import { AlertProvider } from './app/context/AlertContext';
import Estados from './app/pedidos/estados/Estados';
import Clientes from './app/clients/Clientes';
import Ventas from "./app/ventas/Ventas";
import Pedidos from "./app/pedidos/estados/Estados"
import {PedidosProvider } from "./app/context/PedidosContext"
import Reportes from "./app/reportes/Reportes"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodasLasActividades from "./app/home/components/TodasLasActividades";

import Perfil from './app/perfil/Perfil';

const Stack = createNativeStackNavigator();

// Componente de carga
function LoadingScreen() {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <ActivityIndicator size="large" color="#4F4F4F" />
      <Text className="font-regular mt-4 text-h3 text-gray-600">Verificando sesión...</Text>
    </View>
  );
}

export default function App() {
  const fontsLoaded = fuente();
  const [initialRoute, setInitialRoute] = useState<'Inicio' | 'Login' | 'Dashboard'>('Inicio');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');

        if (token) {
          console.log('Token detectado, se mantiene la sesión activa');
          setInitialRoute('Dashboard'); 
        } else {
          console.log('No hay token, ir al inicio');
          setInitialRoute('Inicio'); 
        }
      } catch (error) {
        console.error('Error al verificar la sesión:', error);
        setInitialRoute('Inicio');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Si las fuentes no están cargadas o estamos verificando la sesión, mostrar pantalla de carga
  if (!fontsLoaded || isLoading) {
    return <LoadingScreen />;
  }

  return (
    
    <PedidosProvider>
      <AlertProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            
            <Stack.Screen
              name="Inicio"
              component={Inicio}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false}}
            />

            <Stack.Screen
              name="Dashboard"
              component={DrawerDashboard}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Perfil"
              component={Perfil}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Clientes"
              component={Clientes}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Ventas"
              component={Ventas}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Pedidos"
              component={Pedidos}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Reportes"
              component={Reportes}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="RegistrarPedido"
              component={RegistrarPedido}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Actividades"
              component={TodasLasActividades}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="EstadoPedidos"
              component={Estados}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AlertProvider>
    </PedidosProvider>
  );
}
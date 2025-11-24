import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../../constants/config";
import Layout from "../../components/Layout";
import { Ionicons } from "@expo/vector-icons";

// Define la estructura de datos del perfil para TypeScript
interface PerfilData {
  id: number;
  nombre_usuario: string;
  correo: string;
  rol: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  foto_perfil: string;
}

const Perfil: React.FC = () => {
  // Tipado de estados
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          console.warn("No se encontró el token. Inicia sesión nuevamente.");
          setLoading(false);
          return;
        }

        const response = await axios.get<PerfilData>(`${API_URL}/api/app/perfil/obtener`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPerfil(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error al obtener perfil:", error.response?.data || error.message);
        } else {
          console.error("Error desconocido:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    obtenerPerfil();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 text-lg mt-4">Cargando perfil...</Text>
      </View>
    );
  }

  if (!perfil) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Ionicons name="alert-circle" size={48} color="#EF4444" />
        <Text className="text-gray-700 text-lg mt-4">No se pudo cargar el perfil.</Text>
      </View>
    );
  }

  return (
    <Layout>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center px-6 py-5 bg-white border-b border-gray-100">
          <View className="flex-1">
            <Text className="text-2xl text-center font-semibold text-gray-900">Mi Perfil</Text>
            <Text className="text-gray-500 text-center text-sm mt-1">
              Información de tu cuenta
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-6">
            {/* Avatar Section */}
            <View className="items-center mb-8">
              <View className="relative">
                <Image
                  source={
                    perfil.foto_perfil
                      ? { uri: perfil.foto_perfil }
                      : require("../../assets/user.png")
                  }
                  className="w-32 h-32 rounded-full border-4 border-blue-500 bg-blue-100 shadow-lg"
                  resizeMode="cover"
                  onError={() => console.warn("Error cargando foto de perfil")}
                />
                <TouchableOpacity className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full items-center justify-center shadow-md">
                  <Ionicons name="camera" size={16} color="white" />
                </TouchableOpacity>
              </View>

              <Text className="text-2xl font-semibold text-gray-900 mt-4 text-center">
                {perfil.nombre} {perfil.apellido_paterno} {perfil.apellido_materno}
              </Text>
              
              <View className="px-4 py-2 bg-blue-100 rounded-full mt-2">
                <Text className="text-blue-700 font-semibold text-sm">
                  {perfil.rol.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Información del perfil */}
            <View className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Nombre de usuario */}
              <View className="p-4 border-b border-gray-100">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="person" size={20} color="#6B7280" />
                  <Text className="text-gray-500 font-semibold text-sm ml-2">
                    Nombre de usuario
                  </Text>
                </View>
                <Text className="text-gray-900 font-semibold text-base">
                  {perfil.nombre_usuario}
                </Text>
              </View>

              {/* Correo electrónico */}
              <View className="p-4 border-b border-gray-100">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="mail" size={20} color="#6B7280" />
                  <Text className="text-gray-500 font-semibold text-sm ml-2">
                    Correo electrónico
                  </Text>
                </View>
                <Text className="text-gray-900 font-semibold text-base">
                  {perfil.correo}
                </Text>
              </View>

              {/* Teléfono */}
              <View className="p-4">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="call" size={20} color="#6B7280" />
                  <Text className="text-gray-500 font-semibold text-sm ml-2">
                    Teléfono
                  </Text>
                </View>
                <Text className="text-gray-900 font-semibold text-base">
                  {perfil.telefono || "No especificado"}
                </Text>
              </View>
            </View>

            {/* Información adicional */}
            <View className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
              <View className="flex-row items-center">
                <Ionicons name="information-circle" size={24} color="#3B82F6" />
                <View className="ml-3 flex-1">
                  <Text className="text-blue-800 font-semibold text-sm">
                    Información de la cuenta
                  </Text>
                  <Text className="text-blue-600 text-xs mt-1">
                    Tu perfil está {perfil.telefono ? "completo" : "incompleto"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Botones de acción */}
            <View className="mt-8 flex-row space-x-3">
              <TouchableOpacity className="flex-1 bg-gray-100 rounded-xl p-4 flex-row items-center justify-center active:bg-gray-200">
                <Ionicons name="create-outline" size={20} color="#374151" />
                <Text className="text-gray-700 font-semibold text-sm ml-2">
                  Editar Perfil
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-1 bg-blue-500 rounded-xl p-4 flex-row items-center justify-center active:bg-blue-600">
                <Ionicons name="shield-checkmark" size={20} color="white" />
                <Text className="text-white font-semibold text-sm ml-2">
                  Seguridad
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default Perfil;
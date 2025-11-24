import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../../constants/config";
import Layout from "../../components/Layout";
import HeaderGlobal from "../../components/HeaderGlobal";
import { Ionicons } from "@expo/vector-icons";

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
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) return;

        const res = await axios.get(`${API_URL}/api/app/perfil/obtener`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPerfil(res.data);
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPerfil();
  }, []);

  if (loading) {
    return (
      <Layout>
        <HeaderGlobal titulo="Mi Perfil" subtitulo="Información de tu cuenta" />

        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" color="#2563EB" />
          <Text className="text-gray-600 font-semibold mt-4">
            Cargando perfil...
          </Text>
        </View>
      </Layout>
    );
  }

  if (!perfil) {
    return (
      <Layout>
        <HeaderGlobal titulo="Mi Perfil" subtitulo="Información de tu cuenta" />
        <View className="flex-1 items-center justify-center bg-white">
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text className="text-gray-700 mt-4 text-lg">No se pudo cargar el perfil.</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      
      <HeaderGlobal titulo="Mi Perfil" subtitulo="Información de tu cuenta" />

      <ScrollView 
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-6">

          {/* === FOTO + NOMBRE === */}
          <View className="items-center mb-8">
            <View className="relative">
              <Image source={ perfil.foto_perfil ? { uri: perfil.foto_perfil } : require("../../assets/user.png") } 
                className="w-32 h-32 rounded-full border-4 border-blue-500 bg-blue-100 shadow-lg" 
                resizeMode="cover" 
                onError={() => console.warn("Error cargando foto de perfil")} 
              />

              {/* Botón para editar foto */}
              <TouchableOpacity className="absolute bottom-2 right-3 bg-primary w-9 h-9 rounded-full items-center justify-center shadow-md">
                <Ionicons name="camera" size={18} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-semibold text-gray-900 mt-4 text-center">
              {(perfil.nombre && perfil.apellido_paterno && perfil.apellido_materno)
                ? `${perfil.nombre} ${perfil.apellido_paterno} ${perfil.apellido_materno}`
                : perfil.nombre_usuario}
            </Text>


            <View className="px-4 py-1.5 bg-blue-100 rounded-full mt-2">
              <Text className="text-blue-700 font-regular text-body">
                {perfil.rol}
              </Text>
            </View>
          </View>

          {/* === TARJETA: INFORMACIÓN PRINCIPAL === */}
          <View className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            
            {/* Usuario */}
            <View className="p-4 border-b border-gray-100">
              <View className="flex-row items-center mb-1">
                <Ionicons name="person-outline" size={20} color="#6B7280" />
                <Text className="text-sm text-gray-500 font-semibold ml-2">
                  Usuario
                </Text>
              </View>
              <Text className="text-gray-900 font-semibold text-base">
                {perfil.nombre_usuario}
              </Text>
            </View>

            {/* Correo */}
            <View className="p-4 border-b border-gray-100">
              <View className="flex-row items-center mb-1">
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
                <Text className="text-sm text-gray-500 font-semibold ml-2">
                  Correo electrónico
                </Text>
              </View>
              <Text className="text-gray-900 font-semibold text-base">
                {perfil.correo}
              </Text>
            </View>

            {/* Teléfono */}
            <View className="p-4">
              <View className="flex-row items-center mb-1">
                <Ionicons name="call-outline" size={20} color="#6B7280" />
                <Text className="text-sm text-gray-500 font-semibold ml-2">
                  Teléfono
                </Text>
              </View>
              <Text className="text-gray-900 font-semibold text-base">
                {perfil.telefono || "No especificado"}
              </Text>
            </View>
          </View>

          {/* === INFORMACIÓN EXTRA === */}
          <View className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <View className="flex-row items-center">
              <Ionicons name="information-circle-outline" size={22} color="#2563EB" />
              <View className="ml-3">
                <Text className="text-blue-900 font-semibold text-body">
                  Información de la cuenta
                </Text>
                <Text className="text-blue-700 font-regular text-body-sm mt-1">
                  Tu perfil está {perfil.telefono ? "completo" : "incompleto"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Perfil;

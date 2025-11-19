import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, ScrollView } from "react-native";
import Text from "../../components/Text";
import { obtenerPerfil } from "./Obtener";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../components/Layout";

export default function Perfil() {
  const [perfil, setPerfil] = useState<any | null>(null);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerPerfil();
      setPerfil(data);
    };
    cargar();
  }, []);

  if (!perfil) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <Layout>
    <ScrollView className="flex-1 bg-white px-6 py-10">

      {/* HEADER */}
      <Text className="text-3xl text-center font-medium text-textPrimary mb-6">
        Mi Perfil
      </Text>

      {/* CARD PRINCIPAL */}
      <View className="items-center bg-white shadow-lg rounded-3xl px-6 py-8 mb-8 border border-graySoft">

        <Image
          source={
            perfil.foto_perfil
              ? { uri: perfil.foto_perfil }
              : require("../../assets/user.png")
          }
          className="w-32 h-32 rounded-full border-4 border-primary"
          resizeMode="cover"
        />

        <Text className="text-2xl font-medium mt-4 text-textPrimary tracking-wide">
          {perfil.nombre} {perfil.apellido_paterno} {perfil.apellido_materno}
        </Text>

        <Text className="text-lg text-textSecondary capitalize mt-1">
          {perfil.rol}
        </Text>

      </View>

      {/* SECCIÓN INFO GENERAL */}
      <View className="bg-white shadow-md rounded-2xl px-6 py-5 mb-5 border border-graySoft">
        <Text className="text-xl font-semibold mb-4 text-textPrimary">
          Información General
        </Text>

        <View className="flex-row items-center mb-3">
          <Ionicons name="person-outline" size={22} color="#2563EB" />
          <Text className="ml-3 text-base text-textPrimary">
            {perfil.nombre_usuario}
          </Text>
        </View>

        <View className="flex-row items-center mb-3">
          <Ionicons name="mail-outline" size={22} color="#2563EB" />
          <Text className="ml-3 text-base text-textPrimary">
            {perfil.correo}
          </Text>
        </View>

        <View className="flex-row items-center mb-1">
          <Ionicons name="call-outline" size={22} color="#2563EB" />
          <Text className="ml-3 text-base text-textPrimary">
            {perfil.telefono}
          </Text>
        </View>
      </View>

      {/* SECCIÓN DATOS PERSONALES */}
      <View className="bg-white shadow-md rounded-2xl px-6 py-5 mb-8 border border-graySoft">
        <Text className="text-xl font-semibold mb-4 text-textPrimary">
          Datos Personales
        </Text>

        <View className="flex-row items-center mb-3">
          <Ionicons name="card-outline" size={22} color="#2563EB" />
          <Text className="ml-3 text-base text-textPrimary">
            {perfil.nombre} {perfil.apellido_paterno} {perfil.apellido_materno}
          </Text>
        </View>
      </View>

    </ScrollView>
    </Layout>
  );
}

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/Layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

export default function Inicio() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Layout>
      <View className="flex-1 bg-white items-center justify-start pt-10 px-6">
        {/* Logo */}
        <View className="mb-6">
          <Image
            source={require("../assets/logo.png")}
            resizeMode="contain"
            className="w-52 h-52" // Tamaño del logo ajustado
          />
        </View>

        {/* Título */}
        <Text className="text-4xl font-medium text-primary text-center mb-2">
          Bienvenido a Punto Shein
        </Text>

        {/* Subtítulo */}
        <Text className="text-lg font-medium text-secondary text-center mb-6 w-4/5">
          Gestiona tus pedidos de forma rápida y sencilla.
        </Text>

        {/* Ilustración */}
        <Image
          source={require("../assets/illustration.png")}
          resizeMode="contain"
          className="w-4/5 h-64 my-4"
        />

        {/* Botón */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="bg-primary py-5 px-8 rounded-2xl w-5/6 mt-10 shadow-md active:opacity-80"
        >
          <Text className="text-white text-2xl font-medium uppercase text-center">
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

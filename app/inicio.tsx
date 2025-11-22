import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/Layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import Boton from "../components/Boton";
import { LinearGradient } from 'expo-linear-gradient';


export default function Inicio() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Layout>
      <View className="flex-1 bg-gradient-to-b from-blue-50 to-white items-center justify-start pt-10 px-6">
        <View className="mb-6">
          <Image
            source={require("../assets/logo.png")}
            resizeMode="contain"
            className="w-52 h-52" // Tamaño del logo ajustado
          />
        </View>

        {/* Título */}
        <Text className="text-h1 font-medium text-primary text-center mb-2">
          Bienvenido a Punto Shein
        </Text>

        {/* Subtítulo */}
        <Text className="text-h3 font-medium text-textSecondary text-center mb-6 w-4/5">
          Gestiona tus pedidos de forma rápida y sencilla.
        </Text>

        {/* Ilustración */}
        <Image
          source={require("../assets/illustration.png")}
          resizeMode="contain"
          className="w-4/5 h-64 my-4"
        />

        <Boton
          title="Iniciar sesión"
          onPress={() => navigation.navigate("Login")}
          className="w-5/6 mt-10"
        />

      </View>
    </Layout>
  );
}

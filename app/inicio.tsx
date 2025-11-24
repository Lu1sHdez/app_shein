import React from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/Layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import Boton from "../components/Boton";

export default function Inicio() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { width, height } = useWindowDimensions();

  // Escalado dinámico para tamaños
  const logoSize = width * 0.45; // 45% del ancho
  const illustrationHeight = height * 0.28; // 28% de la pantalla
  const titleSize = width < 360 ? 22 : width < 420 ? 26 : 30; 
  const subtitleSize = width < 360 ? 14 : 16;

  return (
    <Layout>
      <View className="flex-1 items-center justify-start pt-2 px-6 bg-white">

        {/* LOGO ADAPTABLE */}
        <Image
          source={require("../assets/logo.png")}
          resizeMode="contain"
          style={{
            width: logoSize,
            height: logoSize,
          }}
        />

        <Text
          style={{ fontSize: titleSize }}
          className="font-semibold uppercase text-primary text-center"
        >
          Bienvenido a Punto Shein
        </Text>

        {/* SUBTÍTULO ADAPTABLE */}
        <Text
          style={{ fontSize: subtitleSize }}
          className="text-textSecondary font-medium text-center mt-2 w-4/5"
        >
          Gestiona tus pedidos de forma rápida y sencilla.
        </Text>

        {/* ILUSTRACIÓN RESPONSIVA */}
        <Image
          source={require("../assets/illustration.png")}
          resizeMode="contain"
          style={{
            width: width * 0.9,
            height: illustrationHeight,
            marginVertical: 30,
          }}
        />

        {/* BOTÓN RESPONSIVO */}
        <Boton
          title="Iniciar sesión"
          onPress={() => navigation.navigate("Login")}
          className="w-5/6 mt-4"
        />

      </View>
    </Layout>
  );
}

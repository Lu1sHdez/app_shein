import React from "react";
import { View, Text, Image } from "react-native";

export default function Header() {
  return (
    <View className="w-full pt-12 pb-4 px-6 bg-white shadow-md flex-row items-center justify-between">
      
      {/* Logo */}
      <View className="flex-row items-center gap-2">
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />

        <Text className="text-xl font-bold text-gray-800">
          Punto Shein
        </Text>
      </View>

      {/* Mini saludo */}
      <Text className="text-gray-500 text-sm">
        ¡Hola!
      </Text>
    </View>
  );
}

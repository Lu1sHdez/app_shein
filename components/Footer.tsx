import React from "react";
import { View, Text } from "react-native";

export default function Footer() {
  return (
    <View className="w-full py-4 mt-10">
      <Text className="text-center text-gray-400 text-xs">
        Punto Shein © {new Date().getFullYear()}
      </Text>
      <Text className="text-center text-gray-400 text-xs">
        Gestión de pedidos - Versión 1.0
      </Text>
    </View>
  );
}

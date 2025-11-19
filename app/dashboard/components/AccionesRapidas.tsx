import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "../../../components/Text";

export default function AccionesRapidas({ navigation }: { navigation: any }) {

  return (
    <>
      {/* BARRA INFERIOR */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex-row justify-around items-center shadow-lg z-30">
        
        <TouchableOpacity
          onPress={() => navigation.navigate("Pedidos")}
          className="items-center gap-1"
        >
          <Ionicons name="bag-outline" size={26} color="#333" />
          <Text className="text-xs text-textSecondary">Pedidos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => navigation.navigate("NuevoPedido")}
          className="w-16 h-16 rounded-full bg-primary justify-center items-center shadow-2xl active:scale-95"
        >
          <Ionicons name="add" size={38} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Ventas")}
          className="items-center gap-1"
        >
          <Ionicons name="people-outline" size={26} color="#333" />
          <Text className="text-xs text-textSecondary">Ventas</Text>
        </TouchableOpacity>
        
      <View className="absolute bottom-16 right-6 z-40">
        
      </View>

      </View>

      
    </>
  );
}

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type HeaderGlobalProps = {
  titulo: string;
  subtitulo: string;
  toggleDrawer?: () => void;
  className?: string;
};

const HeaderGlobal = ({ titulo, subtitulo, toggleDrawer, className }: HeaderGlobalProps) => {
  return (
    <View className={`px-6 pt-12 pb-6 shadow-md rounded-b-3xl bg-blue-700`}>
      
      <View className="flex-row items-center justify-between">

        {/* ICONO DEL MENÚ (izquierda) */}
        {toggleDrawer ? (
          <TouchableOpacity
            onPress={toggleDrawer}
            className="p-2 rounded-xl bg-white shadow-sm"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="menu-sharp" size={28} color="#374151" />
          </TouchableOpacity>
        ) : (
          <View className="w-[40px]" />  // <-- para centrar el título
        )}

        {/* TÍTULOS CENTRADOS */}
        <View className="flex-1 items-center">
          <Text
            className="text-2xl font-semibold text-white"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {titulo}
          </Text>

          <Text
            className="text-sm font-semibold text-white opacity-90 mt-1"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {subtitulo}
          </Text>
        </View>

        {/* ESPACIO DERECHO PARA CENTRAR */}
        <View className="w-[40px]" />
      </View>
    </View>
  );
};

export default HeaderGlobal;

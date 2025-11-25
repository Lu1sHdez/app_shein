import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type HeaderGlobalProps = {
  titulo: string;
  subtitulo: string;
  toggleDrawer?: () => void;
};

const HeaderGlobal = ({ titulo, subtitulo, toggleDrawer }: HeaderGlobalProps) => {
  return (
    <View className="flex-row items-center px-6 py-4 bg-blue-200 shadow-lg rounded-b-2xl">
      {/* Botón del menú */}
      {toggleDrawer && (
        <TouchableOpacity
          onPress={toggleDrawer}
          className="absolute left-4 p-3 rounded-lg bg-white shadow-md active:bg-gray-200"
        >
          <Ionicons name="menu-sharp" size={32} color="#374151" />
        </TouchableOpacity>
      )}

      <View className="flex-1 items-center">
        <Text className="text-3xl text-gray-900 font-semibold">{titulo}</Text>
        <Text className="text-gray-500 font-light text-lg mt-1">{subtitulo}</Text>
      </View>
    </View>
  );
};

export default HeaderGlobal;

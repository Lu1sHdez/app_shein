import React from "react";
import { View, Text } from "react-native";

const HeaderGlobal = ({ titulo, subtitulo }: { titulo: string; subtitulo: string }) => {
  return (
    <View className="flex-row items-center px-6 py-5 bg-blue-100 border-b border-gray-100">
      <View className="flex-1">
        <Text className="text-2xl text-center font-semibold text-gray-900">{titulo}</Text>
        <Text className="text-gray-500 font-regular text-center text-sm mt-1">{subtitulo}</Text>
      </View>
    </View>
  );
};

export default HeaderGlobal;

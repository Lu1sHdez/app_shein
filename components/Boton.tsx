import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  className?: string;
  loading?: boolean;
}

export default function Boton({ title, onPress, className = "", loading = false }: Props) {
  return (
    <TouchableOpacity
      onPress={loading ? undefined : onPress}
      activeOpacity={0.85}
      disabled={loading}
      className={`
        bg-primary 
        py-4 
        px-6 
        rounded-2xl 
        w-full 
        shadow-lg 
        shadow-primary/30 
        justify-center 
        items-center
        ${loading ? "opacity-80" : ""}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text className="text-white uppercase text-h3 font-semibold tracking-wide">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

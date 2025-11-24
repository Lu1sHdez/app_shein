import React from "react";
import { View } from "react-native";
import Encabezado from "./Encabezado";
import GlobalBottomBar from "./GlobalBottomBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface LayoutProps {
  children: React.ReactNode;
  mostrarEncabezado?: boolean;
  mostrarBottom?: boolean;
}

export default function Layout({
  children,
  mostrarEncabezado = true,
  mostrarBottom = true,
}: LayoutProps) {
  const insets = useSafeAreaInsets();

  // Altura dinámica para evitar que el contenido quede debajo de la barra inferior
  const bottomPadding = mostrarBottom ? insets.bottom + 60 : 0; // 60 es el tamaño de la barra inferior

  return (
    <View className="flex-1 bg-gray-200">
      {/* Encabezado */}
      {mostrarEncabezado && <Encabezado />}

      {/* Contenido */}
      <View
        style={{ paddingBottom: bottomPadding }} // Solo aplica el padding si mostrarBottom es true
        className="flex-1"
      >
        {children}
      </View>

      {/* Barra inferior global */}
      {mostrarBottom && <GlobalBottomBar />}
    </View>
  );
}

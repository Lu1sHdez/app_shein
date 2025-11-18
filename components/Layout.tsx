import { View } from "react-native";
import Encabezado from "./Encabezado";
import Pie from "./Pie";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <View className="flex-1 bg-gray-200">

      <Encabezado />

      <View className="flex-1">
        {children}
      </View>

    </View>
  );
}

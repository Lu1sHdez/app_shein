import React from "react";
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native"; // Importa useRoute para acceder a la ruta
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Nav = StackNavigationProp<RootStackParamList>;

const GlobalBottomBar = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const iconSize = width < 360 ? 22 : width < 400 ? 24 : 26;
  const fontSize = width < 360 ? "text-[10px]" : "text-body-sm";

  if (route.name === "Login" || route.name === "Inicio") {
    return null;
  }

  const Button = ({
    icon,
    label,
    onPress,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 items-center justify-center active:opacity-70"
    >
      <Ionicons name={icon} size={iconSize} color="#2563EB" />
      <Text className={`${fontSize} font-regular text-black mt-1`}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        paddingBottom: insets.bottom + 6,
      }}
      className="absolute bottom-0 left-0 right-0 bg-blue-100 border-t border-gray-200 shadow-lg flex-row justify-between px-2 py-2 z-50"
    >
      <Button
        icon="home-outline"
        label="Inicio"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }],
          })
        }
      />
      <Button
        icon="bar-chart-outline"
        label="Ventas"
        onPress={() => navigation.navigate("Ventas")}
      />
      <Button
        icon="add-circle-outline"
        label="Nuevo"
        onPress={() => navigation.navigate("RegistrarPedido")}
      />
      <Button
        icon="bag-handle-outline"
        label="Pedidos"
        onPress={() => navigation.navigate("Pedidos")}
      />
      <Button
        icon="document-outline"
        label="Reportes"
        onPress={() => navigation.navigate("Reportes")}
      />
    </View>
  );
};

export default GlobalBottomBar;

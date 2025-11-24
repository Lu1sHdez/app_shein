import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/navigation";

type Nav = StackNavigationProp<RootStackParamList>;

const QuickAccess = () => {
  const navigation = useNavigation<Nav>();
  const [showMore, setShowMore] = useState(false);
  const fade = useState(new Animated.Value(0))[0];
  const { width } = useWindowDimensions();

  // 🔹 Tamaños responsivos
  const btnPadding = width < 360 ? "p-3" : "p-4";
  const iconSize = width < 360 ? 18 : 20;
  const titleSize = width < 360 ? "text-[11px]" : "text-sm";

  const toggle = () => {
    if (showMore) {
      Animated.timing(fade, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start(() => setShowMore(false));
    } else {
      setShowMore(true);
      Animated.timing(fade, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  const Button = ({
    title,
    icon,
    onPress,
    primary = false,
  }: {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    primary?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-center rounded-xl border-2 flex-1 min-w-[120px] ${btnPadding} ${
        primary
          ? "border-primary bg-blue-50"
          : "border-gray-300 bg-white"
      } active:opacity-70 shadow-sm`}
    >
      <Ionicons name={icon} size={iconSize} color="#2563EB" />
      <Text
        className={`ml-2 ${titleSize} ${
          primary ? "text-primary font-medium" : "text-gray-700"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3 mt-4">
        <Text className="text-h3 font-semibold text-gray-900">
          Accesos rápidos
        </Text>
        <View className="w-2 h-2 bg-primary rounded-full" />
      </View>

      {/* Botones principales */}
      <View className="flex-row gap-3">
        <Button
          title="Nuevo pedido"
          icon="add-circle-outline"
          primary
          onPress={() => navigation.navigate("RegistrarPedido")}
        />

        <Button
          title="Ventas"
          icon="bar-chart-outline"
          onPress={() => navigation.navigate("Ventas")}
        />

  
      </View>
    </View>
  );
};

export default QuickAccess;

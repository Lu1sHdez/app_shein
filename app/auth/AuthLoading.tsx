import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function AuthLoading() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (token) {
          // Sesión activa → Ir al dashboard
          navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }],
          });
        } else {
          // No hay token → Ir al inicio
          navigation.reset({
            index: 0,
            routes: [{ name: "Inicio" }],
          });
        }
      } catch (err) {
        console.log("Error verificando sesión:", err);
        navigation.reset({
          index: 0,
          routes: [{ name: "Inicio" }],
        });
      }
    };

    checkLogin();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" />
    </View>
  );
}

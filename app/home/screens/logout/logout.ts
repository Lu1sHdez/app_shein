import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { API_URL } from "../../../../constants/config";

export const handleLogout = async (navigation: any) => {
  Alert.alert(
    "Cerrar sesión",
    "¿Seguro que deseas cerrar tu sesión?",
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sí, salir",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.post(`${API_URL}/api/app/autenticacion/logout`,  { withCredentials: true });
            await AsyncStorage.removeItem("userToken");

            Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");

            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (error: any) {
            console.error("Error al cerrar sesión:", error);
            const mensaje = error.response?.data?.mensaje || "No se pudo cerrar la sesión.";
            Alert.alert("Error", mensaje);
          }
        },
      },
    ],
    { cancelable: true }
  );
};

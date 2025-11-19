// app/perfil/obtenerPerfil.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../constants/config";
export const obtenerPerfilAdmin = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      console.warn("No hay token guardado. Inicia sesión nuevamente.");
      return null;
    }

    const response = await axios.get(`${API_URL}/api/app/perfil/obtener`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error al obtener perfil del admin:",
      error.response?.data || error.message
    );
    return null;
  }
};

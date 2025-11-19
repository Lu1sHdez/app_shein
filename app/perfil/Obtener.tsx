// C:\Users\luishdez\Desktop\app_shein\app\perfil\Obtener.tsx

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../constants/config";

export const obtenerPerfil = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    if (!token) return null;

    const response = await axios.get(
      `${API_URL}/api/app/perfil/obtener`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; 
  } catch (error) {
    console.log("Error obteniendo perfil:", error);
    return null;
  }
};

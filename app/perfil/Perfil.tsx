import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../../constants/config";
import { colors } from "../../constants/theme";
import { perfilStyles as styles } from "./styles/Perfil"; 
import Layout from "../../components/Layout";

// Define la estructura de datos del perfil para TypeScript
interface PerfilData {
  id: number;
  nombre_usuario: string;
  correo: string;
  rol: string; // Puedes usar uniones literales si conoces los roles (ej: 'administrador' | 'cliente')
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  foto_perfil: string
}

const Perfil: React.FC = () => {
  // Tipado de estados
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          console.warn("No se encontró el token. Inicia sesión nuevamente.");
          setLoading(false);
          return;
        }

        // Tipado de la respuesta de axios
        const response = await axios.get<PerfilData>(`${API_URL}/api/app/perfil/obtener`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPerfil(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error al obtener perfil:", error.response?.data || error.message);
        } else {
          console.error("Error desconocido:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    obtenerPerfil();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!perfil) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No se pudo cargar el perfil.</Text>
      </View>
    );
  }

  return (
    <Layout title="Mi perfil" showBack>
      <View style = {styles.container}>
      <Image
        source={
          perfil.foto_perfil
            ? { uri: perfil.foto_perfil } 
            : require("../../assets/user.png") 
        }
        style={styles.avatar}
        resizeMode="cover"
        onError={() => console.warn("Error cargando foto de perfil")}
      />

        <Text style={styles.name}>
        {perfil.nombre} {perfil.apellido_paterno} {perfil.apellido_materno}
      </Text>
      <Text style={styles.role}>{perfil.rol.toUpperCase()}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nombre de usuario</Text>
        <Text style={styles.value}>{perfil.nombre_usuario}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Correo electrónico</Text>
        <Text style={styles.value}>{perfil.correo}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.value}>{perfil.telefono}</Text>
      </View>
      </View>
    </Layout>
      
  );
}

export default Perfil;

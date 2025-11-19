import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "../../constants/config";
import { styles } from "./styles/clientes";
import Layout from "../../components/Layout";

const Clientes = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/app/clientes/obtener`);
      setClientes(response.data);
    } catch (error: any) {
      console.log("Error al obtener clientes:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  if (loading) {
    return (
      <Layout title="Clientes" showBack>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Cargando clientes...</Text>
        </View>
      </Layout>
    );
  }

  if (clientes.length === 0) {
    return (
      <Layout title="Clientes" showBack>
        <View style={styles.center}>
          <Ionicons name="people-outline" size={60} color="#9CA3AF" />
          <Text style={styles.emptyText}>No hay clientes registrados</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout title="Clientes" showBack>
      <ScrollView style={styles.container}>
        {clientes.map((c) => (
          <View key={c.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.nombre}>
                {c.nombre} {c.apellido_paterno}
              </Text>
              <Ionicons name="person-circle-outline" size={26} color="#2563EB" />
            </View>

            <Text style={styles.textItem}>📞 {c.telefono}</Text>
            <Text style={styles.textItem}>
              📧 {c.correo || "Sin correo registrado"}
            </Text>
            <Text style={styles.textItem}>
              🏠 {c.direccion || "Sin dirección registrada"}
            </Text>

            <View style={styles.footerCard}>
              <Text style={styles.genero}>
                Género: {c.genero === "H" ? "Hombre" : c.genero === "M" ? "Mujer" : "Otro"}
              </Text>
              <TouchableOpacity style={styles.btnDetalles}>
                <Ionicons name="eye-outline" size={16} color="#2563EB" />
                <Text style={styles.btnText}>Ver detalles</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default Clientes;

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
import Layout from "../../components/Layout";
import HeaderGlobal from "../../components/HeaderGlobal";

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
      <Layout>
        <HeaderGlobal titulo="Clientes" subtitulo="Lista de clientes registrados" />

        <View className="flex-1 items-center justify-center bg-white py-12">
          <ActivityIndicator size="large" color="#2563EB" />
          <Text className="text-gray-600 font-medium text-body mt-4 text-center">
            Cargando clientes...
          </Text>
        </View>
      </Layout>
    );
  }

  if (clientes.length === 0) {
    return (
      <Layout>
        <HeaderGlobal titulo="Clientes" subtitulo="Lista de clientes registrados" />

        <View className="flex-1 items-center justify-center bg-white px-6">
          <Ionicons name="people-outline" size={60} color="#9CA3AF" />
          <Text className="text-gray-500 font-medium text-h3 mt-4 text-center">
            No hay clientes registrados
          </Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View className="flex-1 bg-white">
        <HeaderGlobal titulo="Clientes" subtitulo="Lista de clientes registrados" />

        <ScrollView
          className="flex-1 bg-gray-50"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 28 }}
        >
          <View className="p-4">

            {/* LISTA DE CLIENTES */}
            {clientes.map((c) => (
              <View
                key={c.id}
                className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100"
              >
                {/* Nombre + icono */}
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-h3 font-semibold text-gray-900">
                    {c.nombre} {c.apellido_paterno}
                  </Text>

                  <View className="bg-blue-100 p-2 rounded-xl">
                    <Ionicons name="person-circle-outline" size={24} color="#2563EB" />
                  </View>
                </View>

                {/* Datos */}
                <Text className="text-gray-600 text-body font-regular mb-1">
                  <Text className="font-medium">📞 Teléfono:</Text> {c.telefono}
                </Text>

                <Text className="text-gray-600 text-body font-regular mb-1">
                  <Text className="font-medium">📧 Correo:</Text>{" "}
                  {c.correo || "Sin correo registrado"}
                </Text>

                <Text className="text-gray-600 text-body font-regular mb-1">
                  <Text className="font-medium">🏠 Dirección:</Text>{" "}
                  {c.direccion || "Sin dirección registrada"}
                </Text>

                {/* Footer */}
                <View className="flex-row items-center justify-between mt-4">
                  <Text className="text-gray-500 text-body font-regular">
                    Género:{" "}
                    {c.genero === "H"
                      ? "Hombre"
                      : c.genero === "M"
                      ? "Mujer"
                      : "Otro"}
                  </Text>

                  <TouchableOpacity className="flex-row items-center bg-blue-50 px-3 py-2 rounded-xl">
                    <Ionicons name="eye-outline" size={16} color="#2563EB" />
                    <Text className="text-blue-700 ml-2 font-medium text-body-sm">
                      Ver detalles
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>
            ))}

          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default Clientes;

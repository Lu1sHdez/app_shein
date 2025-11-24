import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "../../constants/config";
import { ordenarClientesPorSeleccion } from "./Funciones/clienteSeleccionado";
import NuevoClienteModal from "./NuevoClienteModal";

type Props = {
  onClienteSeleccionado?: (cliente: any) => void;
};

const SeleccionarCliente: React.FC<Props> = ({ onClienteSeleccionado = () => {} }) => {
  const [clienteSeleccionado, setClienteSeleccionado] = useState<any | null>(null);
  const [clientes, setClientes] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalNuevoVisible, setModalNuevoVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener lista de clientes
  const fetchClientes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/app/clientes/obtener`);
      setClientes(res.data || []);
      setError(null);
    } catch {
      setError("No se pudieron cargar los clientes. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const seleccionar = (cliente: any) => {
    setClienteSeleccionado(cliente);
    setModalVisible(false);
    setError(null);
    onClienteSeleccionado(cliente);
  };

  return (
    <View className="w-full px-1 mt-3">
      {/* LABEL + SELECT */}
      <View className="mb-2 w-full">
        <Text className="text-body font-medium text-textPrimary mb-1">
          Cliente:
        </Text>

        <TouchableOpacity
          className={`
            flex-row items-center justify-between rounded-xl border
            px-4 py-3
            ${error ? "border-error bg-errorContainer" : "border-graySoft bg-white"}
            
            w-full
            max-w-full
          `}
          onPress={() => setModalVisible(true)}
        >
          <Text
            className={`
              text-body font-regular flex-1
              ${clienteSeleccionado ? "text-textPrimary" : "text-grayDark"}
            `}
            numberOfLines={1}
          >
            {clienteSeleccionado
              ? `${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido_paterno}`
              : "Seleccionar"}
          </Text>

          <Ionicons name="chevron-down" size={20} color="#333" />
        </TouchableOpacity>
      </View>


      {/* ERROR */}
      {error && <Text className="text-error text-body-sm mt-1 ml-1">{error}</Text>}

      {/* NUEVO CLIENTE LINK */}
      <TouchableOpacity
        className="flex-row items-center mt-2"
        onPress={() => setModalNuevoVisible(true)}
      >
        <Text className="text-primary font-semibold text-body mr-1">+</Text>
        <Text className="text-primary underline text-body">Nuevo cliente</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View className="flex-1 bg-black/40 justify-center items-center px-5">
          <View
            className="
              w-full bg-white rounded-2xl p-5 shadow-md 
              max-h-[70%] sm:max-h-[75%] md:max-h-[80%]
            "
          >
            <Text className="text-lg sm:text-xl font-semibold text-textPrimary mb-4 text-center">
              Seleccionar cliente
            </Text>

            {/* LOADING */}
            {loading ? (
              <ActivityIndicator size="large" color="#2563EB" />
            ) : clientes.length === 0 ? (
              <Text className="text-textSecondary text-center">No hay clientes registrados.</Text>
            ) : (
              <FlatList
                data={ordenarClientesPorSeleccion(clientes, clienteSeleccionado)}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  const seleccionado = clienteSeleccionado?.id === item.id;

                  return (
                    <Pressable
                      onPress={() => seleccionar(item)}
                      className={`
                        p-3 sm:p-4 mb-2 rounded-xl border
                        ${
                          seleccionado
                            ? "bg-suave/60 border-primary"
                            : "bg-grayLight border-graySoft"
                        }
                      `}
                    >
                      <View className="flex-row justify-between items-center">
                        <View className="w-[80%]">
                          <Text className="text-body font-medium text-textPrimary">
                            {item.nombre} {item.apellido_paterno} {item.apellido_materno}
                          </Text>
                          <Text className="text-body-sm text-textSecondary">{item.telefono}</Text>
                        </View>

                        {seleccionado && (
                          <Ionicons name="checkmark-circle" size={24} color="#2563EB" />
                        )}
                      </View>
                    </Pressable>
                  );
                }}
              />
            )}

            {/* CERRAR */}
            <TouchableOpacity
              className="mt-4 py-3 bg-primary rounded-xl active:opacity-80"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center font-medium text-body">Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* NUEVO CLIENTE MODAL */}
      <NuevoClienteModal
        visible={modalNuevoVisible}
        onClose={() => setModalNuevoVisible(false)}
        onClienteCreado={async (nuevo) => {
          await fetchClientes();
          if (nuevo) seleccionar(nuevo);
        }}
      />
    </View>
  );
};

export default SeleccionarCliente;

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
import { ordenarClientesPorSeleccion } from "./Funciones/clienteSeleccionado";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "../../constants/config";
import { styles } from "./styles/seleccionarCliente";
import NuevoClienteModal from "./NuevoClienteModal";

type Props = {
  onClienteSeleccionado?: (cliente: any) => void;
};

const SeleccionarCliente: React.FC<Props> = ({
  onClienteSeleccionado = () => {},
}) => {
  const [clienteSeleccionado, setClienteSeleccionado] = useState<any | null>(null);
  const [clientes, setClientes] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalNuevoVisible, setModalNuevoVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // 👈 error visual

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/app/clientes/obtener`);
      setClientes(response.data || []);
      setError(null); // limpiar error si carga bien
    } catch (error) {
      console.error("Error al obtener clientes:", error);
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
    setError(null); // limpiar error si se selecciona
    onClienteSeleccionado(cliente);
  };

  // ✅ Validación para cuando se intente continuar sin cliente
  const validarSeleccion = () => {
    if (!clienteSeleccionado) {
      setError("Debes seleccionar un cliente antes de continuar.");
      return false;
    }
    return true;
  };

  return (
    <View style={styles.section}>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Cliente:</Text>

        <TouchableOpacity
          style={[
            styles.dropdownInline,
            error && styles.dropdownError, // 👈 cambio visual
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={[
              styles.dropdownText,
              !clienteSeleccionado && { color: "#828282" },
            ]}
          >
            {clienteSeleccionado
              ? `${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido_paterno} ${clienteSeleccionado.apellido_materno || ""}`
              : "Seleccionar"}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Texto de error visual */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Botón nuevo cliente */}
      <TouchableOpacity
        style={styles.newClientBtn}
        onPress={() => setModalNuevoVisible(true)}
      >
        <Text style={[styles.addLink, { textDecorationLine: "none" }]}>+ </Text>
        <Text style={[styles.addLink, { textDecorationLine: "underline" }]}>
          Nuevo cliente
        </Text>
      </TouchableOpacity>

      {/* MODAL SELECCIÓN DE CLIENTE */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { maxHeight: "70%" }]}>
            <Text style={styles.modalTitle}>Seleccionar cliente</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#2563EB" />
            ) : clientes.length === 0 ? (
              <Text style={styles.emptyText}>No hay clientes registrados.</Text>
            ) : (
              <FlatList
                data={ordenarClientesPorSeleccion(clientes, clienteSeleccionado)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    style={[
                      styles.modalItem,
                      clienteSeleccionado?.id === item.id && {
                        backgroundColor: "#D4E3FC",
                        borderRadius: 12,
                      },
                    ]}
                    onPress={() => seleccionar(item)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text style={styles.modalItemText}>
                          {item.nombre} {item.apellido_paterno}{" "}
                          {item.apellido_materno}
                        </Text>
                        <Text style={styles.modalSubText}>{item.telefono}</Text>
                      </View>
                      {clienteSeleccionado?.id === item.id && (
                        <Ionicons
                          name="checkmark-circle"
                          size={22}
                          color="#2563EB"
                        />
                      )}
                    </View>
                  </Pressable>
                )}
              />
            )}

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL NUEVO CLIENTE */}
      <NuevoClienteModal
        visible={modalNuevoVisible}
        onClose={() => setModalNuevoVisible(false)}
        onClienteCreado={async (nuevoCliente) => {
          await fetchClientes();
          if (nuevoCliente) {
            seleccionar(nuevoCliente);
          }
        }}
      />
    </View>
  );
};

export default SeleccionarCliente;

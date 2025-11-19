import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { colors } from "../../constants/theme";
import { API_URL } from "../../constants/config";
import { styles } from "./styles/nuevoCliente";
import { useAlert } from "../context/AlertContext";

type Props = {
  visible: boolean;
  onClose: () => void;
  onClienteCreado: (clienteCreado: any) => Promise<void>;
};

const NuevoClienteModal: React.FC<Props> = ({ visible, onClose, onClienteCreado }) => {
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    correo: "",
    direccion: "",
    genero: "",
  });

  const { showAlert } = useAlert();

  // === VALIDAR CAMPOS ===
  const validarCampos = () => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!nuevoCliente.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!nuevoCliente.apellido_paterno.trim())
      nuevosErrores.apellido_paterno = "El apellido paterno es obligatorio.";
    if (!nuevoCliente.telefono.trim())
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    else if (!/^\d{10}$/.test(nuevoCliente.telefono))
      nuevosErrores.telefono = "Debe contener exactamente 10 dígitos.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardarNuevoCliente = async () => {
    if (!validarCampos()) return;

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/app/clientes/registrar`, {
        ...nuevoCliente,
        genero: nuevoCliente.genero || "Otro",
      });

      const clienteCreado = response.data.cliente || response.data;
      await onClienteCreado(clienteCreado);

      showAlert(
        "Cliente registrado",
        `El cliente ${clienteCreado.nombre} ${clienteCreado.apellido_paterno} se ha creado correctamente.`,
        "success"
      );

      // Limpia formulario
      setNuevoCliente({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        telefono: "",
        correo: "",
        direccion: "",
        genero: "",
      });
      setErrores({});
      onClose();
    } catch (error: any) {
      console.error("Error al crear cliente:", error);
      setErrores({
        general:
          error.response?.data?.mensaje || "No se pudo crear el cliente. Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (campo: string, valor: string) => {
    setNuevoCliente((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: "" }));
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { maxHeight: "80%" }]}>
          <Text style={styles.modalTitle}>Registrar nuevo cliente</Text>

          <ScrollView>
            {/* NOMBRE */}
            <TextInput
              style={[styles.input, errores.nombre && styles.inputError]}
              placeholder="Nombre *"
              value={nuevoCliente.nombre}
              onChangeText={(text) => handleChange("nombre", text)}
            />
            {errores.nombre && <Text style={styles.errorText}>{errores.nombre}</Text>}

            {/* APELLIDO PATERNO */}
            <TextInput
              style={[styles.input, errores.apellido_paterno && styles.inputError]}
              placeholder="Apellido paterno *"
              value={nuevoCliente.apellido_paterno}
              onChangeText={(text) => handleChange("apellido_paterno", text)}
            />
            {errores.apellido_paterno && (
              <Text style={styles.errorText}>{errores.apellido_paterno}</Text>
            )}

            {/* APELLIDO MATERNO */}
            <TextInput
              style={styles.input}
              placeholder="Apellido materno"
              value={nuevoCliente.apellido_materno}
              onChangeText={(text) => handleChange("apellido_materno", text)}
            />

            {/* TELÉFONO */}
            <TextInput
              style={[styles.input, errores.telefono && styles.inputError]}
              placeholder="Teléfono (10 dígitos) *"
              keyboardType="numeric"
              maxLength={10}
              value={nuevoCliente.telefono}
              onChangeText={(text) => handleChange("telefono", text)}
            />
            {errores.telefono && <Text style={styles.errorText}>{errores.telefono}</Text>}

            {/* CORREO */}
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              value={nuevoCliente.correo}
              onChangeText={(text) => handleChange("correo", text)}
            />

            {/* DIRECCIÓN */}
            <TextInput
              style={styles.input}
              placeholder="Dirección"
              value={nuevoCliente.direccion}
              onChangeText={(text) => handleChange("direccion", text)}
            />

            {/* GÉNERO */}
            <Text style={[styles.label, { marginTop: 8 }]}>Género</Text>
            <View style={styles.genderContainer}>
              {[
                { label: "Hombre", value: "H" },
                { label: "Mujer", value: "M" },
                { label: "Otro", value: "Otro" },
              ].map((opcion) => (
                <TouchableOpacity
                  key={opcion.value}
                  style={[
                    styles.genderOption,
                    nuevoCliente.genero === opcion.value && styles.genderOptionSelected,
                  ]}
                  onPress={() => handleChange("genero", opcion.value)}
                >
                  <Text
                    style={[
                      styles.genderText,
                      nuevoCliente.genero === opcion.value && styles.genderTextSelected,
                    ]}
                  >
                    {opcion.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Error general del servidor */}
            {errores.general && (
              <Text style={[styles.errorText, { textAlign: "center", marginTop: 5 }]}>
                {errores.general}
              </Text>
            )}
          </ScrollView>

          {/* BOTONES */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
              onPress={guardarNuevoCliente}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.actionButtonText}>Guardar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.grayDark }]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.actionButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NuevoClienteModal;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useAlert } from "../context/AlertContext";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "../../constants/config";
import { styles } from "./styles/pagoPedido";
import CustomButton from "../../components/Button";

type Props = {
  visible: boolean;
  onClose: () => void;
  clienteSeleccionado: any;
  productos: any[];
  onPedidoGuardado: () => void;
};

const PagoPedidoModal: React.FC<Props> = ({
  visible,
  onClose,
  clienteSeleccionado,
  productos,
  onPedidoGuardado,
}) => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [opcionPago, setOpcionPago] = useState<
    "anticipo" | "total" | "personalizado"
  >("anticipo");
  const [montoPersonalizado, setMontoPersonalizado] = useState("");
  const [errorMonto, setErrorMonto] = useState<string>(""); 

  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  let anticipo = total * 0.5;
  if (opcionPago === "total") anticipo = total;
  if (opcionPago === "personalizado" && montoPersonalizado) {
    anticipo = parseFloat(montoPersonalizado);
  }

  const restante = total - anticipo;

  // === Validación del monto ===
  const validarMonto = () => {
    let error = "";
    if (opcionPago === "personalizado") {
      const valor = parseFloat(montoPersonalizado);
      if (isNaN(valor)) error = "Ingresa un monto válido.";
      else if (valor < total * 0.5)
        error = `El anticipo no puede ser menor al 50% del total ($${(total * 0.5).toFixed(2)})`;
      else if (valor > total)
        error = `El anticipo no puede ser mayor al total ($${total.toFixed(2)})`;
    }
    setErrorMonto(error);
    return error === "";
  };

  const guardarPedido = async () => {
    if (!clienteSeleccionado) {
      showAlert("Sin cliente", "Selecciona un cliente antes de continuar.", "warning");
      return;
    }

    if (productos.length === 0) {
      showAlert("Sin productos", "Agrega productos antes de registrar el pedido.", "error");
      return;
    }

    if (!validarMonto()) return;

    try {
      setLoading(true);

      const payload = {
        clienteId: clienteSeleccionado.id,
        productos: productos.map((p) => ({
          nombre: p.nombre,
          incluyeTalla: p.incluyeTalla,
          talla: p.talla || null,
          costo: p.costo,
          precio: p.precio,
          cantidad: p.cantidad,
        })),
        total,
        anticipo,
        restante,
        metodoPago:
          opcionPago === "anticipo"
            ? "Anticipo 50%"
            : opcionPago === "total"
            ? "Pago completo"
            : "Monto personalizado",
      };

      console.log("Enviando pedido:", payload);
      const response = await axios.post(`${API_URL}/api/app/pedidos/registrar`, payload);

      showAlert(
        "Éxito",
        `Pedido registrado correctamente para ${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido_paterno}. ` +
          (
            opcionPago === "anticipo"
              ? `Se registró correctamente el anticipo del 50% ($${anticipo.toFixed(2)}).`
              : opcionPago === "total"
              ? `Se registró correctamente el pago total de $${total.toFixed(2)}.`
              : `Se registró correctamente el monto personalizado de $${anticipo.toFixed(2)}.`
          ),
        "success"
      );
      
      console.log("Respuesta del backend:", response.data);

      onPedidoGuardado();
      onClose();
    } catch (error: any) {
      console.error("Error al guardar pedido:", error);
      const msg = error.response?.data?.mensaje || "No se pudo guardar el pedido.";
      showAlert("Error", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Registrar pago</Text>

            <Text style={styles.label}>Total del pedido</Text>
            <Text style={styles.totalText}>${total.toFixed(2)}</Text>

            <Text style={styles.label}>Selecciona una opción de pago:</Text>

            {/* === OPCIONES === */}
            <TouchableOpacity
              style={[styles.option, opcionPago === "anticipo" && styles.optionSelected]}
              onPress={() => {
                setOpcionPago("anticipo");
                setErrorMonto("");
              }}
            >
              <Ionicons
                name={
                  opcionPago === "anticipo" ? "radio-button-on" : "radio-button-off"
                }
                size={20}
                color="#2563EB"
              />
              <Text style={styles.optionText}>Dejar el 50% de anticipo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.option, opcionPago === "total" && styles.optionSelected]}
              onPress={() => {
                setOpcionPago("total");
                setErrorMonto("");
              }}
            >
              <Ionicons
                name={opcionPago === "total" ? "radio-button-on" : "radio-button-off"}
                size={20}
                color="#2563EB" 
                
              />
              <Text style={styles.optionText}>Pagar el total completo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                opcionPago === "personalizado" && styles.optionSelected,
              ]}
              onPress={() => setOpcionPago("personalizado")}
            >
              <Ionicons
                name={
                  opcionPago === "personalizado"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={20}
                color="#2563EB"
              />
              <Text style={styles.optionText}>Ingresar monto personalizado</Text>
            </TouchableOpacity>

            {/* === CAMPO PERSONALIZADO === */}
            {opcionPago === "personalizado" && (
              <>
                <TextInput
                  style={[
                    styles.input,
                    errorMonto ? { borderColor: "red"} : {},
                  ]}
                  keyboardType="numeric"
                  placeholder="Ejemplo: 300"
                  value={montoPersonalizado}
                  onChangeText={(text) => {
                    setMontoPersonalizado(text);
                    if (errorMonto) setErrorMonto("");
                  }}
                  onBlur={validarMonto}
                />
                {errorMonto ? (
                  <Text style={{ color: "red", fontSize: 13, marginTop: 4 }}>
                    {errorMonto}
                  </Text>
                ) : null}
              </>
            )}

            {/* === INFO FINAL === */}
            <View style={{ marginTop: 12 }}>
              <Text style={styles.infoText}>
                Anticipo: ${anticipo.toFixed(2)} {"\n"}
                Restante: ${restante.toFixed(2)}
              </Text>
            </View>

            {/* === BOTONES === */}
            <View style={styles.actionsRow}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <CustomButton
                  title={loading ? "Guardando..." : "Confirmar"}
                  onPress={guardarPedido}
                  variant="primary"
                  disabled={loading}
                />
              </View>

              <View style={{ flex: 1, marginLeft: 8 }}>
                <CustomButton
                  title="Cancelar"
                  onPress={onClose}
                  variant="secondary"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PagoPedidoModal;

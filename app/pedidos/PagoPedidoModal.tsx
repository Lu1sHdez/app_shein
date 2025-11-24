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
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import { API_URL } from "../../constants/config";
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
  const [opcionPago, setOpcionPago] = useState<"anticipo" | "total" | "personalizado">(
    "anticipo"
  );
  const [montoPersonalizado, setMontoPersonalizado] = useState("");
  const [errorMonto, setErrorMonto] = useState("");

  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  let anticipo = total * 0.5;
  if (opcionPago === "total") anticipo = total;
  if (opcionPago === "personalizado" && montoPersonalizado) {
    anticipo = parseFloat(montoPersonalizado);
  }

  const restante = total - anticipo;

  // ==== VALIDAR MONTO ====
  const validarMonto = () => {
    let error = "";
    const valor = parseFloat(montoPersonalizado);

    if (opcionPago === "personalizado") {
      if (isNaN(valor)) error = "Ingresa un monto válido.";
      else if (valor < total * 0.5)
        error = `Debe ser mínimo el 50% ($${(total * 0.5).toFixed(2)})`;
      else if (valor > total) error = `No puede ser mayor a $${total.toFixed(2)}`;
    }

    setErrorMonto(error);
    return error === "";
  };

  // ==== GUARDAR PEDIDO ====
  const guardarPedido = async () => {
    if (!clienteSeleccionado) {
      showAlert("Sin cliente", "Selecciona un cliente antes de continuar.", "warning");
      return;
    }

    if (productos.length === 0) {
      showAlert("Sin productos", "Agrega productos al pedido.", "error");
      return;
    }

    if (!validarMonto()) return;

    try {
      setLoading(true);

      const payload = {
        clienteId: clienteSeleccionado.id,
        productos: productos.map((p) => ({
          nombre: p.nombre,
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

      await axios.post(`${API_URL}/api/app/pedidos/registrar`, payload);

      showAlert(
        "Éxito",
        `Pedido guardado para ${clienteSeleccionado.nombre}.`,
        "success"
      );

      onPedidoGuardado();
      onClose();
    } catch (error: any) {
      showAlert("Error", "No se pudo guardar el pedido.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-center items-center bg-black/40 px-4"
      >
        <View className="w-full bg-white rounded-2xl p-6 max-h-[85%] shadow-xl">
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* === TÍTULO === */}
            <Text className="text-center text-h3 font-semibold text-textPrimary mb-4">
              Registrar pago
            </Text>

            {/* === TOTAL === */}
            <Text className="text-body font-medium text-textPrimary">Total</Text>
            <Text className="text-primary font-semibold text-xl mb-4">
              ${total.toFixed(2)}
            </Text>

            {/* === OPCIONES === */}
            <Text className="text-body font-medium text-textPrimary mb-1">
              Selecciona el tipo de pago:
            </Text>

            {/* OPCIÓN: ANTICIPO */}
            <TouchableOpacity
              className={`flex-row items-center p-3 rounded-xl border mt-2 ${
                opcionPago === "anticipo"
                  ? "border-primary bg-suave/40"
                  : "border-graySoft bg-grayLight"
              }`}
              onPress={() => {
                setOpcionPago("anticipo");
                setErrorMonto("");
              }}
            >
              <Ionicons
                name={opcionPago === "anticipo" ? "radio-button-on" : "radio-button-off"}
                size={22}
                color="#2563EB"
              />
              <Text className="font-regular ml-3 text-body text-textPrimary">
                Anticipo del 50%
              </Text>
            </TouchableOpacity>

            {/* OPCIÓN: TOTAL */}
            <TouchableOpacity
              className={`flex-row items-center p-3 rounded-xl border mt-2 ${
                opcionPago === "total"
                  ? "border-primary bg-suave/40"
                  : "border-graySoft bg-grayLight"
              }`}
              onPress={() => {
                setOpcionPago("total");
                setErrorMonto("");
              }}
            >
              <Ionicons
                name={opcionPago === "total" ? "radio-button-on" : "radio-button-off"}
                size={22}
                color="#2563EB"
              />
              <Text className="font-regular ml-3 text-body text-textPrimary">Pago completo</Text>
            </TouchableOpacity>

            {/* OPCIÓN: PERSONALIZADO */}
            <TouchableOpacity
              className={`flex-row items-center p-3 rounded-xl border mt-2 ${
                opcionPago === "personalizado"
                  ? "border-primary bg-suave/40"
                  : "border-graySoft bg-grayLight"
              }`}
              onPress={() => setOpcionPago("personalizado")}
            >
              <Ionicons
                name={
                  opcionPago === "personalizado"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={22}
                color="#2563EB"
              />
              <Text className="font-regular ml-3 text-body text-textPrimary">
                Monto personalizado
              </Text>
            </TouchableOpacity>

            {/* INPUT PERSONALIZADO */}
            {opcionPago === "personalizado" && (
              <>
                <TextInput
                  className={`font-regular mt-3 p-3 rounded-xl border text-body ${
                    errorMonto
                      ? "border-error bg-errorContainer"
                      : "border-graySoft bg-white"
                  }`}
                  keyboardType="numeric"
                  placeholder="Ejemplo: 300"
                  value={montoPersonalizado}
                  onChangeText={(text) => {
                    setMontoPersonalizado(text);
                    if (errorMonto) setErrorMonto("");
                  }}
                  onBlur={validarMonto}
                />

                {errorMonto !== "" && (
                  <Text className="text-error font-regular text-body-sm mt-1">{errorMonto}</Text>
                )}
              </>
            )}

            {/* INFO FINAL */}
            <View className="bg-grayLight rounded-xl p-3 mt-4">
              <Text className="font-regular text-textPrimary text-body">
                Anticipo: ${anticipo.toFixed(2)}
              </Text>
              <Text className="font-regular text-textPrimary text-body">
                Restante: ${restante.toFixed(2)}
              </Text>
            </View>

            {/* BOTONES */}
            <View className="flex-row mt-6 mb-3">
              <View className="flex-1 mr-2">
                <CustomButton
                  title={loading ? "Guardando..." : "Confirmar"}
                  onPress={guardarPedido}
                  variant="primary"
                  disabled={loading}
                />
              </View>

              <View className="flex-1 ml-2">
                <CustomButton title="Cancelar" onPress={onClose} variant="secondary" />
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PagoPedidoModal;

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAlert } from "../../context/AlertContext";

export interface OpcionesPagoProps {
  opcionPago: "anticipo" | "total" | "personalizado";
  setOpcionPago: React.Dispatch<
    React.SetStateAction<"anticipo" | "total" | "personalizado">
  >;
  montoPersonalizado: string;
  setMontoPersonalizado: React.Dispatch<React.SetStateAction<string>>;
  total: number;
  anticipo: number;
  restante: number;
}

const OpcionesPago: React.FC<OpcionesPagoProps> = ({
  opcionPago,
  setOpcionPago,
  montoPersonalizado,
  setMontoPersonalizado,
  total,
  anticipo,
  restante,
}) => {
  const { showAlert } = useAlert();
  const [errorMonto, setErrorMonto] = useState<string | null>(null);

  // === VALIDACIÓN DINÁMICA ===
  useEffect(() => {
    if (opcionPago !== "personalizado" || !montoPersonalizado) {
      setErrorMonto(null);
      return;
    }

    const valor = parseFloat(montoPersonalizado);

    if (isNaN(valor)) return setErrorMonto("Ingresa un número válido.");
    if (valor <= 0) return setErrorMonto("El monto debe ser mayor a 0.");
    if (valor < total * 0.5)
      return setErrorMonto(
        `Debe ser mínimo el 50% (${(total * 0.5).toFixed(2)}).`
      );
    if (valor > total)
      return setErrorMonto(`No puede ser mayor a ${total.toFixed(2)}.`);

    setErrorMonto(null);
  }, [montoPersonalizado, opcionPago]);

  return (
    <View className="bg-white p-4 rounded-2xl shadow-sm border border-graySoft mt-3">
      {/* TÍTULO */}
      <Text className="text-h3 font-medium text-textPrimary mb-3">
        Opciones de pago
      </Text>

      {/* BOTONES DE OPCIÓN */}
      <TouchableOpacity
        onPress={() => setOpcionPago("anticipo")}
        className={`flex-row items-center p-3 rounded-xl border mb-2
          ${
            opcionPago === "anticipo"
              ? "border-primary bg-suave/40"
              : "border-graySoft bg-grayLight"
          }`}
      >
        <Ionicons name="cash-outline" size={22} color="#2563EB" />
        <Text className="ml-3 text-body text-textPrimary">
          Dejar el 50% de anticipo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setOpcionPago("total")}
        className={`flex-row items-center p-3 rounded-xl border mb-2
          ${
            opcionPago === "total"
              ? "border-primary bg-suave/40"
              : "border-graySoft bg-grayLight"
          }`}
      >
        <Ionicons name="card-outline" size={22} color="#2563EB" />
        <Text className="ml-3 text-body text-textPrimary">
          Pagar el total completo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setOpcionPago("personalizado")}
        className={`flex-row items-center p-3 rounded-xl border
          ${
            opcionPago === "personalizado"
              ? "border-primary bg-suave/40"
              : "border-graySoft bg-grayLight"
          }`}
      >
        <Ionicons name="create-outline" size={22} color="#2563EB" />
        <Text className="ml-3 text-body text-textPrimary">
          Ingresar monto personalizado
        </Text>
      </TouchableOpacity>

      {/* INPUT PERSONALIZADO */}
      {opcionPago === "personalizado" && (
        <View className="mt-3">
          <TextInput
            className={`p-3 rounded-xl border text-body
              ${
                errorMonto
                  ? "border-error bg-errorContainer"
                  : "border-graySoft bg-white"
              }`}
            keyboardType="numeric"
            placeholder="Ejemplo: 300"
            value={montoPersonalizado}
            onChangeText={(text) => {
              const limpio = text.replace(/[^0-9.]/g, "");
              setMontoPersonalizado(limpio);
            }}
          />

          {errorMonto && (
            <Text className="text-error text-body-sm mt-1">{errorMonto}</Text>
          )}
        </View>
      )}

      {/* RESUMEN */}
      <View className="mt-4 bg-grayLight p-3 rounded-xl">
        <View className="flex-row justify-between">
          <Text className="text-textPrimary">Anticipo:</Text>
          <Text className="text-textPrimary font-medium">
            ${anticipo.toFixed(2)}
          </Text>
        </View>

        <View className="flex-row justify-between mt-1">
          <Text className="text-textPrimary">Restante:</Text>
          <Text className="text-textPrimary font-medium">
            ${restante.toFixed(2)}
          </Text>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-graySoft my-3" />

        <Text className="text-primary font-semibold text-center">
          Total del pedido: ${total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default OpcionesPago;

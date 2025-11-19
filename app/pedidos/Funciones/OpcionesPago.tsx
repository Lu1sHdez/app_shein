import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/registrarPedido";
import { useAlert } from "../../context/AlertContext";

export interface OpcionesPagoProps {
  opcionPago: "anticipo" | "total" | "personalizado";
  setOpcionPago: React.Dispatch<React.SetStateAction<"anticipo" | "total" | "personalizado">>;
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

  
  useEffect(() => {
    if (opcionPago === "personalizado" && montoPersonalizado) {
      const valor = parseFloat(montoPersonalizado);

      if (isNaN(valor)) {
        setErrorMonto("Ingresa un número válido.");
        return;
      }
      if (valor <= 0) {
        setErrorMonto("El monto no puede ser negativo ni cero.");
        return;
      }
      if (valor < total * 0.5) {
        setErrorMonto(`El monto no puede ser menor al 50% ($${(total * 0.5).toFixed(2)}).`);
        return;
      }
      if (valor > total) {
        setErrorMonto(`El monto no puede ser mayor al total ($${total.toFixed(2)}).`);
        return;
      }
      setErrorMonto(null);
    } else {
      setErrorMonto(null);
    }
  }, [montoPersonalizado, opcionPago, total]);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Opciones de pago</Text>

      
      <TouchableOpacity
        style={[styles.optionCard, opcionPago === "anticipo" && styles.optionCardSelected]}
        onPress={() => setOpcionPago("anticipo")}
      >
        <Ionicons name="cash-outline" size={22} color="#2563EB" style={{ marginRight: 8 }} />
        <Text style={styles.optionText}>Dejar el 50% de anticipo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionCard, opcionPago === "total" && styles.optionCardSelected]}
        onPress={() => setOpcionPago("total")}
      >
        <Ionicons name="card-outline" size={22} color="#2563EB" style={{ marginRight: 8 }} />
        <Text style={styles.optionText}>Pagar el total completo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionCard, opcionPago === "personalizado" && styles.optionCardSelected]}
        onPress={() => setOpcionPago("personalizado")}
      >
        <Ionicons name="create-outline" size={22} color="#2563EB" style={{ marginRight: 8 }} />
        <Text style={styles.optionText}>Ingresar monto personalizado</Text>
      </TouchableOpacity>

      {opcionPago === "personalizado" && (
        <View style={{ marginTop: 10 }}>
          <TextInput
            style={[
              styles.input,
              errorMonto && { borderColor: "#EB5757", backgroundColor: "#FFF6F6" },
            ]}
            keyboardType="numeric"
            placeholder="Ejemplo: 300"
            value={montoPersonalizado}
            onChangeText={(text) => {
              
              const limpio = text.replace(/[^0-9.]/g, "");
              setMontoPersonalizado(limpio);
            }}
          />

          
          {errorMonto && (
            <Text style={{ color: "#EB5757", marginTop: 4, fontSize: 13 }}>
              {errorMonto}
            </Text>
          )}
        </View>
      )}

      
      <View style={styles.paymentSummary}>
        <View style={styles.rowBetween}>
          <Text style={styles.paymentLabel}>Anticipo:</Text>
          <Text style={styles.paymentValue}>${anticipo.toFixed(2)}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.paymentLabel}>Restante:</Text>
          <Text style={styles.paymentValue}>${restante.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalContainer}>
          <Text style={styles.textAnticipo}>Total del pedido: ${total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

export default OpcionesPago;

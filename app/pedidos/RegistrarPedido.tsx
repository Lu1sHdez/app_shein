import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles/registrarPedido";
import SeleccionarCliente from "./SeleccionarCliente";
import ListaProductosPedido from "./ListaProductosPedido";
import { useAlert } from "../context/AlertContext";
import Layout from "../../components/Layout";
import PagoPedidoModal from "./PagoPedidoModal";
import { usePedidos } from "../context/PedidosContext";

const RegistrarPedido: React.FC = () => {
  const navigation = useNavigation();
  const { showAlert } = useAlert();
  const { actualizarResumen } = usePedidos();

  const [errores, setErrores] = useState<{ cliente?: string; productos?: string }>({});
  const [clienteSeleccionado, setClienteSeleccionado] = useState<any | null>(null);
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalPagoVisible, setModalPagoVisible] = useState(false);

  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const handlePedidoGuardado = async () => {
    try {
      // 🔹 Actualiza el resumen global de pedidos
      await actualizarResumen();

      // 🔹 Muestra alerta de éxito
      showAlert("Éxito", "Pedido registrado correctamente.", "success");

      // 🔹 Limpia los estados del formulario
      setClienteSeleccionado(null);
      setProductos([]);
      setModalPagoVisible(false);

      // 🔹 Regresa al Dashboard
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar resumen:", error);
      showAlert("Error", "El pedido se guardó, pero no se pudo actualizar el resumen.", "warning");
    }
  };

  // ✅ Validación previa antes de abrir el modal
  const continuarConPago = () => {
    const nuevosErrores: typeof errores = {};

    if (!clienteSeleccionado) {
      nuevosErrores.cliente = "Debes seleccionar un cliente antes de continuar.";
    }

    if (productos.length === 0) {
      nuevosErrores.productos = "Agrega al menos un producto antes de guardar el pedido.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    setModalPagoVisible(true);
  };

  return (
    <Layout title="Nuevo pedido" showBack>
      {/* === Datos del cliente === */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Datos del cliente</Text>
        <SeleccionarCliente onClienteSeleccionado={setClienteSeleccionado} />
        {errores.cliente && <Text style={styles.errorText}>{errores.cliente}</Text>}
      </View>

      {/* === Productos seleccionados === */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Productos seleccionados</Text>
        <ListaProductosPedido
          productos={productos}
          setProductos={setProductos}
          clienteSeleccionado={clienteSeleccionado}
        />
        {errores.productos && <Text style={styles.errorText}>{errores.productos}</Text>}
      </View>

      {/* === Resumen del pedido === */}
      {productos.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Resumen del pedido</Text>
          <View style={styles.summaryRow}>
            <Ionicons name="person-outline" size={18} color="#2563EB" />
            <Text style={styles.summaryText}>
              Cliente:{" "}
              {clienteSeleccionado
                ? `${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido_paterno}`
                : "No seleccionado"}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons name="pricetag-outline" size={18} color="#2563EB" />
            <Text style={styles.summaryText}>Productos: {productos.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons name="cash-outline" size={18} color="#2563EB" />
            <Text style={styles.summaryText}>Total: ${total.toFixed(2)}</Text>
          </View>
        </View>
      )}

      {/* === Botón de continuar con pago === */}
      <View style={styles.card}>
        <TouchableOpacity
          style={[styles.saveButtonPrimary, loading && { opacity: 0.6 }]}
          onPress={continuarConPago}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.saveButtonText}>Continuar con pago</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* === Modal de pago === */}
      <PagoPedidoModal
        visible={modalPagoVisible}
        onClose={() => setModalPagoVisible(false)}
        clienteSeleccionado={clienteSeleccionado}
        productos={productos}
        onPedidoGuardado={handlePedidoGuardado}
      />
    </Layout>
  );
};

export default RegistrarPedido;

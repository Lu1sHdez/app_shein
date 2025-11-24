import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAlert } from "../context/AlertContext";
import Layout from "../../components/Layout";
import PagoPedidoModal from "./PagoPedidoModal";
import { usePedidos } from "../context/PedidosContext";
import SeleccionarCliente from "./SeleccionarCliente";
import ListaProductosPedido from "./ListaProductosPedido";
import HeaderGlobal from "../../components/HeaderGlobal";
import Boton from "../../components/Boton";

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
      await actualizarResumen();
      showAlert("Éxito", "Pedido registrado correctamente.", "success");
      setClienteSeleccionado(null);
      setProductos([]);
      setModalPagoVisible(false);
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar resumen:", error);
      showAlert("Error", "El pedido se guardó, pero no se pudo actualizar el resumen.", "warning");
    }
  };

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
    <Layout>
      <View className="flex-1 bg-white">
        <HeaderGlobal
          titulo="Nuevo Pedido"
          subtitulo="Registra un nuevo pedido"
        />

        <View className="flex-1 bg-gray-50">
          {/* === Datos del cliente === */}
          <View className="bg-white rounded-2xl mx-4 my-2 p-5 shadow-sm border border-gray-200">
            <Text className="text-lg font-semibold text-black mb-3">Datos del cliente</Text>
            <SeleccionarCliente onClienteSeleccionado={setClienteSeleccionado} />
            {errores.cliente && (
              <Text className="text-red-500 text-sm mt-2">{errores.cliente}</Text>
            )}
          </View>

          {/* === Productos seleccionados === */}
          <View className="bg-white rounded-2xl mx-4 my-2 p-5 shadow-sm border border-gray-200">
            <Text className="text-lg font-semibold text-black mb-3">Productos seleccionados</Text>
            <ListaProductosPedido
              productos={productos}
              setProductos={setProductos}
              clienteSeleccionado={clienteSeleccionado}
            />
            {errores.productos && (
              <Text className="text-red-500 text-sm mt-2">{errores.productos}</Text>
            )}
          </View>

          {/* === Resumen del pedido === */}
          {productos.length > 0 && (
            <View className="bg-white rounded-2xl mx-4 my-2 p-5 shadow-sm border border-gray-200">
              <Text className="text-lg font-semibold text-black mb-3">Resumen del pedido</Text>
              
              <View className="flex-row items-center mb-2">
                <Ionicons name="person-outline" size={18} color="#2563EB" />
                <Text className="text-gray-700 ml-2 text-base">
                  Cliente:{" "}
                  {clienteSeleccionado
                    ? `${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido_paterno}`
                    : "No seleccionado"}
                </Text>
              </View>
              
              <View className="flex-row items-center mb-2">
                <Ionicons name="pricetag-outline" size={18} color="#2563EB" />
                <Text className="text-gray-700 ml-2 text-base">
                  Productos: {productos.length}
                </Text>
              </View>
              
              <View className="flex-row items-center">
                <Ionicons name="cash-outline" size={18} color="#2563EB" />
                <Text className="text-gray-700 ml-2 text-base">
                  Total: ${total.toFixed(2)}
                </Text>
              </View>
            </View>
          )}

        <View className="bg-white rounded-2xl mx-4 my-2 p-5 shadow-sm border border-gray-200">
          <Boton
            title="Continuar con pago"
            onPress={continuarConPago}
            loading={loading}
          />
        </View>

        </View>

        {/* === Modal de pago === */}
        <PagoPedidoModal
          visible={modalPagoVisible}
          onClose={() => setModalPagoVisible(false)}
          clienteSeleccionado={clienteSeleccionado}
          productos={productos}
          onPedidoGuardado={handlePedidoGuardado}
        />
      </View>
    </Layout>
  );
};

export default RegistrarPedido;
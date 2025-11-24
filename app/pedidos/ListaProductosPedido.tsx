import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NuevoProductoModal from "./NuevoProductoModal";

const ListaProductosPedido = ({ productos, setProductos, clienteSeleccionado }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [productoEnEdicion, setProductoEnEdicion] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const abrirModalProducto = () => {
    if (!clienteSeleccionado) {
      setError("Debes seleccionar un cliente antes de agregar productos.");
      return;
    }
    setError(null);
    setProductoEnEdicion(null);
    setModalVisible(true);
  };

  const editarProducto = (producto: any) => {
    setProductoEnEdicion(producto);
    setModalVisible(true);
  };

  const guardarProducto = (productoEditado: any) => {
    if (productoEnEdicion) {
      const nuevos = productos.map((p: any) =>
        p.id === productoEditado.id ? productoEditado : p
      );
      setProductos(nuevos);
    } else {
      setProductos([...productos, productoEditado]);
    }
  };

  const eliminarProducto = (id: string) => {
    setProductos(productos.filter((p: any) => p.id !== id));
  };

  return (
    <View className="w-full mt-2">

      <ScrollView className="max-h-64" nestedScrollEnabled>
        {productos.length === 0 ? (
          <Text className="text-grayDark mb-4 font-regular px-2">No hay productos agregados.</Text>
        ) : (
          productos.map((p: any) => (
            <TouchableOpacity key={p.id} onPress={() => editarProducto(p)}>
              <View className="bg-white p-4 rounded-xl mb-3 border border-graySoft flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-textPrimary font-semibold text-base">{p.nombre}</Text>

                  {p.talla && p.talla !== "Sin talla" && (
                    <Text className="text-textSecondary text-sm">Talla: {p.talla}</Text>
                  )}

                  <Text className="text-textSecondary text-sm mt-1">
                    Cant: {p.cantidad} × ${p.precio} ={" "}
                    <Text className="font-semibold text-textPrimary">
                      ${p.precio * p.cantidad}
                    </Text>
                  </Text>
                </View>

                <TouchableOpacity onPress={() => eliminarProducto(p.id)}>
                  <Ionicons name="trash-outline" size={24} color="#EB5757" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {error && <Text className="font-regular text-error text-sm mt-1">{error}</Text>}

      {/* BOTÓN AGREGAR */}
      <TouchableOpacity
        onPress={abrirModalProducto}
        className="
          flex-row items-center justify-center
          py-3 px-6 
          bg-primary/10 
          rounded-xl 
          border border-primary 
          active:opacity-80
          w-[90%] max-w-[350px]
        "
      >
        <Ionicons name="add-circle-outline" size={22} color="#2563EB" />
        <Text className="text-primary uppercase font-medium text-base ml-2">
          Agregar producto
        </Text>
      </TouchableOpacity>


      <NuevoProductoModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setProductoEnEdicion(null);
        }}
        onAgregar={guardarProducto}
        productoInicial={productoEnEdicion}
      />
    </View>
  );
};

export default ListaProductosPedido;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles/listaProductos";
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
    setProductoEnEdicion(null);
  };

  const eliminarProducto = (id: string) => {
    setProductos(productos.filter((p: any) => p.id !== id));
  };

  return (
    <View style={styles.section}>
      <ScrollView style={{ maxHeight: 250 }} nestedScrollEnabled>
        {productos.length === 0 ? (
          <Text style={styles.emptyText}>No hay productos agregados.</Text>
        ) : (
          productos.map((p: any) => (
            <TouchableOpacity key={p.id} onPress={() => editarProducto(p)}>
              <View style={styles.item}>
                <View>
                  <Text style={styles.itemName}>{p.nombre}</Text>

                  {p.talla && p.talla !== "Sin talla" && (
                    <Text style={styles.itemSub}>Talla: {p.talla}</Text>
                  )}

                  <Text style={styles.itemSub}>
                    Cant: {p.cantidad} × ${p.precio} = ${p.precio * p.cantidad}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => eliminarProducto(p.id)}>
                  <Ionicons name="trash-outline" size={22} color="#EB5757" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.addButton} onPress={abrirModalProducto}>
        <Ionicons name="add-circle-outline" size={22} color="#2563EB" />
        <Text style={styles.addButtonText}>Agregar producto</Text>
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

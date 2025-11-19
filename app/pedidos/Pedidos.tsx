// C:\Users\luishdez\Desktop\app_shein\app\pedidos\Pedidos.tsx

import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import Layout from "../../components/Layout";

export default function Pedidos() {
  return (
    <Layout>
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold text-textPrimary">Crear Pedido</Text>

      {/* Aquí se agregarían los campos para crear un pedido */}
      <View className="mt-6">
        <Text className="text-lg">Nombre del Cliente</Text>
        <TextInput
          placeholder="Ingrese el nombre del cliente"
          className="border-b border-gray-400 py-2"
        />
      </View>

      <View className="mt-6">
        <Text className="text-lg">Producto</Text>
        <TextInput
          placeholder="Ingrese el nombre del producto"
          className="border-b border-gray-400 py-2"
        />
      </View>

      {/* Botón para crear el pedido */}
      <Button title="Crear Pedido" onPress={() => alert("Pedido creado")} />
    </View>
    </Layout>
  );
}

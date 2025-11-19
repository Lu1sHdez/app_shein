import { View, TouchableOpacity } from "react-native";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import { Ionicons } from "@expo/vector-icons";
import Estados from "./components/Estados";
import ActividadReciente from "./components/ActividadReciente";
import AccionesRapidas from "./components/AccionesRapidas";

export default function Dashboard({ toggleDrawer }: any) {
  return (
    <Layout>
      <View className="flex-1 bg-white px-6 pt-14 pb-4">

        {/* HEADER */}
        <View className="flex-row items-center justify-between mb-6">
          
          {/* Botón menú */}
          <TouchableOpacity
            onPress={toggleDrawer}
            className="p-2 rounded-full bg-grayLight active:bg-graySoft shadow-sm"
          >
            <Ionicons name="menu" size={26} color="#333" />
          </TouchableOpacity>

          <Text className="text-3xl font-bold text-textPrimary">
            Inicio
          </Text>

          {/* Ícono de placeholder para balancear */}
          <View className="w-8" />
        </View>

        {/* SECCIONES */}
        <View 
          className="flex-1"
          style={{
            gap: 20,
          }}
        >
          <Estados />

          <ActividadReciente />
        </View>

      </View>
    </Layout>
  );
}

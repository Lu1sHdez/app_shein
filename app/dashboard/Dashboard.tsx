import { View, TouchableOpacity } from "react-native";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import { Ionicons } from "@expo/vector-icons";

export default function Dashboard({ toggleDrawer }: any) {
  return (
    <Layout>
      <View className="flex-1 bg-white px-6 pt-16">

        {/* HEADER */}
        <View className="flex-row justify-between items-center mb-10">
          <Text className="text-3xl font-medium text-textPrimary">
            Panel+
          </Text>

          {/* BOTÓN MENÚ HAMBURGUESA */}
          <TouchableOpacity
            onPress={toggleDrawer}
            className="p-2 rounded-full bg-gray-100 active:bg-gray-200"
          >
            <Ionicons name="menu" size={32} color="#333" />
          </TouchableOpacity>
        </View>

        {/* CONTENIDO */}
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl text-textSecondary">
            Bienvenido a tu panel
          </Text>
        </View>

      </View>
    </Layout>
  );
}

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/navigation";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Layout from "../../../components/Layout";
import { Ionicons } from "@expo/vector-icons";
import ActividadReciente from "../components/ActividadReciente";
import Estados from "./estados/EstadosSeccion";
import QuickAccess from "../components/QuickAccess";

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const Separator = () => (
  <View className="flex-row items-center justify-center my-2">
    <View className="h-px flex-1 bg-graySoft" />

    <View className="mx-4 px-3 py-1 rounded-full bg-grayLight flex-row items-center">
      <Ionicons name="sparkles" size={16} color="#2563EB" />
      <Text className="ml-1 text-primary font-medium text-[12px]"></Text>
    </View>

    <View className="h-px flex-1 bg-graySoft" />
  </View>
);

const Dashboard = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  return (
    <Layout>
      <View className="flex-1 bg-white">

        {/* HEADER */}
        <View className="flex-row items-center justify-center px-6 py-5 bg-suave border-b border-graySoft shadow-sm">
          <TouchableOpacity
            onPress={toggleDrawer}
            className="absolute left-6 p-2 rounded-xl active:bg-gray-200"
          >
            <Ionicons name="menu-sharp" size={38} color="#374151" />
          </TouchableOpacity>

          <View className="flex-1 items-center">
            <Text className="text-h2 font-semibold text-textPrimary">Inicio</Text>
            <Text className="text-textSecondary font-regular text-body-sm mt-1">
              Resumen general de tu actividad
            </Text>
          </View>
        </View>

        {/* SCROLL CONTENT */}
        <ScrollView
          className="flex-1 bg-grayLight"
          showsVerticalScrollIndicator={false}
        >
          <View className="p-6">

            <Estados />

            <Separator />

            <QuickAccess />

            <Separator />

            <ActividadReciente />

            <View className="h-20" /> 
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default Dashboard;

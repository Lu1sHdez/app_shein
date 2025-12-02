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
import HeaderGlobal from "../../../components/HeaderGlobal";
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

        <HeaderGlobal
          titulo="Inicio"
          subtitulo="Resumen general de tu actividad"
          toggleDrawer={toggleDrawer}
          className="bg-blue-700 rounded-b-2xl"
        />

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

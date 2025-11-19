import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../components/Layout";
import { styles } from "./styles/reportes";
import axios from "axios";
import { API_URL } from "../../constants/config";

const Reportes = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/app/reporte/general`);
        setData(res.data);
      } catch (error: any) {
        console.log("Error al obtener reportes:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Cargando datos
  if (loading) {
    return (
      <Layout title="Reportes" showBack>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Cargando reportes...</Text>
        </View>
      </Layout>
    );
  }

  // Si no hay datos disponibles
  if (!data) {
    return (
      <Layout title="Reportes" showBack>
        <Text style={styles.text}>No hay datos disponibles.</Text>
      </Layout>
    );
  }

  return (
    <Layout title="Reportes" showBack>
      <ScrollView style={styles.container}>
        {/* 🔹 VENTAS */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Ionicons name="cash-outline" size={30} color="#2563EB" />
              <Text style={styles.titulo}>Ventas Totales</Text>
            </View>
            <Text style={styles.total}>${data.totalVentas}</Text>
          </View>
          <Text style={styles.variacion}>
            {data.crecimientoMensual} respecto al mes anterior
          </Text>
        </View>

        {/* 🔹 GANANCIAS */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Ionicons name="trending-up-outline" size={30} color="#16A34A" />
              <Text style={styles.titulo}>Ganancia Neta</Text>
            </View>
            <Text style={[styles.total, { color: "#16A34A" }]}>
              ${data.totalGanancia}
            </Text>
          </View>
          <Text style={styles.subText}>
            Ticket promedio: ${data.ticketPromedio}
          </Text>
        </View>

        {/* 🔹 PEDIDOS */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Ionicons name="bag-check-outline" size={30} color="#2563EB" />
              <Text style={styles.titulo}>Pedidos</Text>
            </View>
          </View>
          <Text style={styles.detalleText}>
            Entregados: {data.entregados} | En proceso: {data.enProceso}
          </Text>
        </View>

        {/* 🔹 CLIENTES */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Ionicons name="people-outline" size={30} color="#2563EB" />
              <Text style={styles.titulo}>Clientes</Text>
            </View>
          </View>
          <Text style={styles.detalleText}>
            Totales: {data.clientesTotales} | Nuevos este mes: {data.clientesNuevos}
          </Text>
        </View>

        {/* 🔹 TOP PRODUCTOS */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="trophy-outline" size={30} color="#F59E0B" />
            <Text style={styles.titulo}>Top productos más vendidos</Text>
          </View>
          {data.topProductos.map((p: any, i: number) => (
            <View key={i} style={styles.rowBetween}>
              <Text style={styles.detalleText}>{p.nombre}</Text>
              <Text style={styles.detalleValue}>{p.ventas} ventas</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Reportes;

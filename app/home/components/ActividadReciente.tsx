import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import { API_URL } from "../../../constants/config";
import { actividadStyles as styles } from "./styles/actividadReciente";

const ActividadReciente = () => {
  const [actividades, setActividades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchActividades = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/app/pedidos/actividades`);
      const ultimas = response.data.slice(0, 3);
      setActividades(ultimas);
    } catch (error: any) {
      console.log("Error al obtener actividades:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActividades();
  }, []);

  return (
    <View style={styles.activitySection}>
      <View style={styles.activityHeader}>
        <Text style={styles.sectionTitle}>Actividad reciente</Text>
        <Text style={styles.linkText}>Ver todo</Text>
      </View>

      {loading ? (
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={{ color: "#6B7280", marginTop: 6 }}>Cargando actividades...</Text>
        </View>
      ) : actividades.length === 0 ? (
        <Text style={{ color: "#9CA3AF", textAlign: "center", marginTop: 10 }}>
          No hay actividad reciente
        </Text>
      ) : (
        actividades.map((act, index) => (
          <TouchableOpacity key={act.id || index} style={styles.activityItem}>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>
                {index + 1}. Pedido de {act.cliente} ({act.estado})
              </Text>
              <Text style={styles.activityMeta}>
                {act.observaciones || "Sin observaciones"} · ${act.total}
              </Text>
            </View>
            <Text style={styles.activityTime}>
              {new Date(act.fecha).toLocaleDateString("es-MX")}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

export default ActividadReciente;

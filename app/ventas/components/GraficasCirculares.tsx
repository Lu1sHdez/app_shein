import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { styles } from "./stylesGraficas";

const screenWidth = Dimensions.get("window").width;

interface VentaPeriodoItem {
  label: string;
  total: number;
}

interface Props {
  ventasPeriodo: VentaPeriodoItem[];
  totalVentas: number;
  totalGanancia: number;
  etiquetaPeriodo: string;
}

const GraficasCirculares = ({
  ventasPeriodo,
  totalVentas,
  totalGanancia,
  etiquetaPeriodo,
}: Props) => {
  const pieDataDistribucion = ventasPeriodo.map((item, index) => ({
    name: item.label,
    population: item.total,
    color: COLORS[index % COLORS.length],
    legendFontColor: "#333333",
    legendFontSize: 12,
  }));

  const comparacion = [
    {
      name: "Total vendido",
      population: totalVentas,
      color: "#2563EB",
      legendFontColor: "#333333",
      legendFontSize: 13,
    },
    {
      name: "Ganancia neta",
      population: totalGanancia,
      color: "#16A34A",
      legendFontColor: "#333333",
      legendFontSize: 13,
    },
  ];

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={{ marginBottom: 20 }}>
        {/* Distribucion de ventas por periodo */}
        <View style={styles.card}>
          <Text style={styles.title}>Distribución de ventas {etiquetaPeriodo}</Text>
          {pieDataDistribucion.length > 0 ? (
            <PieChart
              data={pieDataDistribucion}
              width={screenWidth - 40}
              height={230}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="10"
              chartConfig={{
                color: () => "#000000",
                labelColor: () => "#000000",
              }}
            />
          ) : (
            <Text style={styles.emptyText}>No hay datos suficientes para este periodo.</Text>
          )}

          {/* Leyenda personalizada */}
          <View style={{ marginTop: 10 }}>
            {pieDataDistribucion.map((item, index) => {
              const porcentaje = totalVentas > 0 ? ((item.population / totalVentas) * 100).toFixed(1) : 0;

              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  {/* Color */}
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: item.color,
                      marginRight: 10,
                    }}
                  />

                  {/* Texto */}
                  <Text style={{ fontSize: 14, color: "#333", flex: 1 }}>{item.name}</Text>

                  {/* Total vendido */}
                  <Text style={{ fontSize: 14, color: "#111", marginRight: 10 }}>${item.population}</Text>

                  {/* % */}
                  <Text style={{ fontSize: 14, color: "#555" }}>{porcentaje}%</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Total vendido vs ganancia */}
        <View style={styles.card}>
          <Text style={styles.title}>Total vendido vs ganancia</Text>
          <PieChart
            data={comparacion}
            width={screenWidth - 40}
            height={230}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="10"
            chartConfig={{
              color: () => "#000000",
              labelColor: () => "#000000",
            }}
          />
          <View style={styles.resumenTotales}>
            <Text style={styles.resumenTexto}>Total vendido: $ {totalVentas.toFixed(2)}</Text>
            <Text style={styles.resumenTexto}>Ganancia neta: $ {totalGanancia.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const COLORS = [
  "#2563EB", // Azul
  "#3B82F6", // Azul claro
  "#16A34A", // Verde
  "#F59E0B", // Amarillo
  "#EF4444", // Rojo
  "#8B5CF6", // Morado
  "#6B7280", // Gris
  "#10B981", // Verde brillante
];

export default GraficasCirculares;

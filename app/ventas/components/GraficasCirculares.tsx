// components/GraficasCombinadas.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";

interface VentasPeriodo {
  label: string;
  total: number;
}

interface GraficasCombinadasProps {
  ventasPeriodo: VentasPeriodo[];
  totalVentas: number;
  totalGanancia: number;
  etiquetaPeriodo: string;
  tipoReporte: string;
}

const { width: screenWidth } = Dimensions.get("window");

type TipoVisualizacion = "barras" | "lineas" | "circular";

const GraficasCombinadas: React.FC<GraficasCombinadasProps> = ({
  ventasPeriodo,
  totalVentas,
  totalGanancia,
  tipoReporte,
}) => {
  const [visualizacionActiva, setVisualizacionActiva] =
    useState<TipoVisualizacion>("barras");

  useEffect(() => {
    if (tipoReporte === "dia") setVisualizacionActiva("lineas");
    if (tipoReporte === "semana") setVisualizacionActiva("barras");
    if (tipoReporte === "mes") setVisualizacionActiva("barras");
    if (tipoReporte === "general") setVisualizacionActiva("circular");
  }, [tipoReporte]);

  const ordenarPeriodo = (lista: VentasPeriodo[]) => {
    const diasOrden = [
      "lun",
      "mar",
      "mié",
      "mie",
      "jue",
      "vie",
      "sab",
      "sáb",
      "dom",
    ];

    return [...lista].sort((a, b) => {
      const la = a.label.toLowerCase();
      const lb = b.label.toLowerCase();

      const ai = diasOrden.indexOf(la);
      const bi = diasOrden.indexOf(lb);

      if (ai === -1 || bi === -1) return 0;
      return ai - bi;
    });
  };

  const ventasOrdenadas = ordenarPeriodo(ventasPeriodo);

  const coloresBase = ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  const datosBarras = ventasOrdenadas
    .filter((item) => item.total > 0)
    .map((item, index) => ({
      value: item.total,
      label: item.label,
      frontColor: coloresBase[index % coloresBase.length],
      topLabelComponent: () => (
        <Text style={{ color: "#000", fontSize: 10, marginBottom: 2 }}>
          ${item.total}
        </Text>
      ),
    }));

  const datosLinea = ventasOrdenadas
    .filter((item) => item.total > 0)
    .map((item) => ({
      value: item.total,
      label: item.label,
      dataPointText: `$${item.total}`,
    }));

  const datosCircular = ventasOrdenadas
    .filter((item) => item.total > 0)
    .map((item, index) => ({
      value: item.total,
      label: item.label,
      color: coloresBase[index % coloresBase.length],
      text: `$${item.total}`,
    }));

  const BotonVisualizacion = ({
    tipo,
    icono,
    label,
  }: {
    tipo: TipoVisualizacion;
    icono: string;
    label: string;
  }) => (
    <TouchableOpacity
      onPress={() => setVisualizacionActiva(tipo)}
      className={`flex-1 mx-1 py-3 rounded-xl border-2 items-center ${
        visualizacionActiva === tipo
          ? "border-primary bg-primary"
          : "border-gray-300 bg-white"
      }`}
    >
      <Ionicons
        name={icono as any}
        size={20}
        color={visualizacionActiva === tipo ? "white" : "#6B7280"}
      />
      <Text
        className={`text-xs font-medium mt-1 ${
          visualizacionActiva === tipo ? "text-white" : "text-gray-600"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderGraficaPrincipal = () => {
    const datosFiltrados = ventasOrdenadas.filter((item) => item.total > 0);

    if (datosFiltrados.length === 0) {
      return (
        <View className="items-center justify-center py-12">
          <Ionicons name="bar-chart-outline" size={48} color="#9CA3AF" />
          <Text className="text-gray-500 font-medium mt-3 text-center">
            No hay datos de ventas para este período
          </Text>
        </View>
      );
    }

    switch (visualizacionActiva) {
      case "barras":
        return (
          <BarChart
            data={datosBarras}
            barWidth={35}
            spacing={20}
            roundedTop
            roundedBottom
            xAxisThickness={0}
            yAxisThickness={0}
            noOfSections={4}
            yAxisTextStyle={{ color: "#6B7280", fontSize: 12 }}
            xAxisLabelTextStyle={{ color: "#6B7280", fontSize: 10 }}
            maxValue={
              Math.max(...datosBarras.map((item) => item.value)) * 1.2 || 1
            }
            width={screenWidth - 80}
            yAxisOffset={10}
            isAnimated
            animationDuration={800}
          />
        );

      case "lineas":
        return (
          <LineChart
            data={datosLinea}
            width={screenWidth - 80}
            height={200}
            curved
            areaChart
            dataPointsColor="#2563EB"
            dataPointsRadius={6}
            startFillColor="rgba(37, 99, 235, 0.2)"
            endFillColor="rgba(37, 99, 235, 0.01)"
            color="#2563EB"
            thickness={3}
            yAxisColor="lightgray"
            xAxisColor="lightgray"
            yAxisTextStyle={{ color: "#6B7280" }}
            xAxisLabelTextStyle={{ color: "#6B7280", width: 60, fontSize: 10 }}
            hideRules
          />
        );

      case "circular":
        return (
          <View className="items-center">
            <PieChart
              data={datosCircular}
              showText
              textColor="black"
              radius={90}
              textSize={12}
              showValuesAsLabels
              showTextBackground
              textBackgroundRadius={15}
              focusOnPress
              showGradient
              sectionAutoFocus
            />
          </View>
        );
    }
  };

  const promedioVentas =
    ventasOrdenadas.filter((item) => item.total > 0).length > 0
      ? totalVentas / ventasOrdenadas.filter((item) => item.total > 0).length
      : 0;

  const margenGanancia =
    totalVentas > 0 ? (totalGanancia / totalVentas) * 100 : 0;

  const periodosActivos = ventasOrdenadas.filter(
    (item) => item.total > 0
  ).length;

  const MetricCard = ({
    titulo,
    valor,
    icono,
    subtitulo,
    textClass,
    iconColor,
  }: {
    titulo: string;
    valor: string;
    icono: string;
    subtitulo?: string;
    textClass: string;
    iconColor: string;
  }) => (
    <View className="flex-1 bg-white rounded-xl p-4 mx-1 shadow-sm border border-gray-200">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-gray-500 text-xs font-medium">{titulo}</Text>
        <Ionicons name={icono as any} size={16} color={iconColor} />
      </View>
      <Text className={`${textClass} text-lg font-semibold`}>{valor}</Text>
      {subtitulo && (
        <Text className="text-grayDark font-light text-body-sm mt-1">{subtitulo}</Text>
      )}
    </View>
  );

  return (
    <View>
      {/* Métricas principales */}
      <View className="flex-row  mx-4 mt-4">
        <MetricCard
          titulo="Total Ventas"
          valor={`$${totalVentas.toFixed(2)}`}
          icono="cash-outline"
          textClass="text-blue-600"
          iconColor="#2563EB"
        />
        <MetricCard
          titulo="Ganancia Neta"
          valor={`$${totalGanancia.toFixed(2)}`}
          icono="trending-up-outline"
          subtitulo={`${margenGanancia.toFixed(1)}% margen`}
          textClass="text-green-600"
          iconColor="#10B981"
        />
      </View>

      {/* Selector */}
      <View className="mx-4 mt-4">
        <Text className="text-gray-900 font-semibold text-lg mb-3">
          Tipo de visualización
        </Text>
        <View className="flex-row justify-between space-x-2">
          <BotonVisualizacion
            tipo="barras"
            icono="bar-chart-outline"
            label="Barras"
          />
          <BotonVisualizacion
            tipo="lineas"
            icono="trending-up-outline"
            label="Líneas"
          />
          <BotonVisualizacion
            tipo="circular"
            icono="pie-chart-outline"
            label="Circular"
          />
        </View>
      </View>

      {/* Gráfica */}
      <View className="bg-white rounded-2xl p-5 mx-4 mt-4 shadow-sm border border-gray-200">
        <View className="flex-row items-center justify-between mb-4">
          <View className="w-10 h-10 rounded-xl bg-blue-100 items-center justify-center mr-3">
            <Ionicons name="stats-chart" size={20} color="#2563EB" />
          </View>

          <View className="bg-primary/10 px-3 py-1 rounded-full">
            <Text className="text-primary font-semibold text-xs uppercase">
              {tipoReporte}
            </Text>
          </View>
        </View>

        {renderGraficaPrincipal()}

        {periodosActivos > 0 && (
          <View className="mt-4 pt-4 border-t border-gray-100">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600 font-medium">
                Periodos con ventas:
              </Text>
              <Text className="text-gray-900 font-bold">
                {periodosActivos}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-gray-600 font-medium">
                Promedio por periodo:
              </Text>
              <Text className="text-primary font-bold">
                ${promedioVentas.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Resumen */}
      <View className="bg-white rounded-2xl p-5 mx-4 mt-4 mb-6 shadow-sm border border-gray-200">
        <View className="flex-row items-center mb-4">
          <View className="w-10 h-10 rounded-xl bg-purple-100 items-center justify-center mr-3">
            <Ionicons name="analytics-outline" size={20} color="#8B5CF6" />
          </View>
          <View>
            <Text className="text-lg font-semibold text-gray-900">
              Resumen de Eficiencia
            </Text>
            <Text className="text-gray-500 font-regular text-sm">
              Métricas clave del periodo
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap -mx-1">
          <View className="w-1/2 px-1 mb-3">
            <View className="bg-gray-50 rounded-xl p-3">
              <Text className="text-gray-500 text-xs font-medium">
                Margen de Ganancia
              </Text>
              <Text className="text-green-600 text-lg font-bold mt-1">
                {margenGanancia.toFixed(1)}%
              </Text>
            </View>
          </View>

          <View className="w-1/2 px-1 mb-3">
            <View className="bg-gray-50 rounded-xl p-3">
              <Text className="text-gray-500 text-xs font-medium">
                Promedio/Venta
              </Text>
              <Text className="text-blue-600 text-lg font-bold mt-1">
                ${promedioVentas.toFixed(2)}
              </Text>
            </View>
          </View>

          <View className="w-1/2 px-1 mb-3">
            <View className="bg-gray-50 rounded-xl p-3">
              <Text className="text-gray-500 text-xs font-medium">
                Periodos Activos
              </Text>
              <Text className="text-primary text-lg font-bold mt-1">
                {periodosActivos}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GraficasCombinadas;

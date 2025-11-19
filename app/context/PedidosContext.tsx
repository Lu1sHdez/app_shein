import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import axios from "axios";
  import { API_URL } from "../../constants/config";
  
  // 🔹 Tipo para cada resumen
  export type ResumenPedido = {
    title: string;
    value: number;
    subtitle: string;
    icon: string;
    color: string;
  };
  
  // 🔹 Tipo del contexto
  interface PedidosContextType {
    resumenData: ResumenPedido[];
    loading: boolean;
    actualizarResumen: () => Promise<void>;
  }
  
  // 🔹 Crear el contexto
  const PedidosContext = createContext<PedidosContextType | undefined>(undefined);
  
  // 🔹 Proveedor
  export const PedidosProvider = ({ children }: { children: ReactNode }) => {
    const [resumenData, setResumenData] = useState<ResumenPedido[]>([]);
    const [loading, setLoading] = useState(true);
  
    const fetchResumen = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/app/pedidos/resumen`);
        const data = response.data.resumen;
  
        // 🔹 Combinar "Por hacer" + "Parcial"
        const porHacerItem = data.find((i: any) => i.title === "Por hacer");
        const parcialItem = data.find((i: any) => i.title === "Parcial");
        const porHacerTotal =
          (porHacerItem?.value || 0) + (parcialItem?.value || 0);
  
        // 🔹 Filtrar para no mostrar “Parcial” por separado
        const resumenFiltrado = data.filter(
          (i: any) => i.title !== "Parcial"
        );
  
        // 🔹 Reemplazar el valor combinado en “Por hacer”
        const resumenFinal = resumenFiltrado.map((item: any) =>
          item.title === "Por hacer" ? { ...item, value: porHacerTotal } : item
        );
  
        // 🔹 Agregar iconos, colores y subtítulos
        setResumenData(
          resumenFinal.map((item: any) => ({
            ...item,
            subtitle:
              item.title === "Por hacer"
                ? "Pendientes por atender"
                : item.title === "Realizados"
                ? "Pedidos confirmados"
                : item.title === "Por entregar"
                ? "Pendientes por entrega"
                : "Completados",
            icon:
              item.title === "Por hacer"
                ? "time-outline"
                : item.title === "Realizados"
                ? "checkmark-circle-outline"
                : item.title === "Por entregar"
                ? "car-outline"
                : "cube-outline",
            color:
              item.title === "Por hacer"
                ? "#F59E0B"
                : item.title === "Realizados"
                ? "#3B82F6"
                : item.title === "Por entregar"
                ? "#EF4444"
                : "#10B981",
          }))
        );
      } catch (error) {
        console.error("Error al cargar resumen:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchResumen();
    }, []);
  
    return (
      <PedidosContext.Provider
        value={{
          resumenData,
          loading,
          actualizarResumen: fetchResumen,
        }}
      >
        {children}
      </PedidosContext.Provider>
    );
  };
  
  // 🔹 Hook personalizado
  export const usePedidos = (): PedidosContextType => {
    const context = useContext(PedidosContext);
    if (!context) {
      throw new Error("usePedidos debe usarse dentro de un PedidosProvider");
    }
    return context;
  };
  
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAlert } from "../context/AlertContext";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles/listaProductos";

type Producto = {
  id: string;
  nombre: string;
  talla?: string;
  costo: number;
  precio: number;
  cantidad: number;
};

interface Props {
  visible: boolean;
  onClose: () => void;
  onAgregar: (nuevoProducto: Producto) => void;
  productoInicial?: Producto | null;
}

const NUEVO_PRODUCTO_TALLAS = ["Sin talla", "CH", "M", "G", "XG"];

const NuevoProductoModal = ({
  visible,
  onClose,
  onAgregar,
  productoInicial = null,
}: Props) => {
  const [form, setForm] = useState<Producto>({
    id: "",
    nombre: "",
    talla: "Sin talla",
    costo: NaN,
    precio: NaN,
    cantidad: 1,
  });

  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [ganancia, setGanancia] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const { showAlert } = useAlert(); 

  useEffect(() => {
    if (visible) {
      if (productoInicial) {
        setForm({
          id: productoInicial.id,
          nombre: productoInicial.nombre,
          talla: productoInicial.talla || "Sin talla",
          costo: productoInicial.costo,
          precio: productoInicial.precio,
          cantidad: productoInicial.cantidad,
        });
      } else {
        setForm({
          id: "",
          nombre: "",
          talla: "Sin talla",
          costo: NaN,
          precio: NaN,
          cantidad: 1,
        });
      }
      setErrores({});
    }
  }, [visible, productoInicial]);

  // === Cálculos dinámicos ===
  useEffect(() => {
    if (!isNaN(form.costo) && !isNaN(form.precio)) {
      setGanancia(form.precio - form.costo);
      setTotal(form.precio * (form.cantidad || 1));
    } else {
      setGanancia(0);
      setTotal(0);
    }
  }, [form.costo, form.precio, form.cantidad]);

  // === Validación ===
  const validarCampos = () => {
    const nuevosErrores: { [key: string]: string } = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre del producto es obligatorio.";
    if (isNaN(form.costo)) nuevosErrores.costo = "Debes ingresar el costo de compra.";
    else if (form.costo > 50000) nuevosErrores.costo = "El costo parece demasiado alto.";
    if (isNaN(form.precio)) nuevosErrores.precio = "Debes ingresar el precio de venta.";
    else if (form.precio < form.costo)
      nuevosErrores.precio = "El precio no puede ser menor que el costo.";
    else if (form.precio > form.costo * 10)
      nuevosErrores.precio = "El precio parece demasiado alto.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const agregarProducto = () => {
    if (!validarCampos()) {
      showAlert("Campos incompletos", "Por favor revisa los datos ingresados.", "warning");
      return;
    }

    try {
      const nuevo = {
        ...form,
        id: Date.now().toString(),
        total: form.precio * form.cantidad,
      };

      onAgregar(nuevo);
      showAlert(
        "Producto agregado",
        `Se ha agregado "${form.nombre}" correctamente al pedido.`,
        "success"
      );

      onClose();

      // Limpieza
      setForm({
        id: "",
        nombre: "",
        talla: "Sin talla",
        costo: NaN,
        precio: NaN,
        cantidad: 1,
      });
    } catch (error) {
      console.error("Error al agregar producto:", error);
      showAlert("Error", "No se pudo agregar el producto. Intenta nuevamente.", "error");
    }
  };

  const handleChange = (campo: string, valor: any) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: "" }));
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalContainer}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>Nuevo producto</Text>

            {/* NOMBRE */}
            <Text style={styles.label}>Nombre del producto</Text>
            <TextInput
              style={[styles.input, errores.nombre && styles.inputError]}
              placeholder="Ejemplo: Blusa blanca, pantalón, etc."
              value={form.nombre}
              onChangeText={(text) => handleChange("nombre", text)}
            />
            {errores.nombre && <Text style={styles.errorText}>{errores.nombre}</Text>}

            {/* TALLA */}
            <Text style={styles.label}>Selecciona talla (si aplica)</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {NUEVO_PRODUCTO_TALLAS.map((talla) => (
                <TouchableOpacity
                  key={talla}
                  style={{
                    backgroundColor: form.talla === talla ? "#2563EB" : "#E5E7EB",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                  onPress={() => handleChange("talla", talla)}
                >
                  <Text
                    style={{
                      color: form.talla === talla ? "#FFF" : "#333",
                      fontWeight: form.talla === talla ? "bold" : "normal",
                    }}
                  >
                    {talla}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* COSTO */}
            <Text style={styles.label}>Costo (precio de compra)</Text>
            <TextInput
              style={[styles.input, errores.costo && styles.inputError]}
              keyboardType="numeric"
              placeholder="Ejemplo: 150"
              value={isNaN(form.costo) ? "" : form.costo.toString()}
              onChangeText={(text) =>
                handleChange("costo", parseFloat(text) || NaN)
              }
            />
            {errores.costo && <Text style={styles.errorText}>{errores.costo}</Text>}

            {/* PRECIO */}
            <Text style={styles.label}>Precio de venta</Text>
            <TextInput
              style={[styles.input, errores.precio && styles.inputError]}
              keyboardType="numeric"
              placeholder="Ejemplo: 250"
              value={isNaN(form.precio) ? "" : form.precio.toString()}
              onChangeText={(text) =>
                handleChange("precio", parseFloat(text) || NaN)
              }
            />
            {errores.precio && <Text style={styles.errorText}>{errores.precio}</Text>}

            {/* CANTIDAD */}
            <Text style={styles.label}>Cantidad</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity
                onPress={() =>
                  handleChange("cantidad", Math.max(1, form.cantidad - 1))
                }
              >
                <Ionicons name="remove-circle-outline" size={26} color="#2563EB" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{form.cantidad}</Text>
              <TouchableOpacity
                onPress={() => handleChange("cantidad", form.cantidad + 1)}
              >
                <Ionicons name="add-circle-outline" size={26} color="#2563EB" />
              </TouchableOpacity>
            </View>

            {/* RESUMEN */}
            <View
              style={{
                marginTop: 14,
                padding: 10,
                borderRadius: 10,
                backgroundColor: "#F0F4FF",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#2563EB" }}>
                Ganancia: ${ganancia.toFixed(2)}
              </Text>
              <Text style={{ color: "#333" }}>
                Total (venta × cantidad): ${total.toFixed(2)}
              </Text>
            </View>

            {/* BOTONES */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.addBtn]}
                onPress={agregarProducto}
              >
                <Text style={styles.buttonTextAdd}>Agregar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelBtn]}
                onPress={onClose}
              >
                <Text style={styles.buttonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default NuevoProductoModal;

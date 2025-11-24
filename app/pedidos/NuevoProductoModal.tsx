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
import { Ionicons } from "@expo/vector-icons";
import { useAlert } from "../context/AlertContext";

type Producto = {
  id: string;
  nombre: string;
  talla?: string;
  costo: number;
  precio: number;
  cantidad: number;
};

const TALLAS = ["Sin talla", "CH", "M", "G", "XG"];

const NuevoProductoModal = ({
  visible,
  onClose,
  onAgregar,
  productoInicial = null,
}: any) => {
  const [form, setForm] = useState<Producto>({
    id: "",
    nombre: "",
    talla: "Sin talla",
    costo: NaN,
    precio: NaN,
    cantidad: 1,
  });

  const [errores, setErrores] = useState<any>({});
  const [ganancia, setGanancia] = useState(0);
  const [total, setTotal] = useState(0);

  const { showAlert } = useAlert();

  useEffect(() => {
    if (productoInicial) {
      setForm({
        ...productoInicial,
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
  }, [visible]);

  useEffect(() => {
    if (!isNaN(form.costo) && !isNaN(form.precio)) {
      setGanancia(form.precio - form.costo);
      setTotal(form.precio * form.cantidad);
    }
  }, [form.costo, form.precio, form.cantidad]);

  const validar = () => {
    const e: any = {};
    if (!form.nombre.trim()) e.nombre = "Ingresa un nombre.";
    if (isNaN(form.costo)) e.costo = "Ingresa el costo.";
    if (isNaN(form.precio)) e.precio = "Ingresa el precio.";
    if (form.precio < form.costo) e.precio = "El precio no puede ser menor.";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const agregar = () => {
    if (!validar()) {
      showAlert("Campos incompletos", "Revisa los datos ingresados.", "warning");
      return;
    }
    onAgregar({
      ...form,
      id: productoInicial ? form.id : Date.now().toString(),
    });

    showAlert("Producto agregado", `${form.nombre} añadido al pedido.`, "success");
    onClose();
  };

  const change = (campo: string, valor: any) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/40 justify-center items-center px-5">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="w-full bg-white rounded-2xl p-5 max-h-[85%]"
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-lg font-semibold text-textPrimary text-center mb-4">
              Nuevo producto
            </Text>

            {/* NOMBRE */}
            <Text className="text-textPrimary mb-1 font-medium">Nombre del producto</Text>
            <TextInput
              className={`
                border font-regular rounded-xl px-4 py-3 text-body bg-white
                ${errores.nombre ? "border-error bg-errorContainer" : "border-graySoft"}
              `}
              placeholder="Ej: Blusa blanca"
              value={form.nombre}
              onChangeText={(t) => change("nombre", t)}
            />
            {errores.nombre && <Text className="text-error text-sm">{errores.nombre}</Text>}

            {/* TALLAS */}
            <Text className="text-textPrimary mt-4 mb-1 font-medium">Talla</Text>
            <View className="flex-row flex-wrap gap-2">
              {TALLAS.map((t) => (
                <TouchableOpacity
                  key={t}
                  className={`
                    px-4 py-2 rounded-full
                    ${form.talla === t ? "bg-primary" : "bg-grayLight"}
                  `}
                  onPress={() => change("talla", t)}
                >
                  <Text
                    className={`${
                      form.talla === t ? "text-white font-semibold" : "text-black"
                    }`}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* COSTO */}
            <Text className="text-textPrimary mt-4 mb-1 font-medium">Costo</Text>
            <TextInput
              className={`
                border font-regular rounded-xl px-4 py-3 bg-white text-body
                ${errores.costo ? "border-error bg-errorContainer" : "border-graySoft"}
              `}
              placeholder="Ej: 120"
              keyboardType="number-pad"
              value={isNaN(form.costo) ? "" : String(form.costo)}
              onChangeText={(t) => change("costo", parseFloat(t) || NaN)}
            />
            {errores.costo && <Text className="text-error text-sm">{errores.costo}</Text>}

            {/* PRECIO */}
            <Text className="text-textPrimary mt-4 mb-1 font-medium">Precio venta</Text>
            <TextInput
              className={`
                border font-regular rounded-xl px-4 py-3 bg-white
                ${errores.precio ? "border-error bg-errorContainer" : "border-graySoft"}
              `}
              placeholder="Ej: 250"
              keyboardType="number-pad"
              value={isNaN(form.precio) ? "" : String(form.precio)}
              onChangeText={(t) => change("precio", parseFloat(t) || NaN)}
            />
            {errores.precio && <Text className="text-error text-sm">{errores.precio}</Text>}

            {/* CANTIDAD */}
            <Text className="text-textPrimary mt-4 mb-1 font-medium">Cantidad</Text>
            <View className="flex-row items-center justify-between px-5 py-3 bg-grayLight rounded-xl">
              <TouchableOpacity onPress={() => change("cantidad", Math.max(1, form.cantidad - 1))}>
                <Ionicons name="remove-circle-outline" size={28} color="#2563EB" />
              </TouchableOpacity>
              <Text className="text-lg font-semibold">{form.cantidad}</Text>
              <TouchableOpacity onPress={() => change("cantidad", form.cantidad + 1)}>
                <Ionicons name="add-circle-outline" size={28} color="#2563EB" />
              </TouchableOpacity>
            </View>

            {/* RESUMEN */}
            <View className="bg-suave/40 p-4 mt-4 rounded-xl">
              <Text className="text-primary font-semibold">
                Ganancia: ${ganancia.toFixed(2)}
              </Text>
              <Text className="text-textPrimary">
                Total: ${total.toFixed(2)}
              </Text>
            </View>

            {/* BOTONES */}
            <View className="flex-row justify-between mt-5">
              <TouchableOpacity
                className="flex-1 bg-primary py-3 rounded-xl mr-2"
                onPress={agregar}
              >
                <Text className="text-white text-center font-medium text-body">Guardar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-white py-3 rounded-xl ml-2 border border-graySoft"
                onPress={onClose}
              >
                <Text className="text-textPrimary text-center font-medium text-body">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default NuevoProductoModal;

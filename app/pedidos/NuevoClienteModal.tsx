import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { API_URL } from "../../constants/config";
import { useAlert } from "../context/AlertContext";

type Props = {
  visible: boolean;
  onClose: () => void;
  onClienteCreado: (clienteCreado: any) => Promise<void>;
};

const NuevoClienteModal: React.FC<Props> = ({
  visible,
  onClose,
  onClienteCreado,
}) => {
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    correo: "",
    direccion: "",
    genero: "",
  });

  const { showAlert } = useAlert();

  // === VALIDAR CAMPOS ===
  const validarCampos = () => {
    const e: any = {};

    if (!nuevoCliente.nombre.trim())
      e.nombre = "El nombre es obligatorio.";
    if (!nuevoCliente.apellido_paterno.trim())
      e.apellido_paterno = "El apellido paterno es obligatorio.";
    if (!nuevoCliente.telefono.trim())
      e.telefono = "El teléfono es obligatorio.";
    else if (!/^\d{10}$/.test(nuevoCliente.telefono))
      e.telefono = "Debe tener 10 dígitos.";

    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (campo: string, v: string) => {
    setNuevoCliente((prev) => ({ ...prev, [campo]: v }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: "" }));
  };

  const guardarNuevoCliente = async () => {
    if (!validarCampos()) return;

    try {
      setLoading(true);

      const res = await axios.post(`${API_URL}/api/app/clientes/registrar`, {
        ...nuevoCliente,
        genero: nuevoCliente.genero || "Otro",
      });

      const clienteCreado = res.data.cliente || res.data;
      await onClienteCreado(clienteCreado);

      showAlert(
        "Cliente registrado",
        `El cliente ${clienteCreado.nombre} ${clienteCreado.apellido_paterno} se creó correctamente.`,
        "success"
      );

      setNuevoCliente({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        telefono: "",
        correo: "",
        direccion: "",
        genero: "",
      });

      setErrores({});
      onClose();
    } catch (err: any) {
      setErrores({
        general:
          err.response?.data?.mensaje ||
          "No se pudo crear el cliente. Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/40 justify-center items-center px-5">

        <View className="w-full bg-white rounded-2xl p-6 max-h-[80%]">

          {/* Título */}
          <Text className="text-h3 font-semibold text-textPrimary text-center mb-4">
            Registrar nuevo cliente
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {[
              { key: "nombre", placeholder: "Nombre *" },
              { key: "apellido_paterno", placeholder: "Apellido paterno *" },
              { key: "apellido_materno", placeholder: "Apellido materno" },
              {
                key: "telefono",
                placeholder: "Teléfono (10 dígitos) *",
                keyboardType: "numeric",
              },
              {
                key: "correo",
                placeholder: "Correo electrónico",
                keyboardType: "email-address",
              },
              { key: "direccion", placeholder: "Dirección" },
            ].map((input:any) => (
              <View key={input.key} className="mb-3">
                <TextInput
                  placeholder={input.placeholder}
                  keyboardType={input.keyboardType || "default"}
                  value={(nuevoCliente as any)[input.key]}
                  onChangeText={(t) => handleChange(input.key, t)}
                  className={`
                    w-full px-4 py-3 rounded-xl border text-body font-regular
                    ${errores[input.key]
                      ? "border-error bg-errorContainer"
                      : "border-graySoft bg-white"}
                  `}
                />
                {errores[input.key] && (
                  <Text className="text-error font-regular text-body-sm ml-1 mt-1">
                    {errores[input.key]}
                  </Text>
                )}
              </View>
            ))}

            {/* GÉNERO */}
            <Text className="text-body font-medium text-textPrimary mt-2 mb-2">
              Género
            </Text>

            <View className="flex-row justify-between">
              {[
                { label: "Hombre", value: "H" },
                { label: "Mujer", value: "M" },
                { label: "Otro", value: "Otro" },
              ].map((g) => (
                <TouchableOpacity
                  key={g.value}
                  onPress={() => handleChange("genero", g.value)}
                  className={`
                    flex-1 mx-1 py-2 rounded-xl border items-center
                    ${
                      nuevoCliente.genero === g.value
                        ? "bg-primary border-primary"
                        : "bg-grayLight border-graySoft"
                    }
                  `}
                >
                  <Text
                    className={`
                      text-body font-medium
                      ${
                        nuevoCliente.genero === g.value
                          ? "text-white"
                          : "text-textPrimary"
                      }
                    `}
                  >
                    {g.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {errores.general && (
              <Text className="text-error mt-3 text-center text-body-sm">
                {errores.general}
              </Text>
            )}
          </ScrollView>

          {/* BOTONES */}
          <View className="flex-row justify-between mt-5">

            <TouchableOpacity
              onPress={guardarNuevoCliente}
              disabled={loading}
              className="flex-1 bg-primary py-3 rounded-xl mr-2"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center text-body font-medium">
                  Guardar
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              disabled={loading}
              className="
                flex-1 
                bg-grayLight 
                py-3 
                rounded-xl 
                ml-2 
                border 
                border-graySoft
              "
            >
              <Text className="text-textPrimary text-center text-body font-medium">
                Cancelar
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    </Modal>
  );
};

export default NuevoClienteModal;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../constants/config";
import Boton from "../../components/Boton";
import Layout from "../../components/Layout";
import { useAlert } from "../context/AlertContext";

export default function Login({ navigation }: any) {
  // Variables de estado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [mostrarContra, setMostrarContra] = useState(false);

  const { showAlert } = useAlert();

  const validateFields = () => {
    let valid = true;
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "El correo es obligatorio.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Ingresa un correo válido.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Debe tener al menos 6 caracteres.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/app/autenticacion/login`, {
        correo: email,
        password,
      });

      const { usuario, token } = response.data;
      await AsyncStorage.setItem("userToken", token);

      setErrors({});

      showAlert(
        "¡Bienvenido!",
        `Hola ${usuario?.nombre_usuario || ""}, nos alegra verte de nuevo.`,
        "success"
      );

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      }, 1000);
    } catch (error: any) {
      const mensaje = error.response?.data?.mensaje || "Credenciales incorrectas";
      setErrors({
        email: mensaje.includes("correo") ? mensaje : undefined,
        password: mensaje.includes("contraseña") ? mensaje : "Correo o contraseña incorrectos.",
      });

      console.log("Error real del servidor:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <View className="flex-1 bg-gradient-to-b from-blue-50 to-white items-center justify-start pt-10 px-6">

        {/* Card principal */}
        <View className="w-full rounded-3xl p-7 ">

          {/* Logo */}
          <View className="items-center mb-4">
            <Image
              source={require("../../assets/logo.png")}
              className="w-40 h-40"
              resizeMode="contain"
            />
          </View>
          {/* Título */}
          <Text className="text-h1 font-medium text-primary text-center mb-1">
            Iniciar sesión
          </Text>

          {/* Subtítulo */}
          <Text className="text-h3 text-base font-medium text-textSecondary text-center mb-7">
            Bienvenido de nuevo, inicia sesión para continuar
          </Text>

          {/* Campo CORREO */}
          <View className="mb-5">
            <Text className="text-h3 text-base font-medium text-textPrimary mb-1">
              Correo electrónico
            </Text>

            <View
              className={`flex-row items-center h-14 px-4 bg-grayLight rounded-2xl border 
              ${errors.email ? "border-error" : "border-graySoft"}`}
            >
              <Ionicons name="mail-outline" size={22} color="#5c5c5c" />

              <TextInput
                placeholder="ejemplo@gmail.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className="text-body flex-1 ml-3 text-textPrimary font-regular text-base"
                placeholderTextColor="#A0A0A0"
              />
            </View>

            {errors.email && (
              <Text className="text-error text-sm mt-1">{errors.email}</Text>
            )}
          </View>

          {/* Campo CONTRASEÑA */}
          <View className="mb-7">
            <Text className="text-h3 text-base font-medium text-textPrimary mb-1">
              Contraseña
            </Text>

            <View
              className={`flex-row items-center h-14 px-4 bg-grayLight rounded-2xl border 
              ${errors.password ? "border-error" : "border-graySoft"}`}
            >
              <Ionicons name="lock-closed-outline" size={22} color="#5c5c5c" />

              <TextInput
                placeholder="Ingresa tu contraseña"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                className="flex-1 ml-3 text-textPrimary font-regular text-base"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={!mostrarContra}
              />

              <TouchableOpacity onPress={() => setMostrarContra(!mostrarContra)}>
                <Ionicons
                  name={mostrarContra ? "eye-off-outline" : "eye-outline"}
                  size={26}
                  color="#5c5c5c"
                />
              </TouchableOpacity>
            </View>

            {errors.password && (
              <Text className="text-error text-sm mt-1">{errors.password}</Text>
            )}
          </View>

          <Boton 
            title="Iniciar sesión" 
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </View>
    </Layout>

  );
}

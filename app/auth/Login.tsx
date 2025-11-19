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
import CustomButton from "../../components/Button";
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
      <View className="flex-1 items-center justify-start px-6 bg-white">
        {/* Logo */}
        <Image
          source={require("../../assets/logo.png")}
          className="w-52 h-52"
          resizeMode="contain"
        />

        {/* Título */}
        <Text className="text-4xl font-bold text-primary mb-2 text-center">Iniciar sesión</Text>

        {/* Subtítulo */}
        <Text className="text-lg font-medium text-secondary mb-6 text-center">
          ¡Hola! Nos alegra verte de nuevo
        </Text>

        {/* Campo CORREO */}
        <View className="w-full mb-4">
          <Text className="text-base font-medium text-textPrimary mb-2">Correo electrónico</Text>
          <View className={`flex-row items-center bg-gray-200 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}>
            <TextInput
              placeholder="Ingresa tu correo"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className="flex-1 text-textPrimary text-base"
              placeholderTextColor="#828282"
            />
          </View>
          {errors.email && <Text className="text-red-500 text-sm mt-2">{errors.email}</Text>}
        </View>

        {/* Campo CONTRASEÑA */}
        <View className="w-full mb-4">
          <Text className="text-base font-medium text-textPrimary mb-2">Contraseña</Text>
          <View className={`flex-row items-center bg-gray-200 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}>
            <TextInput
              placeholder="Ingresa tu contraseña"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              className="flex-1 text-textPrimary text-base"
              placeholderTextColor="#828282"
              secureTextEntry={!mostrarContra}
            />
            <TouchableOpacity
              onPress={() => setMostrarContra(!mostrarContra)}
              className="px-2 justify-center items-center"
            >
              <Ionicons
                name={mostrarContra ? "eye-off-outline" : "eye-outline"}
                size={28}
                color="#4F4F4F"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text className="text-red-500 text-sm mt-2">{errors.password}</Text>}
        </View>

        {/* Cargando o botón */}
        {loading ? (
          <View className="items-center mt-4">
            <ActivityIndicator size="large" color="#4F4F4F" />
            <Text className="mt-2 text-gray-600">Cargando...</Text>
          </View>
        ) : (
          <CustomButton title="Iniciar sesión" onPress={handleLogin} />
        )}
      </View>
    </Layout>
  );
}

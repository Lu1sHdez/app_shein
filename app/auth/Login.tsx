import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../constants/config";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const navigation = useNavigation<any>();

  const [mostrarContra, setMostrarContra] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // VALIDACIÓN
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = "El correo es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Correo no válido.";

    if (!password) newErrors.password = "La contraseña es obligatoria.";
    else if (password.length < 6) newErrors.password = "Mínimo 6 caracteres.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // LOGIN REAL
  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/app/autenticacion/login`,
        {
          correo: email,
          password,
        }
      );

      const { token } = response.data;

      await AsyncStorage.setItem("userToken", token);

      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      });
    } catch (error: any) {
      const msg = error.response?.data?.mensaje || "Credenciales incorrectas";

      setErrors({
        email: msg.includes("correo") ? msg : undefined,
        password: msg.includes("contraseña")
          ? msg
          : "Correo o contraseña incorrectos.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <View className="flex-1 bg-white px-6 pt-20 pb-10">

        {/* LOGO */}
        <View className="items-center mb-6">
          <Image
            source={require("../../assets/logo.png")}
            className="w-40 h-40"
            resizeMode="contain"
          />
        </View>

        {/* TITULO */}
        <Text className="text-4xl font-bold text-textPrimary text-center">
          Bienvenido de nuevo
        </Text>

        <Text className="text-lg text-textSecondary text-center mt-2 mb-10">
          Ingresa a tu cuenta para continuar
        </Text>

        {/* INPUT: EMAIL */}
        <View className="mb-6">
          <Text className="text-textPrimary font-medium mb-1">
            Correo electrónico
          </Text>

          <View
            className={`
              flex-row items-center bg-grayLight rounded-2xl px-4 py-3
              ${errors.email ? "border-2 border-error" : ""}
            `}
          >
            <Ionicons name="mail-outline" size={22} color="#6B7280" />

            <TextInput
              placeholder="correo@ejemplo.com"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (errors.email)
                  setErrors({ ...errors, email: undefined });
              }}
              className="ml-3 flex-1 text-textPrimary"
              placeholderTextColor="#828282"
              autoCapitalize="none"
            />
          </View>

          {errors.email && (
            <Text className="text-error mt-1">{errors.email}</Text>
          )}
        </View>

        {/* INPUT: CONTRASEÑA */}
        <View className="mb-6">
          <Text className="text-textPrimary font-medium mb-1">
            Contraseña
          </Text>

          <View
            className={`
              flex-row items-center bg-grayLight rounded-2xl px-4 py-3
              ${errors.password ? "border-2 border-error" : ""}
            `}
          >
            <Ionicons name="lock-closed-outline" size={22} color="#6B7280" />

            <TextInput
              placeholder="********"
              secureTextEntry={!mostrarContra}
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                if (errors.password)
                  setErrors({ ...errors, password: undefined });
              }}
              className="ml-3 flex-1 text-textPrimary"
              placeholderTextColor="#828282"
            />

            <TouchableOpacity
              onPress={() => setMostrarContra(!mostrarContra)}
            >
              <Ionicons
                name={mostrarContra ? "eye-off-outline" : "eye-outline"}
                size={26}
                color="#4F4F4F"
              />
            </TouchableOpacity>
          </View>

          {errors.password && (
            <Text className="text-error mt-1">{errors.password}</Text>
          )}
        </View>

        {/* BOTÓN */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className="bg-primary py-4 rounded-2xl shadow-lg shadow-black/20"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center text-2xl font-semibold uppercase">
              Iniciar sesión
            </Text>
          )}
        </TouchableOpacity>

        {/* VOLVER */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mt-6"
        >
          <Text className="text-primary text-center font-medium">
            Volver
          </Text>
        </TouchableOpacity>

      </View>
    </Layout>
  );
}

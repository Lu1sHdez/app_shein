import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../constants/config";
import Boton from "../../components/Boton";
import Layout from "../../components/Layout";
import { useAlert } from "../context/AlertContext";

export default function Login({ navigation }: any) {
  const { width, height } = useWindowDimensions();

  const logoSize = width * 0.38;
  const inputHeight = height < 700 ? 48 : 56; 
  const inputTextSize = width < 360 ? 14 : 16;
  const titleSize = width < 360 ? 22 : width < 420 ? 26 : 30;
  const subtitleSize = width < 360 ? 13 : 15;

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Dismiss keyboard when tapping outside */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 bg-white items-center justify-start pt-10 px-6"
        >
          {/* Scrollable content to avoid blocking input fields */}
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View className="w-full rounded-3xl p-6">

              {/* Título */}
              <Text
                className="text-primary uppercase font-medium text-center mb-1"
                style={{ fontSize: titleSize }}
              >
                Iniciar sesión
              </Text>

              {/* Subtítulo */}
              <Text
                className="text-textSecondary font-medium text-center mb-7"
                style={{ fontSize: subtitleSize }}
              >
                Bienvenido de nuevo, inicia sesión para continuar
              </Text>

              {/* Campo Correo */}
              <View className="mb-5">
                <Text className="text-textPrimary font-medium mb-1" style={{ fontSize: inputTextSize }}>
                  Correo electrónico
                </Text>

                <View
                  style={{ height: inputHeight }}
                  className={`flex-row items-center px-4 bg-grayLight rounded-2xl border ${
                    errors.email ? "border-error" : "border-graySoft"
                  }`}
                >
                  <Ionicons name="mail-outline" size={22} color="#2563EB" />

                  <TextInput
                    placeholder="ejemplo@gmail.com"
                    style={{ fontSize: inputTextSize }}
                    value={email}
                    onChangeText={(t) => {
                      setEmail(t);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className="font-medium flex-1 ml-3 text-textPrimary"
                    placeholderTextColor="#A0A0A0"
                  />
                </View>

                {errors.email && <Text className="text-error text-sm mt-1">{errors.email}</Text>}
              </View>

              {/* Campo Contraseña */}
              <View className="mb-7">
                <Text className="text-textPrimary font-medium mb-1" style={{ fontSize: inputTextSize }}>
                  Contraseña
                </Text>

                <View
                  style={{ height: inputHeight }}
                  className={`flex-row items-center px-4 bg-grayLight rounded-2xl border ${
                    errors.password ? "border-error" : "border-graySoft"
                  }`}
                >
                  <Ionicons name="lock-closed-outline" size={22} color="#2563EB" />

                  <TextInput
                    placeholder="Ingresa tu contraseña"
                    style={{ fontSize: inputTextSize }}
                    value={password}
                    onChangeText={(t) => {
                      setPassword(t);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    className="font-medium flex-1 ml-3 text-textPrimary"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={!mostrarContra}
                  />

                  <TouchableOpacity onPress={() => setMostrarContra(!mostrarContra)}>
                    <Ionicons
                      name={mostrarContra ? "eye-off-outline" : "eye-outline"}
                      size={26}
                      color="#2563EB"
                    />
                  </TouchableOpacity>
                </View>

                {errors.password && (
                  <Text className="text-error text-sm mt-1">{errors.password}</Text>
                )}
              </View>

              {/* Botón */}
              <Boton title="Iniciar sesión" onPress={handleLogin} loading={loading} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Layout>
  );
}

import { View, TouchableOpacity, Image } from "react-native";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import { useNavigation } from "@react-navigation/native";

export default function Inicio() {

  const navigation = useNavigation<any>();
  
  return (
    <Layout>
      <View className="flex-1 bg-white px-6 pt-20 pb-10 justify-start">
        <View className="items-center">
          <Image
            source={require("../../assets/logo.png")}
            className="w-52 h-52 mb-4"
            resizeMode="contain"
          />

          <Text className="text-4xl font-medium text-textPrimary text-center leading-tight">
            Bienvenido a Punto Shein
          </Text>

          <Text className="text-xl text-textSecondary text-center mt-3">
              Gestiona tus pedidos de forma rápida, moderna y sencilla.
          </Text>
        </View>

        {/* CARD ILUSTRACIÓN */}
        <View className="items-center mt-0">
          <Image
            source={require("../../assets/illustration.png")}
            resizeMode="contain"
            className="w-4/5 max-h-64"
          />
          
          
        </View>

        <View className="-mt-32">
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className="bg-primary py-5 rounded-xl shadow-lg shadow-black/20"
          >
            <Text className="text-white uppercase text-center font-medium text-2xl tracking-wide">
              Iniciar sesión
            </Text>
          </TouchableOpacity>
        </View>

        </View>
    </Layout>
    
  );
}

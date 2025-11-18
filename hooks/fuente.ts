import { 
    useFonts, 
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_700Bold 
  } from "@expo-google-fonts/poppins";
  
  export function usePoppinsFonts() {
    const [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_700Bold,
    });
  
    return fontsLoaded;
  }
  
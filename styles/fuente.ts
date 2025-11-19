
import { useFonts } from '@expo-google-fonts/poppins'; 
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function fuente() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  return fontsLoaded;
}

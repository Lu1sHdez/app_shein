import { useFonts } from '@expo-google-fonts/poppins'; 
import { 
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_600SemiBold,
  Poppins_300Light 
} from '@expo-google-fonts/poppins';

export default function fuente() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_300Light,
  });

  return fontsLoaded;
}
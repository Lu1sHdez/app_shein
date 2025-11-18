import { Text as RNText, TextProps } from "react-native";
import { cn } from "../utils/cn";

export default function Text({
  className,
  style,
  ...props
}: TextProps & { className?: string }) {
  // Detectar clases de Tailwind
  const isBold = className?.includes("font-bold");
  const isMedium = className?.includes("font-medium");

  let fontFamily = "Poppins_400Regular"; // default

  if (isBold) fontFamily = "Poppins_700Bold";
  else if (isMedium) fontFamily = "Poppins_500Medium";

  return (
    <RNText
      {...props}
      style={[{ fontFamily }, style]}
      className={cn(className)}
    >
      {props.children}
    </RNText>
  );
}

import { View } from "react-native";
import getColors from "../../helpers/getColors";
import { useContext } from "react";
import { ThemeContext } from "../../context/Context";

export default function Card({ children, width, color, addon }) {
  const [appTheme] = useContext(ThemeContext);

  return (
    <View
      className={`flex rounded-2xl gap-2 ${width ?? "w-11/12"} mx-auto ${color ?? getColors.getThemeString("bg-dark-card", appTheme)} ${addon ?? ""}`}>
      {children}
    </View>
  );
}

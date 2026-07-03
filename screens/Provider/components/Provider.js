import { View, Text } from "react-native";
import { RefreshCcw, SquareCode } from "lucide-react-native";
import { useContext } from "react";
import GetColors from "../../../helpers/getColors";
import { ThemeContext } from "../../../context/Context";

export default function Provider({ item, iconLeft = false, iconRight = false }) {
  const [appTheme, setAppTheme] = useContext(ThemeContext);
  const getColors = GetColors;

  const IconR = () => {
    if (iconRight === false) {
      return <RefreshCcw color={getColors.getHexColor("dark-greon", appTheme)} />;
    }
    return iconRight();
  };

  const IconL = () => {
    if (iconLeft === false) {
      return <SquareCode color={getColors.getHexColor("dark-greon", appTheme)} />;
    }
    return iconLeft();
  };

  return (
    <View className={`flex rounded-2xl h-24 ${getColors.getThemeString("bg-dark-card", appTheme)}`}>
      <View className="flex flex-row justify-between w-full h-full">
        <View className="w-2/12 items-center justify-center">
          <IconL />
        </View>
        <View className="px-3 w-8/12 justify-center">
          <Text
            className={`font-semibold text-xl ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
            {item?.name || "NAME"}
          </Text>
          <Text className={`${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
            {item?.website || "url"}
          </Text>
        </View>
        <View className="w-2/12 flex items-center justify-center">
          <IconR />
        </View>
      </View>
    </View>
  );
}

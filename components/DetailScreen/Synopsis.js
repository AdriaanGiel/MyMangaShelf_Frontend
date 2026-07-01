import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import GetColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";

export default function Synopsis({ description }) {
  const [appTheme, setAppTheme] = useContext(ThemeContext);
  const getColors = GetColors;
  return (
    <View
      className={`flex rounded-2xl gap-2 w-11/12 p-8 mx-auto ${getColors.getThemeString("bg-dark-card", appTheme)}`}>
      <Text className={`text-2xl ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
        Synopsis
      </Text>
      <Text className={`${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
        {description}
      </Text>
    </View>
  );
}

import { View, Button } from "react-native";
import { useContext } from "react";
import GetColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";
import ThemeToggleButton from "../../components/global/ThemeToggleButton";
import { changeLanguage } from "../../src/locales/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 *
 * @returns Screen for settings
 */
export default function SettingsScreen() {
  const getColors = GetColors;
  const [appTheme, setAppTheme] = useContext(ThemeContext);

  const changeLang = async (lang) => {
    await AsyncStorage.setItem("app_lang", lang);
    await changeLanguage(lang);
  };

  return (
    <View
      className={` flex py-4 gap-3 items-center h-full ${getColors.getThemeString("bg-dark-background", appTheme)}`}>
      <ThemeToggleButton />
      <Button title="English" onPress={() => changeLang("en")} />
      <Button title="Nederlands" onPress={() => changeLang("nl")} />
      <Button title="Español" onPress={() => changeLang("es")} />
    </View>
  );
}

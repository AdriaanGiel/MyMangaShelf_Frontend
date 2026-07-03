import { useContext } from "react";
import GetColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";
import ShelfStorage from "../../helpers/Storage";
import { Pressable } from "react-native";
import { Moon, Sun } from "lucide-react-native";

/**
 *
 * @returns A button to toggle darkmode or lightmode
 */
export default function ThemeToggleButton() {
  const getColors = GetColors;
  const [appTheme, setAppTheme] = useContext(ThemeContext);
  const appStorage = ShelfStorage;

  /**
   * Function tp change the app theme
   */
  const changeAppTheme = () => {
    appStorage
      .addData("theme", !appTheme)
      .then((val) => setAppTheme(!appTheme))
      .catch((error) => console.log(error.message));
  };

  /**
   *
   * @returns Either a moon or sun icon based on theme set by user
   */
  const ShowThemeButton = () => {
    if (!appTheme) {
      return <Moon size={25} color={getColors.getHexColor("dark-greon", appTheme)} />;
    }

    return <Sun size={25} color={getColors.getHexColor("dark-greon", appTheme)} />;
  };

  return (
    <Pressable className="px-2" onPress={changeAppTheme}>
      <ShowThemeButton />
    </Pressable>
  );
}

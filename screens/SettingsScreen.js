import {View} from "react-native";
import {useContext} from 'react';
import GetColors from "../helpers/getColors";
import {ThemeContext} from "../context/Context";
import ThemeToggleButton from "../components/ThemeToggleButton";

/**
 *
 * @returns Screen for settings
 */
export default function SettingsScreen() {
    const getColors = GetColors;
    const [appTheme, setAppTheme] = useContext(ThemeContext);

    return (
        <View
            className={` flex py-4 items-center h-full ${getColors.getThemeString("bg-dark-background", appTheme)}`}>
            <ThemeToggleButton/>
        </View>
    );
}

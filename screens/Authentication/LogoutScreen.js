import { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { ThemeContext } from "../../context/Context";
import getColors from "../../helpers/getColors";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigation } from "@react-navigation/core";

/**
 *
 * @returns Register screen
 */
export default function LogoutScreen() {
  const [appTheme] = useContext(ThemeContext);
  const { user, setUser, logoutUser } = useContext(AuthContext);
  const Navigation = useNavigation();

  const logOut = () => {
    setTimeout(() => {
      logoutUser();
      Navigation.navigate("My Library");
    }, 2000);
  };

  useEffect(() => {
    logOut();
  }, []);

  return (
    <View
      className={`flex h-full ${getColors.getThemeString("bg-dark-background", appTheme)} justify-center items-center`}>
      <ActivityIndicator size={75} color={getColors.getHexColor("dark-greon", appTheme)} />
    </View>
  );
}

import { View, ActivityIndicator } from "react-native";
import getColors from "../../helpers/getColors";
import { useContext } from "react";
import { ThemeContext } from "../../context/Context";

export default function IsLoading({ state, children }) {
  const { appTheme } = useContext(ThemeContext);
  if (state) {
    return (
      <View
        className={`${appTheme ? "bg-dark-background" : "bg-light-background"} h-full flex justify-center items-center`}>
        <ActivityIndicator size={50} color={getColors.getHexColor("dark-greon")} />
      </View>
    );
  }

  return <>{children}</>;
}

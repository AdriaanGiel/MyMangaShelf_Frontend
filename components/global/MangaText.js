import { useContext } from "react";
import { ThemeContext } from "../../context/Context";
import { Text } from "react-native";

export default function MangaText({ addon, children }) {
  const [appTheme] = useContext(ThemeContext);

  return (
    <Text
      className={`${appTheme ? "text-light-standard-text" : "text-dark-standard-text"} ${addon}`}>
      {children}
    </Text>
  );
}

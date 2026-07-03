import { Pressable, Text, View } from "react-native";
import GeneralCard from "../../../components/global/GeneralCard";
import { Link2 } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import GetColors from "../../../helpers/getColors";
import { ThemeContext } from "../../../context/Context";

export default function Chapter({ chapter }) {
  const [appTheme, setAppTheme] = useContext(ThemeContext);
  const getColors = GetColors;
  const Navigation = useNavigation();

  const goToOutsideSource = () => {
    Navigation.navigate("outsource", { chapter_uri: chapter.chapter });
  };

  return (
    <View className={`p-4 rounded ${getColors.getThemeString("bg-dark-card", appTheme)}`}>
      <Pressable onPress={goToOutsideSource}>
        <View className="flex flex-row justify-between">
          <Pressable>
            <View className="flex gap-2">
              <Text className={`${getColors.getThemeString("text-dark-active-text", appTheme)}`}>
                {chapter.release_date}
              </Text>
              <Text
                className={`text-xl ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
                Chapter: {chapter.name}{" "}
              </Text>
            </View>
            <View className="flex justify-center">
              <Link2 color={getColors.getHexColor("dark-greon", appTheme)} />
            </View>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

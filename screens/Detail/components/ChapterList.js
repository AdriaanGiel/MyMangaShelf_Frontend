import { Pressable, Text, View } from "react-native";
import Chapter from "./Chapter";
import { useContext } from "react";
import GetColors from "../../../helpers/getColors";
import { ThemeContext } from "../../../context/Context";
import MangaText from "../../../components/global/MangaText";

export default function ChaptersList({ chapters }) {
  const [appTheme, setAppTheme] = useContext(ThemeContext);
  const getColors = GetColors;

  return (
    <View className="mx-auto flex gap-4 w-11/12">
      <View className="flex flex-row py-5 border-b-2 border-b-stone-500 justify-between">
        <Text
          className={`text-4xl ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
          Chapters
        </Text>
        <Text
          className={`align-bottom  ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
          Total
        </Text>
      </View>

      {chapters ? (
        chapters.map((chapter, key) => <Chapter chapter={chapter} key={key} />)
      ) : (
        <View className="w-full flex justify-center items-center">
          <MangaText>No chapters to show... if there is a provider, please choose one</MangaText>
        </View>
      )}
    </View>
  );
}

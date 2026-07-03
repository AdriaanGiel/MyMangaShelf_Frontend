import { Text, View, Pressable } from "react-native";
import Card from "../../../components/global/Card";
import getColors from "../../../helpers/getColors";
import { MapIcon, ThumbsDown, ThumbsUp } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/Context";
import { Image } from "react-native-elements";
import Storage from "../../../helpers/Storage";

export default function ReadingSpot({ spot, readingSpotAction, rating }) {
  const [appTheme] = useContext(ThemeContext);

  const [thumbs, setThumbs] = useState();

  const saveToStorage = async (rating) => {
    let ratings = await Storage.getData("spot_ratings");

    if (ratings === undefined) {
      ratings = {};
    }

    ratings[spot.id] = rating;

    await Storage.addData("spot_ratings", ratings);
  };

  const toggleThumbs = async (thumb) => {
    setThumbs(thumb);
    if (thumbs === thumb) {
      setThumbs("");
    }

    await saveToStorage(thumb);
  };

  useEffect(() => {
    // console.log(rating);

    if (rating !== null || rating !== undefined) {
      setThumbs(rating);
    }
  }, []);

  return (
    <Card width="w-full" addon="p-2 py-4">
      <View className="flex flex-row gap-2 h-18  w-full">
        <Pressable className="flex flex-row" onPress={readingSpotAction}>
          <View className="h-14 w-14 bg-dark-greon flex items-center justify-center rounded-md">
            <Image
              source={require("../../../assets/images/5078755.png")}
              style={{
                height: 35,
                width: 35,
              }}></Image>
          </View>
          <View className="w-[60%] px-2">
            <Text
              className={`truncate text-2xl ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
              {spot?.name ?? "Spot name"}
            </Text>
            <MapIcon color={getColors.getHexColor("dark-greon")}></MapIcon>
          </View>
        </Pressable>
        <View className="h-14 w-14 flex flex-row gap-5 justify-center items-center rounded-md">
          <Pressable onPress={() => toggleThumbs("up")}>
            <ThumbsUp fill={`${thumbs == "up" ? "green" : "gray"}`}></ThumbsUp>
          </Pressable>

          <Pressable onPress={() => toggleThumbs("down")}>
            <ThumbsDown fill={`${thumbs == "down" ? "green" : "gray"}`}></ThumbsDown>
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

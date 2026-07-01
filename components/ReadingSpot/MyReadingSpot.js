import { Text, View, Pressable } from "react-native";
import Card from "../global/Card";
import getColors from "../../helpers/getColors";
import { Delete, Edit, MapIcon, Share, ThumbsDown, ThumbsUp } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/Context";
import { Image } from "react-native-elements";
import Storage from "../../helpers/Storage";
import MangaText from "../global/MangaText";

export default function MyReadingSpot({ spot }) {
  const [appTheme] = useContext(ThemeContext);

  const editSpot = () => {
    console.log("edit");
  };

  const deleteSpot = () => {
    console.log("delete");
  };

  const shareSpot = () => {
    console.log("share");
  };

  useEffect(() => {}, []);

  return (
    <Card width="w-full" addon="p-2 py-4 ">
      <View className="flex flex-row gap-2 h-min-18  w-full">
        <View className="flex flex-row">
          <View className="h-14 w-14 bg-dark-greon flex items-center justify-center rounded-md">
            <Image
              source={require("../../assets/images/5078755.png")}
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
        </View>
        <View className="h-14 w-14 flex flex-row gap-5 justify-center items-center rounded-md">
          <Pressable onPress={shareSpot} className="flex flex-row gap-3">
            <Text className="text-dark-greon">Share</Text>
            <Share color={getColors.getHexColor("dark-greon")} />
          </Pressable>
        </View>
      </View>
      <View>
        <MangaText addon="text-2xl">{spot.note}</MangaText>
      </View>
      <View className="flex flex-row gap-6">
        <Pressable onPress={editSpot}>
          <Edit color={getColors.getHexColor("dark-greon")}></Edit>
        </Pressable>

        <Pressable onPress={deleteSpot}>
          <Delete color="red"></Delete>
        </Pressable>
      </View>
    </Card>
  );
}

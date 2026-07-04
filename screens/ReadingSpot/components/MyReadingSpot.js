import { Text, View, Pressable, Platform, Share as AppShare } from "react-native";
import Card from "../../../components/global/Card";
import getColors from "../../../helpers/getColors";
import { Delete, Edit, MapIcon, Share } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";

import { ThemeContext } from "../../../context/Context";
import { Image } from "react-native-elements";
import MangaText from "../../../components/global/MangaText";
import { useTranslation } from "react-i18next";

export default function MyReadingSpot({ spot, deleteSpot, editSpot }) {
  const [appTheme] = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const editReadingSpot = () => {
    editSpot();
  };

  const shareLocation = async () => {
    console.log(spot);

    const title = "MyMangaShelf Spot";
    const message = "Spot note";
    const url = `https://maps.google.com/maps?z=12&t=m&q=loc:${spot.latitude}+${spot.longitude}`;

    try {
      const result = await AppShare.share({
        title: title,
        message: Platform.OS === "android" ? `${message}\n\n${url}` : message,
        url: Platform.OS === "ios" ? url : undefined,
        dialogTitle: title,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const showOnMap = () => {
    navigation.navigate(t("navigation.readingSpots"), { spot });
  };

  const remove = () => {
    // Storage.removeItem("user_spots");
    deleteSpot();
  };

  const shareSpot = () => {
    shareLocation().then(() => console.log("shared it"));
  };

  useEffect(() => {
    // console.log(spot.id);
  }, []);

  return (
    <Card width="w-full" addon="p-2 py-4 ">
      <View className="flex flex-row gap-2 h-min-18  w-full">
        <View className="flex flex-row">
          <View className="h-14 w-14 bg-dark-greon flex items-center justify-center rounded-md">
            <Image
              source={require("../../../assets/images/5078755.png")}
              style={{
                height: 35,
                width: 35,
              }}></Image>
          </View>
          <View className="w-[60%] px-2">
            <Pressable onPress={showOnMap}>
              <Text
                className={`truncate text-2xl ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
                {spot?.name ?? t("readingSpot.spotName")}
              </Text>
            </Pressable>

            <MapIcon color={getColors.getHexColor("dark-greon")}></MapIcon>
          </View>
        </View>
        <View className="h-14 w-14 flex flex-row gap-5 justify-center items-center rounded-md">
          <Pressable onPress={shareSpot} className="flex flex-row gap-3">
            <Text className="text-dark-greon">{t("readingSpot.shareSpot")}</Text>
            <Share color={getColors.getHexColor("dark-greon")} />
          </Pressable>
        </View>
      </View>
      <View className="min-h-[50px]">
        <MangaText addon="text-2xl">{spot.note}</MangaText>
      </View>
      <View className="flex justify-center flex-row gap-6">
        <Pressable onPress={editReadingSpot}>
          <Edit color={getColors.getHexColor("dark-greon")}></Edit>
        </Pressable>

        <Pressable onPress={remove}>
          <Delete color="red"></Delete>
        </Pressable>
      </View>
    </Card>
  );
}

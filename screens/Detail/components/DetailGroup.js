import GeneralCard from "../../../components/global/GeneralCard";
import SourceDropDown from "./SourceDropDown";
import ChaptersList from "./ChapterList";
import TitleCard from "./TitleCard";
import { ScrollView, Text, View } from "react-native";
import Synopsis from "./Synopsis";
import Progression from "./Progression";
import Card from "../../../components/global/Card";
import { CalendarDays } from "lucide-react-native";
import { useRoute } from "@react-navigation/core";
import { AxiosInstance } from "../../../helpers/AxiosInstance";
import { useContext, useEffect } from "react";
import GetColors from "../../../helpers/getColors";
import { ThemeContext } from "../../../context/Context";
import { MediaContext } from "../../../context/MediaContext";

export default function DetailGroup() {
  const [appTheme] = useContext(ThemeContext);
  const { setMediaDetail } = useContext(MediaContext);
  const route = useRoute();
  const getColors = GetColors;

  const { id } = route.params;

  const getMediaData = async () => {
    try {
      const response = await AxiosInstance.get(`/media/${id}`);
      setMediaDetail(response.data);
    } catch (error) {
      console.log("Detail error: ", error.message);
    }
  };

  useEffect(() => {
    getMediaData();
  }, []);

  return (
    <ScrollView className={`${getColors.getThemeString("bg-dark-background", appTheme)}`}>
      <View className="flex flex-1 gap-12 py-15">
        <TitleCard />

        <Progression />
        <Synopsis />
        <Card
          content={() => {
            return (
              <View className={`flex gap-3 `}>
                <Text
                  className={`${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
                  Latest release:
                </Text>
                <Text
                  className={`text-2xl ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
                  2 HOURS AGO
                </Text>
                <Text
                  className={`${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
                  Source
                </Text>
              </View>
            );
          }}
        />

        <ChaptersList />

        <SourceDropDown />

        <View className="flex w-full gap-4 mx-auto flex-row ">
          <GeneralCard
            custom="grow py-4"
            content={() => (
              <View className="flex gap-2 content-center justify-center items-center">
                <CalendarDays color={`${getColors.getHexColor("dark-greon", appTheme)}`} />
                <Text
                  className={`${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
                  RELEASED
                </Text>
                <Text
                  className={`text-2xl ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
                  2003
                </Text>
              </View>
            )}
          />

          <GeneralCard
            custom="grow py-4"
            content={() => (
              <View className="flex gap-2 content-center items-center">
                <CalendarDays color={`${getColors.getHexColor("dark-greon", appTheme)}`} />
                <Text
                  className={`${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
                  RELEASED
                </Text>
                <Text
                  className={`text-2xl ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
                  2003
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

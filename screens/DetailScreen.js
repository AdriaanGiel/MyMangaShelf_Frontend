import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import Synopsis from "../components/DetailScreen/Synopsis";
import Progression from "../components/DetailScreen/Progression";
import Card from "../components/global/Card";
import { ArrowLeft, CalendarDays, Menu } from "lucide-react-native";
import GeneralCard from "../components/global/GeneralCard";
import SourceDropDown from "../components/DetailScreen/SourceDropDown";
import ChaptersList from "../components/DetailScreen/ChapterList";
import TitleCard from "../components/DetailScreen/TitleCard";
import { useContext, useEffect, useState } from "react";
import GetColors from "../helpers/getColors";
import { ThemeContext } from "../context/Context";
import { useNavigation, useRoute } from "@react-navigation/core";
import { AxiosInstance } from "../helpers/AxiosInstance";
import { AuthContext } from "../context/AuthProvider";

/**
 *
 * @returns Manga detail screen
 */
export default function DetailScreen({ navigation }) {
  const [appTheme, setAppTheme] = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const tabNavigation = useNavigation();
  const [providers, setProviders] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [media, setMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProvider, setActiveProvider] = useState(null);

  const getColors = GetColors;

  const route = useRoute();

  const { id } = route.params;

  /**
   * Function to get chapters
   * @param {int} provider_id
   * @param {int} media_uri  
   */
  const getChapters = async (provider_id) => {
    setIsLoading(true);

    const provider = providers.filter((p) => {
      return p.id === provider_id;
    });

    setChapters(provider[0].media_provider[0].chapter_list);
    setActiveProvider(provider[0].id);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // try {
    //     AxiosInstance
    //         .defaults
    //         .headers
    //         .common['Authorization'] = `Bearer ${user.token}`;

    //     const response = await AxiosInstance.post("/get-chapters",{
    //         provider_id, media_uri
    //     })

    //     setChapters(response.data);
    //     setIsLoading(false);
    // } catch (error) {

    //     console.log("get chapters: ", error.response);
    //     console.log("get headers: ", error.response.message);

    // }
  };

  /**
   * Function to get media details
   */
  const getMediaData = async () => {
    try {
      const response = await AxiosInstance.get(`/media/${id}`);

      setMedia(response.data);
      setProviders(response.data.providers);
      setIsLoading(false);
    } catch (error) {
      console.log("Detail error: ", error.message);
    }
  };

  // console.log("changed: ", route.name);
  //TODO FiX BACK BUTTON ONLY ON DETAIL SCREEN

  useEffect(() => {
    // navigation.setOptions({     headerLeft: () => (            <View
    // className="flex flex-row">             <Pressable onPress={() =>
    // tabNavigation.navigate("Explore")}>                 <ArrowLeft
    // color={getColors.getHexColor("dark-greon", appTheme)}/>
    // </Pressable>             <Pressable onPress={() => navigation.openDrawer()}
    // className="pl-4">             <Menu
    // color={getColors.getHexColor("dark-greon", appTheme)}/>         </Pressable>
    // </View>     ) })

    // Get media info on start
    getMediaData();
  }, []);

  /**
   * Function to show loading screen when fetching chapters
   * @returns correct view
   */
  const LoadPage = () => {
    if (isLoading) {
      return (
        <View
          className={`${getColors.getThemeString("bg-dark-background", appTheme)} h-full flex justify-center items-center`}>
          <ActivityIndicator size={50} color={getColors.getHexColor("dark-greon", appTheme)} />
        </View>
      );
    }

    return (
      <ScrollView className={`${getColors.getThemeString("bg-dark-background", appTheme)}`}>
        <View className="flex flex-1 gap-12 py-15">
          <TitleCard media={media} />

          <Progression />
          <Synopsis description={media?.description} />
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
          <SourceDropDown active={activeProvider} providers={providers} chapters={getChapters} />

          <ChaptersList chapters={chapters} />

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
  };

  return <LoadPage />;
}

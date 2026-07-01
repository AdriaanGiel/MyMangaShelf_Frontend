import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import MediaResource from "../resources/MediaResource";
import StandardMediaList from "../components/HomeScreen/StandardMediaList";
import { SearchBar } from "react-native-elements";
import ShelfStorage from "../helpers/Storage";
import GetColors from "../helpers/getColors";
import { ThemeContext } from "../context/Context";
import { useUnstableNativeVariable, vars } from "nativewind";
import { AxiosInstance } from "../helpers/AxiosInstance";

/**
 *
 * @returns Explore screen
 */
export default function ExploreScreen() {
  const [media, setMedia] = useState([]);
  const [nextPage, setNextPage] = useState(2);
  const [prevPage, setPrevPage] = useState(1);
  const [search, setSearch] = useState("");
  const [folders, setFolders] = useState();
  const [clear, setClear] = useState(false);

  const mediaResource = new MediaResource();
  const appStorage = ShelfStorage;
  const [appTheme, setAppTheme] = useContext(ThemeContext);
  const getColors = GetColors;

  async function getSearchResults() {
    try {
      const response = await AxiosInstance.get("/media?search=" + search);

      setMedia(response.data.data);
    } catch (error) {
      console.log("search attept error:", error.message);
    }

    console.log();
  }

  async function getNextPageOfManga(direction) {
    let page = prevPage;

    if (direction == "next") {
      page = nextPage;
    }

    const mediaData = await mediaResource.getMediaList(`?page=${page}`);
    setMedia(mediaData.data);

    const path = `${mediaData.path}?page=`;

    const prevUri = mediaData.prev_page_url;

    setPrevPage(prevUri.replace(`${mediaData.path}?page=`, ""));

    const nextUri = mediaData.next_page_url;
    setNextPage(nextUri.replace(`${mediaData.path}?page=`, ""));
  }

  /**
   *
   * @returns conditional rendering for loading before showing the manga list
   */
  function IsLoading() {
    if (!media) {
      return (
        <View className="bg-red h-96 self-center justify-center items-center">
          <ActivityIndicator size={30} color={getColors.getHexColor("dark-greon", appTheme)} />
        </View>
      );
    }

    return <StandardMediaList folders={folders} items={media} paginate={getNextPageOfManga} />;
  }

  useEffect(() => {
    /**
     * Async function to get manga list from server and set folders from appstorage
     */
    async function getResource() {
      const mediaData = await mediaResource.getMediaList();

      setMedia(mediaData.data);

      const prevUri = mediaData.prev_page_url;
      setPrevPage(prevUri.replace(`${mediaData.path}?page=`, ""));

      const nextUri = mediaData.next_page_url;
      setNextPage(nextUri.replace(`${mediaData.path}?page=`, ""));

      const data = await appStorage.getData("folders");

      setFolders(JSON.parse(data));
    }

    getResource();
  }, [clear]);

  return (
    <View
      className={`flex flex-1 gap-2 py-2 ${getColors.getThemeString("bg-dark-background", appTheme)}`}>
      <Text
        className={`text-6xl ${getColors.getThemeString("color-dark-standard-text", appTheme)}`}>
        Explore
      </Text>

      <SearchBar
        placeholder="Search comix"
        onChangeText={(v) => setSearch(v)}
        value={search}
        onSubmitEditing={getSearchResults}
        onClear={() => setClear(!clear)}
        containerStyle={{
          backgroundColor: getColors.getHexColor("dark-background", appTheme),
          borderWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{
          backgroundColor: getColors.getHexColor("dark-input", appTheme),
        }}
      />

      <IsLoading />
    </View>
  );
}

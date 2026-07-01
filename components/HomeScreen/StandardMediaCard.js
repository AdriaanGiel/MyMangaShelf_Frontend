import { ScrollView, ImageBackground, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MediaListResource from "../../resources/MediaListResource";
import { X } from "lucide-react-native";
import { useContext, useState } from "react";
import GetColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";
import { AuthContext } from "../../context/AuthProvider";

export default function StandardMediaCard({ item, folders }) {
  const mediaResource = new MediaListResource();
  const media = item;
  const Navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const foldersList = folders;
  const [appTheme] = useContext(ThemeContext);
  const getColors = GetColors;
  const { user, listChange, setListChange } = useContext(AuthContext);

  const toggleSmallModal = () => {
    setOpen(!open);
  };

  const goToDetailPage = (id) => {
    Navigation.navigate("Detail", { id });
  };

  const addMedia = async (media, folder) => {
    await mediaResource.addMediaToListLocal(media, folder);

    if (user !== null) {
      await mediaResource.addMediaToList(media.id, folder, user.token);
      setListChange(!listChange);
    }

    toggleSmallModal();
  };

  const SmallModal = () => {
    if (open) {
      return (
        <View className="absolute z-30 w-full flex justify-center items-center h-full bottom-0 right-0">
          <View className="bg-black w-full h-full absolute opacity-50"></View>

          <ScrollView nestedScrollEnabled={true} className="bg-black max-h-40 w-full flex ">
            {foldersList.map((folder) => (
              <Pressable onPress={() => addMedia(media, folder)} key={folder.id}>
                <Text className="text-white text-3xl py-2">{folder.name}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <Pressable onPress={toggleSmallModal} className=" p-2 bg-purple-400 rounded-md">
            <Text className="color-white text-4xl">Cancel</Text>
          </Pressable>
        </View>
      );
    }

    return null;
  };

  return (
    <Pressable
      onLongPress={toggleSmallModal}
      onPress={() => goToDetailPage(media.id)}
      className={`flex gap-3 w-48 shadow-sm rounded-xl ${getColors.getThemeString("bg-dark-card", appTheme)}`}>
      <View className="bg-green-600 w-48 h-64 relative">
        <ImageBackground
          source={require("../../assets/images/placeholder.jpg")}
          resizeMode="cover"
          className="flex absolute h-full w-full  z-10 flex-1 justify-center">
          <View className="w-full h-full bg-dark-greon opacity-40"></View>
        </ImageBackground>
        <ImageBackground
          source={{
            uri: media.cover,
          }}
          resizeMode="cover"
          className="flex z-20 absolute h-full w-full flex-1 justify-center"></ImageBackground>
      </View>
      <View className="px-2 pb-2">
        <Text
          className={`text-xl font-bold ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
          {media.title}
        </Text>
        <View className="flex flex-row justify-between">
          <Text
            className={`font-bold ${getColors.getThemeString("text-dark-neutral-text", appTheme)}`}>
            Volumes: {media.volumes}
          </Text>
          <Text
            className={`font-bold ${getColors.getThemeString("text-dark-neutral-text", appTheme)}`}>
            {media.published_year}
          </Text>
        </View>
      </View>
      <SmallModal />
    </Pressable>
  );
}

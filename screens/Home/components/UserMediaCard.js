import { ActivityIndicator, ImageBackground, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MediaListResource from "../../../resources/MediaListResource";
import { X } from "lucide-react-native";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../context/Context";
import GetColors from "../../../helpers/getColors";
import { AuthContext } from "../../../context/AuthProvider";

export default function UserMediaCard({ item, index, removeFunc }) {
  const mediaResource = new MediaListResource();
  const [isLoading, setIsLoading] = useState(false);
  const media = item.media;
  const Navigation = useNavigation();
  const [remove, setRemove] = useState(false);
  const [appTheme] = useContext(ThemeContext);
  const getColors = GetColors;
  const { user, listChange, setListChange } = useContext(AuthContext);

  const toggleSmallModal = () => {
    setRemove(!remove);
  };

  const goToDetailPage = (id) => {
    Navigation.navigate("Detail", { id });
  };

  const removeMedia = async (id) => {
    setIsLoading(true);
    await mediaResource.removeMediaFromList(id, user.token);

    setIsLoading(false);
    setListChange(!listChange);
    setRemove(false);
    removeFunc(id);
  };

  const SmallModal = () => {
    if (remove) {
      return (
        <View className="absolute w-full z-30 flex justify-center items-center h-full bottom-0 right-0">
          <View className="bg-black w-full h-full absolute opacity-50"></View>
          <Pressable onPress={() => removeMedia(media.id)} className="bg-red-500 rounded-full p-2">
            <X size={60} />
          </Pressable>

          <Pressable onPress={toggleSmallModal} className="mt-20 p-2 bg-purple-400 rounded-md">
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
      className={`flex gap-3 w-48 ${getColors.getThemeString("bg-dark-card", appTheme)} shadow-sm rounded-xl`}>
      <View className="bg-green-600 w-48 h-60 ">
        <ImageBackground
          source={require("../../../assets/images/placeholder.jpg")}
          resizeMode="cover"
          className="flex absolute h-full w-full  z-10 flex-1 justify-center">
          <View className="w-full h-full bg-dark-greon opacity-40"></View>
        </ImageBackground>
        <ImageBackground
          source={{ uri: media.cover }}
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
      {isLoading ? (
        <View className="w-full h-full flex justify-center items-center">
          <ActivityIndicator color={`${getColors.getHexColor("dark-greon")}`}></ActivityIndicator>
        </View>
      ) : (
        <SmallModal />
      )}
    </Pressable>
  );
}

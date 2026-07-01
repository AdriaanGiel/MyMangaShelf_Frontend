import { ImageBackground, View, Text } from "react-native";
import GeneralCard from "../global/GeneralCard";
import { useContext } from "react";
import GetColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";

export default function TitleCard({media}) {

    const [appTheme, setAppTheme] = useContext(ThemeContext);
    const mediaDetail = media;
    
    const getColors = GetColors;

  return (
    <View>
      <View className="w-full h-96 ">
        <ImageBackground
          // source={require("../../assets/images/onepunch.jpeg")}
          source={{uri: mediaDetail.cover}}
          resizeMode="cover"
          className="flex flex-1 justify-center"
        >
            <View className={`w-full h-full  ${getColors.getThemeString('bg-dark-background',appTheme)} opacity-50 absolute`}>

            </View>
          <View className="h-full  flex mx-auto w-11/12 gap-5 py-4 justify-end">
            <View className="flex flex-wrap gap-1">
              { mediaDetail.tags?.map((tag,index) =>     <GeneralCard
                key={tag.id}
                custom=""
                content={() => (
                    //TODO make pressable
                  <Text className={`py-2 px-4 ${getColors.getThemeString('text-dark-standard-text',appTheme)}`}>{ tag.name}</Text>
                )}
              />) }
            </View>

            <View>
                <Text className={`font-bold text-5xl ${getColors.getThemeString('text-dark-standard-text',appTheme)}`}>{ mediaDetail.title }</Text>
            </View>

            <View className="flex flex-row gap-6">
                <View>
                    <Text className={`${getColors.getThemeString('text-dark-neutral-text',appTheme)}`} >Author</Text>
                    <Text className={`font-semibold text-2xl ${getColors.getThemeString('text-dark-standard-text',appTheme)}`}>Kaito nakamura</Text>
                </View>

                  <View>
                    <Text className={`${getColors.getThemeString('text-dark-neutral-text',appTheme)}`} >Status</Text>
                    <Text className={`font-semibold text-2xl ${getColors.getThemeString('text-dark-active-text',appTheme)}`}>Ongoing</Text>
                </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

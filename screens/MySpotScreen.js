import { FlatList, Platform, Pressable, Share, Text, View } from "react-native";
import getColors from "../helpers/getColors";
import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/Context";
import ReadingSpot from "../components/ReadingSpot/ReadingSpot";
import { ScrollView } from "react-native-gesture-handler";
import { CustomFlatList } from "../components/global/CustomFlatList";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import Storage from "../helpers/Storage";
import IsLoading from "../components/global/IsLoading";
import MyReadingSpot from "../components/ReadingSpot/MyReadingSpot";

export default function MySpotScreen() {
  const [appTheme] = useContext(ThemeContext);
  const [myLocations, setMyLocations] = useState();

  const Navigation = useNavigation();

  const getMyLocationsFromStorage = async () => {
    let spots = await Storage.getData("user_spots");

    if (!spots || spots === undefined) {
      spots = [];
    }

    setMyLocations(spots);
  };

  const SpotsItems = () => {
    if (!myLocations.length) {
      return (
        <Text
          className={`${appTheme ? "text-dark-standard-text" : "text-light-standard-text"} text-3xl`}>
          You have not added any spots yet
        </Text>
      );
    }

    return myLocations.map((spot, index) => (
      <MyReadingSpot key={spot.name} spot={spot}></MyReadingSpot>
    ));
  };

  const shareLocation = async (spot) => {
    const title = "MyMangaShelf Spot";
    const message = "Spot note";
    const url = "https://maps.google.com/maps?z=12&t=m&q=loc:38.9419+-78.3020";

    try {
      const result = await Share.share({
        title: title,
        message: Platform.OS === "android" ? `${message}\n\n${url}` : message,
        url: Platform.OS === "ios" ? url : undefined,
        dialogTitle: title,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useFocusEffect(() => {
    // getMyLocationsFromStorage();
  });

  useEffect(() => {
    getMyLocationsFromStorage();
  }, []);

  const showSpotOnMap = (spot) => {
    Navigation.navigate("reading spots", { params: { spot: spot } });
  };

  return (
    <IsLoading state={!myLocations}>
      <ScrollView
        className={`flex flex-1 gap-5  py-2 ${getColors.getThemeString("bg-dark-background", appTheme)}`}>
        <Pressable className="p-5 bg-red-600" onPress={shareLocation}>
          <Text>Press Me</Text>
        </Pressable>
        <View className="flex flex-1 gap-3">
          <SpotsItems />
        </View>
      </ScrollView>
      {/* <View className={`flex h-full py-4 gap-4 items-center px-2 ${getColors.getThemeString("bg-dark-background", appTheme)}`}>
                <CustomFlatList
                    contentContainerClassName="flex h-full  gap-4" 
                    data={myLocations} 
                    renderItem={({item,i}) => <ReadingSpot readingSpotAction={() => showSpotOnMap(item)} key={item.name} spot={item}></ReadingSpot>}
                    keyExtractor={(item,index) => item.name}
                />  

            </View> */}
    </IsLoading>
  );
}

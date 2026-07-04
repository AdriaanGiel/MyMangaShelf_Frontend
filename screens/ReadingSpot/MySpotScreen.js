import { Text, View } from "react-native";
import getColors from "../../helpers/getColors";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Context";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import Storage from "../../helpers/Storage";
import IsLoading from "../../components/global/IsLoading";
import MyReadingSpot from "./components/MyReadingSpot";
import { ReadingSpotsContext } from "../../context/ReadingSpotsContext";
import { useTranslation } from "react-i18next";

export default function MySpotScreen() {
  const [appTheme] = useContext(ThemeContext);
  const { t } = useTranslation();
  const { readingSpots, setReadingSpots, setSpotToEdit } = useContext(ReadingSpotsContext);

  const Navigation = useNavigation();

  const getMyLocationsFromStorage = async () => {
    let spots = await Storage.getData("user_spots");

    if (!spots || spots === undefined) {
      spots = [];
    }

    // setMyLocations(spots);
    setReadingSpots(spots);
  };

  const deleteLocation = async (id) => {
    const deleted = readingSpots.filter((location) => {
      return location.id !== id;
    });

    const spots = await Storage.addData("user_spots", deleted);
    const newList = await Storage.getData("user_spots");

    setReadingSpots(newList);
  };

  const SpotsItems = () => {
    if (!readingSpots.length) {
      return (
        <Text
          className={`${appTheme ? "text-dark-standard-text" : "text-light-standard-text"} text-3xl`}>
          You have not added any spots yet
        </Text>
      );
    }

    return readingSpots.reverse().map((spot, index) => (
      <MyReadingSpot
        key={spot.name}
        spot={spot}
        editSpot={() => {
          setSpotToEdit(readingSpots.find((s) => s.id === spot.id));
          Navigation.navigate(t("readingSpot.addSpot"));
        }}
        deleteSpot={() => deleteLocation(spot.id)}></MyReadingSpot>
    ));
  };

  useEffect(() => {
    getMyLocationsFromStorage();

    const emptyEdit = Navigation.addListener("focus", () => {
      setSpotToEdit(null);
    });
  }, []);

  const showSpotOnMap = (spot) => {
    Navigation.navigate("reading spots", { spot: spot });
  };

  return (
    <IsLoading state={!readingSpots}>
      <ScrollView
        className={`flex flex-1 gap-5  py-2 ${getColors.getThemeString("bg-dark-background", appTheme)}`}>
        <View className="flex flex-1 gap-3">
          <SpotsItems />
        </View>
      </ScrollView>
    </IsLoading>
  );
}

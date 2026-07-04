import { View, Text, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import MapView, { LocalTile, Marker } from "react-native-maps";
import getColors from "../../helpers/getColors";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/Context";
import ReadingSpot from "./components/ReadingSpot";

import GeneralCard from "../../components/global/GeneralCard";
import IsLoading from "../../components/global/IsLoading";
import ReadingMarker from "./components/ReadingMarker";
import { CustomFlatList } from "../../components/global/CustomFlatList";
import MapViewDirections from "react-native-maps-directions";
import Storage from "../../helpers/Storage";

import NetInfo from "@react-native-community/netinfo";
import { ReadingSpotsContext } from "../../context/ReadingSpotsContext";
import { useTranslation } from "react-i18next";

// import {GoogleMaps, AppleMaps} from "expo-maps";

/**
 *
 * @returns Index screen for reading spots
 */
export default function ReadingSpotScreen() {
  const [appTheme] = useContext(ThemeContext);
  const mapRef = useRef(null);
  const { location } = useContext(ReadingSpotsContext);
  const [ratings, setRatings] = useState();
  const [locations, setLocations] = useState();
  const [destination, setDestination] = useState();
  const [connection, setConnection] = useState(true);
  const Route = useRoute();
  const { t } = useTranslation();
  const Navigation = useNavigation();

  const localTiles = "../../assets";

  /**
   * Initial region to show on map
   */
  const rotterdam = {
    latitude: 51.9244,
    longitude: 4.4777,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };

  /**
   * Function to show readingspot on the map when pressed
   * @param {object} spot
   */
  const handleSpotPress = (spot) => {
    setNewDestination({ latitude: spot.latitude, longitude: spot.longitude });

    mapRef.current.animateCamera({
      center: {
        latitude: Number(spot.latitude),
        longitude: Number(spot.longitude),
      },
      pitch: 0,
      altitude: 1400,
      zoom: 15,
    });
  };

  /**
   * Function to check if there is a internet connection, and determine how to fetch the reading spots
   * @param {function} callback
   * @param {function} secondCallback
   */
  const checkIfInternetConnection = async (callback, secondCallback) => {
    const connection = await NetInfo.fetch();

    setConnection(connection.isConnected);

    if (connection.isConnected) {
      callback();
    } else {
      secondCallback();
    }
  };

  /**
   * Function to show a list of reading spots, when loaded.
   * @returns loader || A list of reading spots
   */
  const LoadingReadingSpots = () => {
    if (!locations) {
      return (
        <GeneralCard custom={`${appTheme ? "bg-light-card" : "bg-dark-card"} w-full px-2 py-4`}>
          <Text className={`${appTheme ? "text-light-standard-text" : "text-dark-standard-text"}`}>
            Getting reading spots ...
          </Text>
        </GeneralCard>
      );
    }

    return (
      <CustomFlatList
        contentContainerClassName="flex  gap-4 justify-center"
        className=" w-full h-[60%]"
        data={locations}
        renderItem={({ item, i }) => (
          <ReadingSpot
            readingSpotAction={() => handleSpotPress(item)}
            key={item.id}
            rating={ratings[item.id]}
            spot={item}></ReadingSpot>
        )}
        keyExtractor={(item, index) => index}></CustomFlatList>
    );
  };

  /**
   * Function to get reading spots from local storage, incase there is no internet connection.
   */
  const getReadingLocationsFromStorage = async () => {
    let readingSpots = await Storage.getData("reading_spots");

    if (readingSpots === undefined) {
      readingSpots = [];
    }

    setLocations(readingSpots);
  };

  /**
   * Function to set a new destination on the map
   * @param {object} spot
   */
  const setNewDestination = (spot) => {
    setDestination(spot);
  };

  /**
   * Method to show the reading location markers on the map, when they are loaded
   * @returns null || A list of reading markers
   */
  const LoadInMarkers = () => {
    if (!locations) {
      return;
    }

    return locations.map((spot, key) => (
      <ReadingMarker key={key} location={spot} onMarkerPress={handleSpotPress} />
    ));
  };

  /**
   * Function to fetch the reading locations from online source
   */
  const getReadingLocations = async () => {
    try {
      const response = await fetch("https://adriaangiel.github.io/data/mocklocations.json");

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();

      setLocations(result);
    } catch (error) {
      console.log("get locations: ", error.message);
    }
  };

  /**
   * Function to get ratings from storage
   */
  const getRatingsFromStorage = async () => {
    let ratings = await Storage.getData("spot_ratings");

    if (ratings === undefined) {
      ratings = {};
    }

    setRatings(ratings);
  };

  /**
   * Function to handle showing user spot on the map, navigated from my spots screen.
   */
  const showMySpotOnMap = () => {
    if (Route.params && mapRef.current) {
      let spot = Route.params.spot;
      handleSpotPress({ latitude: spot.latitude, longitude: spot.longitude });
    }
  };

  useEffect(() => {
    /**
     * Event listener to check if this screen is in focus
     */
    Navigation.addListener("focus", () => {
      showMySpotOnMap();
    });

    getRatingsFromStorage();

    checkIfInternetConnection(
      () => {
        getReadingLocations();
      },
      () => {
        getReadingLocationsFromStorage();
        setLocation({ connection: "no internet" });
      }
    );
  }, []);

  const followUser = (l) => {
    if (destination) {
      mapRef.current?.animateToRegion(
        {
          latitude: l.latitude,
          longitude: l.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  return (
    <IsLoading state={!location}>
      <View
        className={`flex py-4 gap-4 items-center px-2 ${getColors.getThemeString("bg-dark-background", appTheme)}`}>
        {/* <ConnectionMapView /> */}

        {!connection ? (
          <View className="w-full h-[300px] bg-gray-500 flex justify-center items-center">
            <Text className="text-2xl">Map is not functional offline</Text>
          </View>
        ) : (
          <MapView
            loadingEnabled={true}
            userInterfaceStyle="dark"
            zoom={12}
            ref={mapRef}
            style={{
              width: "100%",
              height: 300,
            }}
            showsCompass={true}
            zoomEnabled={true}
            initialCamera={{
              center: location,
              zoom: 12,
              pitch: 0,
              heading: 0,
            }}
            showsUserLocation={true}
            userLocationPriority={"low"}
            // onUserLocationChange={(e) => followUser(e.nativeEvent.coordinate)}
            customMapStyle={appTheme ? lightMapStyle : mapStyle}>
            <LocalTile pathTemplate={`${localTiles}/tiles/{z}/{x}/{y}.png`} tileSize={256} />
            <LoadInMarkers></LoadInMarkers>

            <MapViewDirections
              origin={location}
              destination={destination}
              apikey={process.env.GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor={getColors.getHexColor("dark-greon")}
            />
          </MapView>
        )}

        <View className={`w-full flex gap-2 `}>
          <Text
            className={`text-2xl p-2 py-4 ${getColors.getThemeString("bg-dark-card", appTheme)} ${getColors.getThemeString("color-dark-neutral-text", appTheme)}`}>
            Reading spots near you
          </Text>
        </View>

        <LoadingReadingSpots></LoadingReadingSpots>
      </View>
      {/* </ScrollView> */}
    </IsLoading>
  );
}

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

const lightMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];

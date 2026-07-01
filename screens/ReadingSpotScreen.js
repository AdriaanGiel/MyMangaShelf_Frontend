import { View, Text, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import MapView, { Marker } from "react-native-maps";
import getColors from "../helpers/getColors";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/Context";
import ReadingSpot from "../components/ReadingSpot/ReadingSpot";
import * as Location from "expo-location";
import GeneralCard from "../components/global/GeneralCard";
import IsLoading from "../components/global/IsLoading";
import ReadingMarker from "../components/ReadingSpot/ReadingMarker";
import { CustomFlatList } from "../components/global/CustomFlatList";
import MapViewDirections from "react-native-maps-directions";
import Storage from "../helpers/Storage";
import NetInfo from "@react-native-community/netinfo";

// import {GoogleMaps, AppleMaps} from "expo-maps";

/**
 *
 * @returns Index screen for reading spots
 */
export default function ReadingSpotScreen() {
  const [appTheme] = useContext(ThemeContext);
  const mapRef = useRef(null);
  const [location, setLocation] = useState();
  const [ratings, setRatings] = useState();
  const [locations, setLocations] = useState();
  const [destination, setDestination] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [Loading, setLoading] = useState(true);
  const [connection, setConnection] = useState(true);
  const Route = useRoute();
  const Navigation = useNavigation();

  const rotterdam = {
    latitude: 51.9244,
    longitude: 4.4777,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  async function getCurrentLocation() {
    const { status: currentStatus } = await Location.getForegroundPermissionsAsync();
    let finalStatus = currentStatus;

    // Only request if we don't already have permission
    if (currentStatus !== "granted") {
      const { status: requestedStatus } = await Location.requestForegroundPermissionsAsync();
      finalStatus = requestedStatus;
    }
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
      mayShowUserSettingsDialog: true,
    });

    setLocation(currentLocation);
    setLoading(false);
  }

  const handleSpotPress = (spot) => {
    setNewDestination({ latitude: spot.latitude, longitude: spot.longitude });

    mapRef.current.animateCamera({
      center: {
        latitude: spot.latitude,
        longitude: spot.longitude,
      },
      pitch: 0,
      altitude: 1400,
      zoom: 15,
    });
  };

  const checkIfInternetConnection = async (callback, secondCallback) => {
    const connection = await NetInfo.fetch();

    setConnection(connection.isConnected);

    if (connection.isConnected) {
      callback();
    } else {
      secondCallback();
    }
  };

  const LoadingReadingSpots = () => {
    if (!locations) {
      return (
        <GeneralCard custom={`${appTheme ? "bg-white" : "bg-dark-card"} w-full px-2 py-4`}>
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

  const getReadingLocationsFromStorage = async () => {
    let readingSpots = await Storage.getData("reading_spots");

    if (readingSpots === undefined) {
      readingSpots = [];
    }

    setLocation(readingSpots);
  };

  const setNewDestination = (spot) => {
    console.log("doublePress");

    setDestination(spot);
  };

  const LoadInMarkers = () => {
    if (!locations) {
      return;
    }

    return locations.map((spot, key) => (
      <ReadingMarker key={key} location={spot} onMarkerPress={handleSpotPress} />
    ));
  };

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

  const getRatingsFromStorage = async () => {
    let ratings = await Storage.getData("spot_ratings");

    if (ratings === undefined) {
      ratings = {};
    }

    setRatings(ratings);
  };

  useEffect(() => {
    if (Route.params) {
      let spot = Route.params.spot;
      handleSpotPress({ latitude: spot.latitude, longitude: spot.longitude });
    }

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

    getCurrentLocation();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const ConnectionMapView = () => {
    if (!connection) {
      return (
        <View className="w-full h-[300px] bg-gray-500 flex justify-center items-center">
          <Text className="text-2xl">Map is not functional offline</Text>
        </View>
      );
    }

    return (
      <MapView
        loadingEnabled={true}
        userInterfaceStyle="dark"
        zoom={10}
        ref={mapRef}
        style={{
          width: "100%",
          height: "300",
        }}
        showsCompass={true}
        zoomEnabled={true}
        initialRegion={rotterdam}
        showsUserLocation={true}
        userLocationPriority={"low"}
        // onUserLocationChange={(e) => setInitSpotLocation(e.nativeEvent.coordinate)}
        customMapStyle={appTheme ? lightMapStyle : mapStyle}>
        <LoadInMarkers></LoadInMarkers>

        <MapViewDirections
          origin={location?.coords}
          destination={destination}
          apikey={process.env.GOOGLE_API_KEY}
          strokeWidth={3}
          strokeColor={getColors.getHexColor("dark-greon")}
        />
      </MapView>
    );
  };

  return (
    <IsLoading state={!location}>
      <View
        className={`flex py-4 gap-4 items-center px-2 ${getColors.getThemeString("bg-dark-background", appTheme)}`}>
        <ConnectionMapView />

        <View className={`w-full flex gap-2 `}>
          <Text
            className={`text-2xl p-2 py-4 ${getColors.getThemeString("bg-dark-card", appTheme)} ${getColors.getThemeString("color-dark-neutral-text", appTheme)}`}>
            Reading spots near you
          </Text>
        </View>

        {/* <ReadingSpot color="test" width="w-full"/> */}

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

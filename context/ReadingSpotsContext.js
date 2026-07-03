import { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export const ReadingSpotsContext = createContext();

export const ReadingSpotsProvider = ({ children }) => {
  const [readingSpots, setReadingSpots] = useState(null);
  const [spotToEdit, setSpotToEdit] = useState(null);
  const [location, setLocation] = useState();

  const getCurrentLocation = async () => {
    const { status: currentStatus } = await Location.getForegroundPermissionsAsync();
    let finalStatus = currentStatus;

    // Only request if we don't already have permission
    if (currentStatus !== "granted") {
      const { status: requestedStatus } = await Location.requestForegroundPermissionsAsync();
      finalStatus = requestedStatus;
      console.log("passed");
    }
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
      mayShowUserSettingsDialog: true,
    });

    setLocation(currentLocation.coords);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <ReadingSpotsContext.Provider
      value={{
        readingSpots,
        setReadingSpots,
        spotToEdit,
        setSpotToEdit,
        location,
      }}>
      {children}
    </ReadingSpotsContext.Provider>
  );
};

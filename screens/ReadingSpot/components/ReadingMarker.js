import { useTranslation } from "react-i18next";
import { Image } from "react-native-elements";
import { Marker } from "react-native-maps";

export default function ReadingMarker({ location, onMarkerPress }) {
  const { t } = useTranslation();
  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      title={location.name}
      description={t("readingSpot.spotName")}
      onPress={() =>
        onMarkerPress({
          latitude: location.latitude,
          longitude: location.longitude,
        })
      }>
      <Image
        source={require("../../../assets/images/5078755.png")}
        style={{
          height: 35,
          width: 35,
        }}></Image>
    </Marker>
  );
}

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ReadingSpot from "../ReadingSpot/ReadingSpotScreen";
import getColors from "../../helpers/getColors";
import { useContext } from "react";
import { Map, MapPinned, MapPinPlus } from "lucide-react-native";
import MySpotScreen from "../ReadingSpot/MySpotScreen";
import AddSpotScreen from "../ReadingSpot/AddSpotScreen";
import { ThemeContext } from "../../context/Context";
import { ReadingSpotsProvider } from "../../context/ReadingSpotsContext";
import { useTranslation } from "react-i18next";

/**
 *
 * @returns Stack of screens for the readingspot functionality
 */
export default function ReadingSpotStack() {
  const Tab = createBottomTabNavigator();
  const [appTheme] = useContext(ThemeContext);
  const { t } = useTranslation();

  const greon = getColors.getHexColor("dark-greon");

  const TabStyling = {
    tabBarStyle: {
      backgroundColor: getColors.getHexColor("dark-card", appTheme),
    },
    headerShown: false,
  };

  return (
    <ReadingSpotsProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: getColors.getHexColor("dark-greon", appTheme),
          tabBarInactiveTintColor: getColors.getHexColor("dark-neutral-text", appTheme),
        }}>
        <Tab.Screen
          name={t("navigation.readingSpots")}
          component={ReadingSpot}
          options={{ ...TabStyling, tabBarIcon: () => <Map color={greon} /> }}
        />
        <Tab.Screen
          name={t("readingSpot.mySpots")}
          component={MySpotScreen}
          options={{ ...TabStyling, tabBarIcon: () => <MapPinned color={greon} /> }}
        />
        <Tab.Screen
          name={t("readingSpot.addSpot")}
          component={AddSpotScreen}
          options={{ ...TabStyling, tabBarIcon: () => <MapPinPlus color={greon} /> }}
        />
      </Tab.Navigator>
    </ReadingSpotsProvider>
  );
}

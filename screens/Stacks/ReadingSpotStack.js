import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ReadingSpot from "../ReadingSpotScreen";
import getColors from "../../helpers/getColors";
import { useContext } from "react";
import { Map, MapPinned, MapPinPlus } from "lucide-react-native";
import MySpotScreen from "../MySpotScreen";
import AddSpotScreen from "../AddSpotScreen";
import { ThemeContext } from "../../context/Context";

/**
 * 
 * @returns Stack of screens for the readingspot functionality
 */
export default function ReadingSpotStack() {
    const Tab = createBottomTabNavigator();
    const [appTheme] = useContext(ThemeContext);

    const greon = getColors.getHexColor("dark-greon");
    
  const TabStyling = {
    tabBarStyle: {
        backgroundColor: getColors.getHexColor('dark-card',appTheme)
    }, 
    headerShown: false
}


    return <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: getColors.getHexColor('dark-greon',appTheme),
        tabBarInactiveTintColor: getColors.getHexColor('dark-neutral-text',appTheme),
    }} >
      <Tab.Screen name="reading spots"  component={ReadingSpot} options={{...TabStyling,tabBarIcon: () => <Map color={greon} /> }}/> 
      <Tab.Screen name="my spots" component={MySpotScreen} options={{...TabStyling,tabBarIcon: () => <MapPinned color={greon} /> }}/> 
      <Tab.Screen name="add spot" component={AddSpotScreen} options={{...TabStyling, tabBarIcon: () => <MapPinPlus  color={greon} /> }} /> 
    </Tab.Navigator>
}
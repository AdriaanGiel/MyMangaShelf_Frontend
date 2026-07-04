import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Home/HomeScreen";
import SettingsScreen from "../Settings/SettingsScreen";
import { BookOpenText, Compass, SquarePlus } from "lucide-react-native";
import ExploreScreen from "../Explore/ExploreScreen";
import AddProviderScreen from "../Provider/AddProviderScreen";
import LoginScreen from "../Authentication/LoginScreen";
import GetColors from "../../helpers/getColors";
import { useContext } from "react";
import { ThemeContext } from "../../context/Context";
import { UserMediaProvider } from "../../context/UserMediaListProvider";
import { useTranslation } from "react-i18next";

/**
 *
 * @returns Screens that use the tab layout
 */
export default function IndexTabScreen() {
  const Tab = createBottomTabNavigator();
  const [appTheme, setAppTheme] = useContext(ThemeContext);
  const getColor = GetColors;
  const greon = getColor.getHexColor("dark-greon", appTheme);
  const { t } = useTranslation();

  const TabStyling = {
    tabBarStyle: {
      backgroundColor: getColor.getHexColor("dark-card", appTheme),
    },
    headerShown: false,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: getColor.getHexColor("dark-greon", appTheme),
        tabBarInactiveTintColor: getColor.getHexColor("dark-neutral-text", appTheme),
      }}>
      <Tab.Screen
        name={t("navigation.list")}
        component={HomeScreen}
        options={{ ...TabStyling, tabBarIcon: () => <BookOpenText color={greon} /> }}
      />
      <Tab.Screen
        name={t("navigation.explore")}
        component={ExploreScreen}
        options={{ ...TabStyling, tabBarIcon: () => <Compass color={greon} /> }}
      />
      <Tab.Screen
        name={t("providers.addSource")}
        component={AddProviderScreen}
        options={{ ...TabStyling, tabBarIcon: () => <SquarePlus color={greon} /> }}
      />
    </Tab.Navigator>
  );
}

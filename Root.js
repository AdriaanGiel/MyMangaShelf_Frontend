import "./global.css";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import StandardData from "./resources/StandardData";
import ShelfStorage from "./helpers/Storage.js";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GetColors from "./helpers/getColors";
import { ThemeContext } from "./context/Context";
import DrawerStack from "./screens/Stacks/DrawerStack";
import { AuthContext } from "./context/AuthProvider";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import * as SecureStore from "expo-secure-store";

export const Stack = createStackNavigator();

const standardData = new StandardData();
const appStorage = ShelfStorage;
export const Drawer = createDrawerNavigator();
export const getColors = GetColors;

const theme = appStorage.getData("theme");

/**
 *
 * @returns Main react native app
 */
export default function Root() {
  const [appTheme, setAppTheme] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Check if user standard theme
    setAppTheme(colorScheme == "light" ? true : false);

    async function checkIfUserIsLoggedIn() {
      try {
        const LoggedInuser = await SecureStore.getItemAsync("user");
        if (LoggedInuser) {
          setUser(JSON.parse(LoggedInuser));
        }
        setIsloading(false);
      } catch (error) {
        console.log("Something went wrong: ", error.message);
        setIsloading(false);
      }
    }

    /**
     * Function to get standard data for the application folders. If folders is already in storage do nothing
     */
    async function setStandardData() {
      // await appStorage.removeItem("folders");
      const folders = await appStorage.getData("folders");

      if (folders === null || folders === undefined) {
        const data = await standardData.getFolderNames();

        appStorage.addData("folders", JSON.stringify(data));
      }
    }

    /**
     * Get Theme data from appstorage if it exists
     */
    async function getThemeData() {
      const theme = await appStorage.getData("theme");
      if (theme !== null) {
        setAppTheme(theme);
      }
    }

    checkIfUserIsLoggedIn();
    getThemeData();
    setStandardData();
  }, []);

  if (isLoading) {
    return (
      <View
        className={`flex justify-center items-center h-full ${getColors.getThemeString("bg-dark-background", appTheme)}`}>
        <ActivityIndicator
          size={75}
          color={getColors.getHexColor("dark-greon", appTheme)}></ActivityIndicator>
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={[appTheme, setAppTheme]}>
      <NavigationContainer className="relative">
        {/* <DrawerScreens/> */}
        <DrawerStack />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

import {ThemeContext} from "../../context/Context";
import {Text, Pressable, View} from "react-native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {useNavigation, useNavigationState, useRoute} from "@react-navigation/core";
import GetColors from "../../helpers/getColors";
import SettingsScreen from "../SettingsScreen";
import {ArrowLeft, Menu} from "lucide-react-native";
import {useContext} from "react";
import AuthStack from "./AuthStack";
import BaseStack from "./BaseStack";
import ReadingSpotStack from "./ReadingSpotStack";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import {AuthContext} from "../../context/AuthProvider";
import ProfileScreen from "../ProfileScreen";
import LogoutScreen from "../LogoutScreen";

/**
 *
 * @returns Stack of screens with the drawer layout
 */
export default function DrawerStack() {
    const Drawer = createDrawerNavigator();
    const getColors = GetColors;
    const [appTheme, setAppTheme] = useContext(ThemeContext);
    const {user} = useContext(AuthContext);

   

    const HeaderStyle = {
        headerStyle: {
            backgroundColor: getColors.getHexColor("dark-card", appTheme)
        },
        headerTitleAlign: "center",
        headerTitle: () => (
            <Text className={`text-3xl self-center font-semibold ${getColors.getThemeString('color-dark-greon color-green-500',appTheme)}`}> 
                MyMangaShelf
            </Text>
        ),
        headerLeft: () => {
            const Navigation = useNavigation();
        

            return (
                <Pressable onPress={() => Navigation.openDrawer()} className="pl-4">
                    <Menu color={getColors.getHexColor("dark-greon", appTheme)}/>
                </Pressable>
            )
        },
        headerRight: () => <ThemeToggleButton/>
    };

    const showBackButton = (screen) => {
            const Navigation = useNavigation();
    

            return (
                <View>
                    <Pressable onPress={() => Navigation.goBack()}> 
                        <ArrowLeft color={getColors.getHexColor("dark-greon", appTheme)}/>
                    </Pressable>

                    <Pressable onPress={() => Navigation.openDrawer()} className="pl-4">
                    <Menu color={getColors.getHexColor("dark-greon", appTheme)}/>
                </Pressable>
                </View>
                
            )
    }

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerActiveTintColor: getColors.getHexColor("dark-greon", appTheme),
                drawerInactiveTintColor: getColors.getHexColor("dark-neutral-text", appTheme),

                drawerStyle: {
                    backgroundColor: getColors.getHexColor("dark-background", appTheme)
                }
            }}>
            <Drawer.Screen options={HeaderStyle} name="My Library" component={BaseStack} />

            {/* <Drawer.Screen
                options={HeaderStyle}
                name="Reading Spots"
                component={ReadingSpotStack}/>  */}

                {
                user
                    ? (<Drawer.Screen options={HeaderStyle} name="Profile" component={ProfileScreen}/>) 
                    : (<Drawer.Screen options={HeaderStyle} name="Login" component={AuthStack}/>)
            } 
            <Drawer.Screen
                options={HeaderStyle}
                name="Settings"
                component={SettingsScreen}/>
            {user ? (
                <Drawer.Screen options={HeaderStyle} name="Logout" component={LogoutScreen}/>
            ) : null}
    
        </Drawer.Navigator>
    )
}
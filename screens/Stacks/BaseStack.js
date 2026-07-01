import {createStackNavigator} from "@react-navigation/stack";
import ChapterView from "../../components/DetailScreen/ChapterView";
import {useNavigation, useRoute} from "@react-navigation/core";
import AddProviderScreen from "../AddProviderScreen";
import DetailScreen from "../DetailScreen";
import IndexTabScreen from "../IndexTabScreen";
import {useContext, useEffect} from "react";
import {Pressable, View} from "react-native";
import {ArrowLeft, Menu} from "lucide-react-native";
import getColors from "../../helpers/getColors";
import {ThemeContext} from "../../context/Context";
import {UserMediaContext, UserMediaProvider} from "../../context/UserMediaListProvider";

/**
 *
 * @returns Base screens home,explore,detail and addprovider
 */
export default function BaseStack({changeButtons}) {

    const Stack = createStackNavigator();
    const Navigation = useNavigation();
    const [appTheme, setAppTheme] = useContext(ThemeContext);
    
    const showBackButton = () => {}

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            
                <Stack.Screen name="Home" component={IndexTabScreen}/>
                <Stack.Screen
                    name="Detail"
                    children={() => <DetailScreen navigation={Navigation}/>
                    }
                />
            

            <Stack.Screen name="Add_provider" component={AddProviderScreen}/>
            <Stack.Screen name="outsource" component={ChapterView}/>
        </Stack.Navigator>
    );

}
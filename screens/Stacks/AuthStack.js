import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../LoginScreen";
import RegisterScreen from "../RegisterScreen";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthProvider";
import ProfileScreen from "../ProfileScreen";

/**
 *
 * @returns The stack of screens for authentication
 */
export default function AuthStack() {
    const Stack = createStackNavigator();
    const {user} = useContext(AuthContext);
    

    return (
        <Stack.Navigator
            screenOptions={{

                headerShown: false
            }}>

            {
                user
                    ? (<Stack.Screen name="Profile" component={ProfileScreen}/>)
                    : (
                        <> 
                            <Stack.Screen name ="login_screen" component={LoginScreen}/> 
                            <Stack.Screen name="Register" component={RegisterScreen}/>
                            <Stack.Screen name="forgot_password" component={RegisterScreen}/>
                        </>

                    )
            }

        </Stack.Navigator>
    )
}
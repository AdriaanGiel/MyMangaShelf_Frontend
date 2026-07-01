import {ActivityIndicator, ScrollView, Text, View, Alert} from "react-native";
import AddSource from "../components/AddProviderScreen/AddSource";
import Provider from "../components/AddProviderScreen/Provider";
import {CopyPlus, FilePlusCorner} from "lucide-react-native";
import {useContext, useEffect, useState} from "react";
import {AutocompleteDropdownContextProvider} from "react-native-autocomplete-dropdown";
import GetColors from "../helpers/getColors";
import {ThemeContext} from "../context/Context";
import { AxiosInstance } from "../helpers/AxiosInstance";
import GeneralCard from "../components/global/GeneralCard";
import MangaText from "../components/global/MangaText";

/**
 * 
 * @returns Screen for adding a new provider
 */
export default function AddProviderScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [appTheme, setAppTheme] = useContext(ThemeContext);
    const [syncMessage, setSyncMessage] = useState("Attempting to add source");
    const [providers, setProviders] = useState();
    const [generation, setGeneration] = useState();
    const [showSuccess, setShowSuccess] = useState(false);
    const [status, setStatus] = useState();
    const getColors = GetColors;

    function delay(t, val) {
        return new Promise(resolve => setTimeout(resolve, t, val));
    }

    const addNewProvider = async () => {

    }

    /**
     * Function to sync libraries TODO
     * @param {string} url 
     */
     const syncLibrary = async (url) => {
        
        setIsLoading(true);
        setShowSuccess(true);
        delay(2000).then(() => 
            {   setSyncMessage("New source added")
                delay(1000).then(() => {
                    
                    

                    setIsLoading(false)
                    delay(1000).then(() => {
                        Alert.alert("New source added:","2 manga's in your list are compatible and are updated");
                        setShowSuccess(false);
                    });
                    setSyncMessage("Attempting to add source") 
                });
            });
    }

    const checkUpdates = async () => {
        try {
            const response = await AxiosInstance.post("/get-updates", {
                gen_id: generation.id
            })

            console.log(response);

            

        } catch (error) {
            console.log(error.message);
            
        }
    }

    const getProviders = async () => {
        try {
            const response = await AxiosInstance.get("/provider");

            setProviders(response.data);
        
        } catch (error) {
            console.log(error.message);
            
        }
    }

    const ShowMessage = () => {

        if(showSuccess){
            return <GeneralCard custom={"w-[95%] w-min-[100px] gap-2 bg-dark-greon p-5 space-between flex-row"}>
                    <View className="px-2">
                        <MangaText>New source added</MangaText>
                    </View>

                    <View className="px-2">
                        <MangaText>2 manga's in you list were synced</MangaText>
                    </View>
                </GeneralCard>
        }

        return null;
    }

    useEffect(() => {
        getProviders();
    },[]);

    /**
     * 
     * @returns Conditional rendering to show loading screen after trying to add a new provider 
     */
    const ScreenBody = () => {
        if (isLoading) {
            return (
                <View className="bg-red h-96 self-center justify-center items-center">

                    <Text className={`text-4xl ${getColors.getThemeString('text-dark-standard-text',appTheme)}`}>{ syncMessage }</Text>

                    <ActivityIndicator size={50} color={getColors.getHexColor('dark-greon',appTheme)}/>
                </View>
            );
        }

        return (
            <View className="flex flex-1 gap-6 ">
                <View>
                    <Text className={`text-5xl ${getColors.getThemeString('text-dark-standard-text',appTheme)}`}>Connect a</Text>
                    <Text className={`text-5xl ${getColors.getThemeString('text-dark-active-text',appTheme)}`}>Source</Text>
                </View>
                <View>
                    <Text className={`text-xl ${getColors.getThemeString('text-dark-neutral-text',appTheme)}`}>
                        Enter the URL of your favorite manga website to try to sync your library
                    </Text>
                </View>

                {/* <ShowMessage/> */}

                <AddSource syncLibrary={syncLibrary}/>

                <View className="gap-4 py-6">
                    <Text className={`text-3xl font-bold ${getColors.getThemeString('text-dark-standard-text',appTheme)}`}>Existing providers
                    </Text>

                    { providers ?
                        providers.map((provider) => {
                            return <Provider key={provider.id} item={provider}/>
                        })
                    : null }
                </View>
            </View>
        );
    };

    return (
        <AutocompleteDropdownContextProvider>
            <ScrollView className={`px-5 py-2  ${getColors.getThemeString('bg-dark-background',appTheme)}`}>
                <ScreenBody/>
            </ScrollView>
        </AutocompleteDropdownContextProvider>
    );
}

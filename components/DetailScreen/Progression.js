import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import Dropdown from "react-native-input-select";
import ShelfStorage from "../../helpers/Storage";
import GetColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";

export default function Progression() {
    const [status, setStatus] = useState();
    const [folders, setFolders] = useState([]);
    const appStorage = ShelfStorage;
        const [appTheme, setAppTheme] = useContext(ThemeContext);
    const getColors = GetColors;

    useEffect(() => {
        async function getFolderNames() {
            const data = await appStorage.getData("folders");
            
            const reData = JSON.parse(data).map((folder) => {
                return {label: folder.name, value: folder.id};
            });  

            setFolders(reData); 
            
        }

        getFolderNames();

    }, []);

    return (
        <View
            className={`flex rounded-2xl gap-2 border-t-2 w-11/12 p-8 mx-auto ${getColors.getThemeString('bg-dark-card',appTheme)}`}>

            <View className="flex flex-row w-100%  justify-between">
                <Text className={`text-2xl ${getColors.getThemeString('text-dark-standard-text',appTheme)}`}>Your Progression</Text>
                <Text className={`text-2xl  ${getColors.getThemeString('text-dark-active-text',appTheme)}`}>82%</Text>
            </View>

            <View className="w-100% h-5">
                <View className={`w-[45%] h-4 ${getColors.getThemeString('bg-dark-greon',appTheme)}`}></View>
            </View>

            <View>
                <Dropdown
                    className={`${getColors.getThemeString('bg-dark-background',appTheme)}`}
                    label="Current Status"
                    options={folders}
                    selectedValue={1}
                    value={status}
                    onValueChange={(value) => setStatus(value)}
                    dropdownStyle={{
                        backgroundColor: getColors.getHexColor('dark-card',appTheme),
                        borderColor: getColors.getHexColor('dark-standard-text',appTheme),
                        borderWidth: 0.2,
                        color: "white"
                    }}
                    selectedItemStyle={{
                        color: getColors.getHexColor('dark-active-text',appTheme)
                    }}/>
            </View>

            <View className="flex flex-row justify-between gap-4">
                <View className={`flex gap-2 content-center rounded-2xl w-1/2 p-5 ${getColors.getThemeString('bg-dark-background',appTheme)}`}>
                    <Text className={`${getColors.getThemeString('text-dark-standard-text',appTheme)}`}>Chapters</Text>
                    {/* <Text className={`text-3xl ${getColors.getThemeString('text-dark-standard-text',appTheme)}`}>123/150</Text> */}
                </View>
                <View className={`flex gap-2 content-center rounded-2xl w-1/2  p-5 ${getColors.getThemeString('bg-dark-background',appTheme)}`}>
                    <Text className={`${getColors.getThemeString('text-dark-standard-text',appTheme)}`}>Rating</Text>
                    <Text className={`text-3xl ${getColors.getThemeString('text-dark-standard-text',appTheme)}`}>4.1</Text>
                </View>
            </View>
        </View>
    );
}

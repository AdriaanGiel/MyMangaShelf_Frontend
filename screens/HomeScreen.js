import {useContext, useEffect, useState} from "react";
import {ActivityIndicator, Pressable, ScrollView, Text, View} from "react-native";
import {SearchBar} from "react-native-elements";
import UserMediaList from "../components/HomeScreen/UserMediaList";
import MediaResource from "../resources/MediaResource";
import MediaListResource from "../resources/MediaListResource";
import FilterTab from "../components/HomeScreen/FilterTab";
import {Loader2} from "lucide-react-native";
import ShelfStorage from "../helpers/Storage";
import GetColors from "../helpers/getColors";
import {ThemeContext} from "../context/Context";
import {AuthContext} from "../context/AuthProvider";

/**
 *
 * @returns Home screen
 */
export default function HomeScreen() {
    const [search, setSearch] = useState("");
    const [mediaList, setMediaList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [activeFilter, setActiveFilter] = useState(0);
    const manga = new MediaResource();
    const mangaList = new MediaListResource();
    const [folders, setFolders] = useState();
    const appStorage = ShelfStorage;
    const getColors = GetColors;
    const [appTheme, setAppTheme] = useContext(ThemeContext);
    const {user,listChange,setListChange} = useContext(AuthContext);

    /**
   * Function to update search value
   * @param {string} val
   */
    const updateSearch = (val) => {
        if (val.length % 3 === 0) {
        
             
        }
         setSearch(val);
    };

    const genLocalList = async () => {
        const localList = await mangaList.getUserMediaListLocal();
        // console.log(localList);
        const newList = Object
            .entries(localList)
            .map((val, index) => {
                return val[1];
            });
        setMediaList(newList);    
    }

    const filterMedia = (id) => {
    
        if(id === 0){
            setActiveFilter(id);
            setFilteredList(mediaList);
            return;
        }

        const list = mediaList.filter((item,key) => {
            if(item.custom_folder_id !== null){
                return item.custom_folder_id === id;
            }
            return item.folder_id === id;
        });
        setActiveFilter(id);
        setFilteredList(list);
    }



    useEffect(() => {
        /**
     * Function to get resources for the home screen; user media list, folder names
     */
        async function getResources() {
            if (user) {
                const mediaData = await mangaList.getUserMediaList(user.token);
                setMediaList(mediaData.data);

                setFilteredList(mediaData.data);
            }else{
                await genLocalList();
            }
 
            // SETUP PAGINATION
            const data = await appStorage.getData('folders');            
            
            setFolders(JSON.parse(data));
        }

        getResources();
    }, [listChange]);

    const UserList = () => {
        if (mediaList.length === 0) {

            return (
                <View className="flex justify-center items-center">
                    <Text
                        className={`text-4xl ${getColors.getThemeString('text-dark-standard-text', appTheme)}`}>Your list is empty!</Text>
                </View>
            )
        }

        return (
            
                <UserMediaList items={filteredList}/>
         
        )
    }

    /**
   *
   * @returns The user media list. If the list is not loaded show a loader
   */
    const IsLoading = () => {

        if (!mediaList) {
            return (
                <View className="flex justify-center items-center">
                    <ActivityIndicator color={GetColors.getHexColor('dark-greon', appTheme)}></ActivityIndicator>
                </View>
            );
        }

        return  <View className="flex gap-2">
                <FilterTab folders={folders} filter={filterMedia} active={activeFilter}/> 
                    <UserList/>
            </View>
    };

    return (
        <ScrollView
            className={`flex  flex-1 gap-5  py-2 ${getColors.getThemeString('bg-dark-background', appTheme)}`}>
            <Text
                className={`text-6xl ${getColors.getThemeString('text-dark-standard-text', appTheme)}`}>My Library</Text>

            <SearchBar
                placeholder="Search your favorites"
                onChangeText={updateSearch}
                value={search}
                containerStyle={{
                    backgroundColor: getColors.getHexColor('dark-background', appTheme),
                    borderWidth: 0,
                    borderTopWidth: 0,
                    borderBottomWidth: 0
                }}
                inputContainerStyle={{
                    backgroundColor: getColors.getHexColor('dark-input', appTheme)
                }}/>

            <IsLoading/>

        </ScrollView>
    );
}

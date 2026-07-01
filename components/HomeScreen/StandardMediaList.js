import { Text, View, ScrollView, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react";
import StandardMediaCard from "./StandardMediaCard";
import { CustomFlatList } from "../global/CustomFlatList";
import getColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";


export default function StandardMediaList({items,folders,paginate}) {

  const [media,setMedia] = useState([])
  const [loading, setLoading] = useState(false);
  const [appTheme, setAppTheme] = useContext(ThemeContext);

  const getMoreMedia = (direction) => {
    // setLoading(true);

    paginate(direction);    
  }

  useEffect( () => {
    async function getItems(){
      const data = await items;
      setMedia(data); 
       
    }
    getItems();
    
  },[]) 

  const IsLoading = () => {
    if(loading){
      return (<View className="bg-red h-96 self-center justify-center items-center">
                <ActivityIndicator
                    size={50}
                    color={getColors.getHexColor('dark-greon', appTheme)}/>
            </View>)
    }

    return <>
      </>
  }

  return (
    <View className="mb-48 flex gap-2">

          <CustomFlatList
      className="" contentContainerClassName="flex flex-row flex-wrap gap-5 justify-center"
      data={media}
      renderItem={({item}) => (<StandardMediaCard folders={folders} key={item.id} item={item} />)}
      >

      </CustomFlatList>

      <View className="flex  gap-1 h-10 flex-row w-full">
        <Pressable onPress={() => getMoreMedia("prev")} className="w-1/2 bg-dark-greon pt-2 flex items-center">
          <Text>Previous</Text>
        </Pressable>
        <Pressable onPress={() => getMoreMedia("next")}  className="w-1/2 bg-dark-greon pt-2 flex items-center">
          <Text>Next</Text>
        </Pressable>
      </View>

    </View>
  );
}

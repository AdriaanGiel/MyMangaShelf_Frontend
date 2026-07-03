import { Alert, Pressable, Text, TextInput, View } from "react-native";
import getColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";
import { useContext, useEffect, useRef, useState } from "react";
import GeneralCard from "../../components/global/GeneralCard";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import Storage from "../../helpers/Storage";
import * as Location from "expo-location";
import IsLoading from "../../components/global/IsLoading";
import { randomUUID } from "expo-crypto";
import TouchableView from "../../components/global/TouchableView";
import { ReadingSpotsContext } from "../../context/ReadingSpotsContext";

export default function AddSpotScreen() {
  const [appTheme] = useContext(ThemeContext);
  const { setReadingSpots, spotToEdit, location } = useContext(ReadingSpotsContext);
  const [formData, setFormData] = useState({ name: "", note: "" });
  const [validationMessage, setValidationMessage] = useState();

  // console.log(spotToEdit);
  console.log("formData:", formData);

  const Navigation = useNavigation();
  const isFocused = useIsFocused();

  const checkDisabled = () => {
    return formData.name.length > 3;
  };

  const submitNewReadingSpot = async () => {
    // await Storage.removeItem('user_spots')
    let items = await Storage.getData("user_spots");
    if (items === undefined) {
      items = [];
    }

    if (formData.name.trim() === "" || formData.note.trim() === "") {
      setValidationMessage("You need to enter a name and a note");
      return;
    }

    const newSpot = {
      id: randomUUID(),
      name: formData.name,
      latitude: formData.location.latitude,
      longitude: formData.location.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
      note: formData.note,
    };

    await Storage.addData("user_spots", [...items, newSpot]);

    const updatedList = await Storage.getData("user_spots");

    setReadingSpots(updatedList);

    Alert.alert("New spot added", "", [
      {
        text: "OK",
        onPress: () => {
          Navigation.navigate("my spots");
        },
      },
    ]);

    setFormData({
      name: "",
      location: {},
      note: "",
    });
  };

  const handleChange = (prop, val) => {
    setValidationMessage(null);
    setFormData({
      ...formData,
      [prop]: val,
    });
  };

  useEffect(() => {
    if (spotToEdit) {
      setFormData(spotToEdit);
    } else {
      setFormData({ name: "", note: "", location: {} });

      handleChange("location", {
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [isFocused]);

  return (
    <IsLoading state={location === undefined}>
      <TouchableView>
        <View
          className={`flex h-[100%]  py-4 gap-4  px-2 ${getColors.getThemeString("bg-dark-background", appTheme)}`}>
          {/* <GeneralCard custom={
        `${appTheme ? "bg-white" : "bg-gray-900"} h-[40%] w-[95%] gap-4 min-h-20 py-4 relative px-2 justify-center items-center`}>
            
         <CameraView ref={cameraRef} style={StyleSheet.absoluteFillObject} facing={facing}>
         </CameraView>
         
        <Pressable onPress={takePicture} className="flex flex-row gap-2 bg-dark-greon p-2 rounded" > 
                    <Text className={`${appTheme? 'text-light-standard-text': 'text-white'}`}>{ picture ? "Retake" : "Take a picture" }</Text> 
                    <Camera color={appTheme ? 'black': 'white'} /> 
                </Pressable>      
    </GeneralCard> */}

          <View className="w-full flex items-center">
            <GeneralCard
              custom={`${appTheme ? "bg-white" : "bg-gray-900"} w-[95%] gap-4 min-h-20 py-4 px-2 items-center`}>
              <Text className={`${appTheme ? "text-light-standard-text" : "text-white"} text-3xl`}>
                Add a new reading spot
              </Text>

              <TextInput
                placeholderTextColor={
                  appTheme
                    ? getColors.getHexColor("text-light-standard-text")
                    : getColors.getHexColor("color-white")
                }
                placeholder="New reading spot"
                className={`${appTheme ? "text-light-standard-text" : "color-white bg-black"} border w-[90%] rounded-md`}
                onChangeText={(value) => handleChange("name", value)}
                value={formData.name}
                defaultValue={formData.name}
              />

              <TextInput
                placeholderTextColor={
                  appTheme
                    ? getColors.getHexColor("text-light-standard-text")
                    : getColors.getHexColor("color-white")
                }
                style={{ textAlignVertical: "top" }}
                editable={true}
                multiline={true}

                // numberOfLines={4}
                onChangeText={(text) => handleChange("note", text)}
                value={formData.note}
                className={`${appTheme ? "text-light-standard-text" : "color-white bg-black"} border h-40 w-[90%] rounded-md`}
              />

              {/* <View>

                { picture ? <Image className="h-40 w-60" source={{ uri: picture }} /> : <Images color={getColors.getHexColor('dark-greon')} /> }

            </View> */}
              {validationMessage ? <Text className="text-red-700">{validationMessage}</Text> : null}
              <Pressable
                onPress={submitNewReadingSpot}
                className={`${appTheme ? "text-light-standard-text" : "text-white"} rounded bg-dark-greon p-2 flex items-center w-[33%]`}>
                <Text>Submit</Text>
              </Pressable>
            </GeneralCard>
          </View>
        </View>
      </TouchableView>
    </IsLoading>
  );
}

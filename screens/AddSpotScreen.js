import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaViewBase,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import getColors from "../helpers/getColors";
import { ThemeContext } from "../context/Context";
import { use, useContext, useEffect, useRef, useState } from "react";
import GeneralCard from "../components/global/GeneralCard";
import { Camera, Images } from "lucide-react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Button } from "react-native-elements";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/core";
import Storage from "../helpers/Storage";
import * as Location from "expo-location";
import IsLoading from "../components/global/IsLoading";

export default function AddSpotScreen() {
  const [appTheme] = useContext(ThemeContext);
  const [formData, setFormData] = useState({ name: "", note: "", location: {} });
  const [picture, setPicture] = useState();
  const cameraRef = useRef(null);
  const [startCamera, setStartCamera] = useState(false);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  // const [permissionResponse, requestMediaPermission] = MediaLibrary.usePermissions({writeOnly: true});

  const Navigation = useNavigation();
  const [location, setLocation] = useState();

  const getCurrentLocation = async () => {
    const { status: currentStatus } = await Location.getForegroundPermissionsAsync();
    let finalStatus = currentStatus;

    // Only request if we don't already have permission
    if (currentStatus !== "granted") {
      const { status: requestedStatus } = await Location.requestForegroundPermissionsAsync();
      finalStatus = requestedStatus;
    }
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
      mayShowUserSettingsDialog: true,
    });

    setLocation(currentLocation);
    handleChange("location", {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
  };

  const checkDisabled = () => {
    return formData.name.length > 3;
  };

  // const takePicture = async () => {
  //     if (cameraRef.current) {
  //         const photo = await cameraRef.current.takePictureAsync();
  //         setPicture(photo.uri)

  //     }
  // }

  const submitNewReadingSpot = async () => {
    // await Storage.removeItem('user_spots')
    let items = await Storage.getData("user_spots");
    if (items === undefined) {
      items = [];
    }

    const newSpot = {
      name: formData.name,
      latitude: formData.location.latitude,
      longitude: formData.location.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
      note: formData.note,
    };

    await Storage.addData("user_spots", [...items, newSpot]);

    alert("New spot added");

    setFormData({
      name: "",
      location: {},
      note: "",
    });
  };

  const handleChange = (prop, val) => {
    setFormData({
      ...formData,
      [prop]: val,
    });
  };

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }

    getCurrentLocation();

    // if(!permissionResponse?.granted){
    //     requestMediaPermission();
    // }
  }, []);

  return (
    <IsLoading state={location === undefined}>
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

            <Pressable
              onPress={submitNewReadingSpot}
              className={`${appTheme ? "text-light-standard-text" : "text-white"} rounded bg-dark-greon p-2 flex items-center w-[33%]`}>
              <Text>Submit</Text>
            </Pressable>
          </GeneralCard>
        </View>
      </View>
    </IsLoading>
  );
}

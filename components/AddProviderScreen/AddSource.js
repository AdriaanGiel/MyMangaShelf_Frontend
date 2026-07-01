import { useContext, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import GetColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";
import { AxiosInstance } from "../../helpers/AxiosInstance";

export default function AddSource({ syncLibrary }) {
  const [source, setSource] = useState();
  const [providers, setProviders] = useState(null);
  const [appTheme, setAppTheme] = useContext(ThemeContext);
  const getColors = GetColors;

  function changeSource(val) {
    setSource(val);
  }

  function sync() {
    syncLibrary(source);
  }

  async function getProviders() {
    try {
      const response = await AxiosInstance.get("/provider");

      return response.data;
    } catch (error) {
      console.error("ERROR ME: ", error.message);
    }
  }

  useEffect(() => {
    async function getResources() {
      const resource = await getProviders();

      const changeFormat = resource.map((p) => {
        return {
          ...p,
          title: p.name,
        };
      });

      setProviders(changeFormat);
    }
    getResources();
  }, []);

  return (
    <View
      className={`flex rounded-2xl gap-2 border-t-2 border-manga-400 w-full p-8 mx-auto ${getColors.getThemeString("bg-dark-card", appTheme)}`}>
      <View>
        <AutocompleteDropdown
          inputHeight={50}
          inputContainerStyle={{
            backgroundColor: getColors.getHexColor("dark-card", appTheme),
            borderWidth: 0.2,
            borderColor: getColors.getHexColor("dark-greon", appTheme),
          }}
          textInputProps={{
            style: {
              color: getColors.getHexColor("dark-greon", appTheme),
            },
          }}
          suggestionsListContainerStyle={{
            backgroundColor: "#212121",
            color: "#FFFF",
          }}
          renderItem={(item, text) => <Text className="text-white p-5">{item.title}</Text>}
          className="bg-manga-400"
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          initialValue={source?.id}
          // or just '2'
          onSelectItem={changeSource}
          dataSet={providers}
        />
      </View>
      <Pressable
        onPress={sync}
        className={`bg-manga-400 rounded-xl p-4 ${getColors.getThemeString("bg-dark-greon", appTheme)}`}>
        <Text
          className={`text-xl text-center font-semibold ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
          SYNC LIBRARY
        </Text>
      </Pressable>
    </View>
  );
}

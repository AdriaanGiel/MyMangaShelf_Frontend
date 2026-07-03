import { View } from "react-native";
import Dropdown from "react-native-input-select";
import { useContext, useEffect, useState } from "react";
import Card from "../../../components/global/Card";
import GetColors from "../../../helpers/getColors";
import { ThemeContext } from "../../../context/Context";
import MangaText from "../../../components/global/MangaText";

export default function SourceDropDown({ providers, chapters, active = null }) {
  const [appTheme, setAppTheme] = useContext(ThemeContext);
  const getColors = GetColors;
  const [source, setSource] = useState("");

  const setupFormData = (val) => {
    setSource(val);
    chapters(val);
  };

  const listData = providers?.map((item, key) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  useEffect(() => {
    if (active !== null) {
      setSource(active);
    }

    console.log("sads: ", providers);
  }, []);
  return providers ? (
    <View className="px-4">
      <Dropdown
        className={`${getColors.getThemeString("bg-dark-background", appTheme)}`}
        label="Current source"
        options={listData}
        selectedValue={source}
        value={source}
        onValueChange={(value) => setupFormData(value)}
        dropdownStyle={{
          backgroundColor: getColors.getHexColor("dark-input", appTheme),
          borderColor: getColors.getHexColor("dark-standard-text", appTheme),
          borderWidth: 0.2,
          color: getColors.getHexColor("dark-standard-text", appTheme),
        }}
        placeholderStyle={{
          color: getColors.getHexColor("dark-neutral-text", appTheme),
        }}
        selectedItemStyle={{
          color: getColors.getHexColor("dark-active-text", appTheme),
        }}
      />
    </View>
  ) : (
    <View className="w-full justify-center items-center">
      <MangaText addon={"txt-3xl"}>
        Sorry no providers to show yet. Maybe you can add one?
      </MangaText>
    </View>
  );
}

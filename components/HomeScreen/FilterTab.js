import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, View, Text } from "react-native";
import GetColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";

export default function FilterTab({ folders, filter, active }) {
  const { appTheme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState(active);
  const getColors = GetColors;

  const tabs = folders;

  const switchTabs = (id) => {
    setActiveTab(id);
    filter(id);
  };

  return (
    <ScrollView horizontal={true} className="mx-auto w-[95%] py-4">
      <View className="flex flex-row gap-8 mx-auto">
        <Pressable onPress={() => switchTabs(0)}>
          <Text
            className={
              0 == activeTab
                ? `${getColors.getThemeString("text-dark-greon", appTheme)} text-2xl`
                : `${getColors.getThemeString("text-dark-neutral-text", appTheme)} text-2xl`
            }>
            All
          </Text>
        </Pressable>

        {tabs?.map((item, key) => {
          return (
            <Pressable key={item.id} onPress={() => switchTabs(item.id)}>
              <Text
                className={
                  item.id == activeTab
                    ? `${getColors.getThemeString("text-dark-greon", appTheme)} text-2xl`
                    : `${getColors.getThemeString("text-dark-neutral-text", appTheme)} text-2xl`
                }>
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

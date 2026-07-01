import { View } from "react-native";

export default function GeneralCard({children,custom}) {

  return (
    <View className={`flex rounded-2xl bg-manga-200 ${custom ?? ""}`}>
      { children }
    </View>
  );
}

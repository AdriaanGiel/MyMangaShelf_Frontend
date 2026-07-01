import { Menu, Bell } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function Header() {
  return (
    <View className="flex flex-row justify-between bg-manga-100 ">
      <Pressable>
        <Bell color="#FFFF" />
      </Pressable>
    </View>
  );
}

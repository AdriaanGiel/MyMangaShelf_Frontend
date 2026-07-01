import { User } from "lucide-react-native";
import { Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function AuthLink() {
  const Navigation = useNavigation();

  function GoToAuthPage() {
    Navigation.navigate("Login");
  }

  return (
    <Pressable className="pr-4" onPress={() => GoToAuthPage()}>
      <User color={"rgba(142, 255, 113)"} />
    </Pressable>
  );
}

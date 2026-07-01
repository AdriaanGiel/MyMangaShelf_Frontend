import { ScrollView, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";

/**
 *
 * @returns Screen to a a new readingspot
 */
export default function AddReadingSpot() {
  const Navigation = useNavigation();

  return (
    <ScrollView className="flex h-[100%] bg-dark-background py-4 gap-4 items-center px-2"></ScrollView>
  );
}

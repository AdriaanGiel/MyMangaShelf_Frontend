import { View } from "react-native";

export default function GeneralCard({ children, custom }) {
  return <View className={`flex rounded-2xl ${custom ?? ""}`}>{children}</View>;
}

import { FlatList } from "react-native";
export function CustomFlatList({ style, contentContainerStyle, ...props }) {
  return (
    <FlatList
     numColumns={2}
      style={style}
      contentContainerStyle={contentContainerStyle}
      columnWrapperStyle={{ gap: 8 }}
      {...props}
    />
  );
}
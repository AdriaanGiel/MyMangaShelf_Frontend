import { Text, View, ScrollView, FlatList } from "react-native";
import FilterTab from "./FilterTab";
import UserMediaCard from "./UserMediaCard";
import { useEffect, useState } from "react";

export default function UserMediaList({ items }) {
  const [media, setMedia] = useState([]);

  const removeItem = (id) => {
    const newMedia = media.filter((m) => m.id !== id);
    setMedia(newMedia);
  };

  useEffect(() => {
    async function getItems() {
      const data = await items;
      setMedia(data);
    }
    getItems();
  }, []);

  return (
    <View className="flex gap-4">
      <View className="flex flex-row flex-wrap gap-5 justify-center">
        {media.map((m, key) => (
          <UserMediaCard key={m.id} removeFunc={removeItem} item={m} />
        ))}
      </View>
    </View>
  );
}

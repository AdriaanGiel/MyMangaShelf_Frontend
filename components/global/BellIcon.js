import { Bell, BellOff, Icon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";

export default function BellIcon() {
  const [active, setActive] = useState(true);

  function toggleBell() {
    setActive(!active);
  }

  const InnerIcon = () => {
    if (active) {
      return <Bell color="#8EFF71" />;
    }
    return <BellOff color="#8EFF71" />;
  };

  return (
    <Pressable className="pr-4" onPress={toggleBell}>
      <InnerIcon />
    </Pressable>
  );
}

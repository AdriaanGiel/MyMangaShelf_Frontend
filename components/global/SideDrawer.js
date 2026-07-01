import { Text } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { Button } from "@react-navigation/elements";
import { useState } from "react";

export default function SideDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}>
      <Button onPress={() => setOpen((prevOpen) => !prevOpen)}>
        {`${open ? "Close" : "Open"} drawer`}
      </Button>
    </Drawer>
  );
}

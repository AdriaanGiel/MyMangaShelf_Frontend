import { AuthProvider } from "./context/AuthProvider";
import { initI18n } from "./src/locales/i18n";

import { UserMediaProvider } from "./context/UserMediaListProvider";
import Root from "./Root";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import getColors from "./helpers/getColors";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const loadLang = async () => {
    await initI18n();
    setLoaded(true);
  };

  useEffect(() => {
    loadLang();
  }, []);

  if (!loaded) {
    return (
      <View className="flex h-full w-full bg-slate-900 justify-center items-center">
        <ActivityIndicator
          size={35}
          color={getColors.getHexColor("dark-greon")}></ActivityIndicator>
      </View>
    );
  }

  return (
    <AuthProvider>
      <UserMediaProvider>
        <Root />
      </UserMediaProvider>
    </AuthProvider>
  );
}

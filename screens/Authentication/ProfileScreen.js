import { useContext, useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, KeyboardAvoidingView } from "react-native";
import GetColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";
import { useTranslation } from "react-i18next";

/**
 *
 * @returns Register screen
 */
export default function ProfileScreen() {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { t } = useTranslation();

  useEffect(() => {}, []);

  return (
    <View>
      <Text>{t("auth.profile")}</Text>
    </View>
  );
}

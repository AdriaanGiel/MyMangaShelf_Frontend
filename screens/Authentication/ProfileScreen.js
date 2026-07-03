import { useContext, useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, KeyboardAvoidingView } from "react-native";
import GetColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";

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

  useEffect(() => {}, []);

  return (
    <View>
      <Text>PROFILE</Text>
    </View>
  );
}

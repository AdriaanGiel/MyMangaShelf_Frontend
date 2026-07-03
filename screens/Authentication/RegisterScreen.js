import { useContext, useState } from "react";
import { Pressable, Text, TextInput, View, KeyboardAvoidingView, Alert } from "react-native";
import GetColors from "../../helpers/getColors";
import { ThemeContext } from "../../context/Context";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigation } from "@react-navigation/core";

/**
 *
 * @returns Register screen
 */
export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [appTheme, setAppTheme] = useContext(ThemeContext);
  const getColors = GetColors;
  const { registerUser, errorMessage, setErrorMessage } = useContext(AuthContext);
  const Navigation = useNavigation();

  const handleLoginForm = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handeleRegisteringUser = () => {
    registerUser(formData, (value) => {
      Alert.alert("Your account has been created");
      setErrorMessage(null);
      Navigation.navigate("login_screen");
    });
  };

  return (
    <KeyboardAvoidingView
      className={`flex flex-1 gap-5 px-5 py-2 ${getColors.getThemeString("bg-dark-background", appTheme)}`}>
      <View
        className={`w-{90%} rounded-lg py-8 px-4 flex gap-4 ${getColors.getThemeString("bg-dark-card ", appTheme)}`}>
        <Text
          className={`self-center text-4xl py-2 ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
          Register
        </Text>
        {errorMessage ? <Text className="self-center text-red-500">{errorMessage}</Text> : null}
        <TextInput
          className={`h-10 p-2 ${getColors.getThemeString("bg-dark-standard-text border", appTheme)}`}
          onChangeText={(value) => handleLoginForm("name", value)}
          value={formData.name}
          keyboardType="text"
          placeholder="Username"
        />

        <TextInput
          className={`h-10 p-2 ${getColors.getThemeString("bg-dark-standard-text border", appTheme)}`}
          onChangeText={(value) => handleLoginForm("email", value)}
          value={formData.email}
          keyboardType="email"
          placeholder="text@example.com"
        />

        <TextInput
          className={`h-10 p-2 ${getColors.getThemeString("bg-dark-standard-text border", appTheme)}`}
          onChangeText={(value) => handleLoginForm("password", value)}
          value={formData.password}
          secureTextEntry={true}
          placeholder="Password"
        />

        <TextInput
          className={`h-10 p-2 ${getColors.getThemeString("bg-dark-standard-text border", appTheme)}`}
          onChangeText={(value) => handleLoginForm("confirm_password", value)}
          value={formData.confirm_password}
          secureTextEntry={true}
          placeholder="Confirm password"
        />

        <Pressable
          className={`w-48 self-center bg-dark-greon rounded-xl flex justify-center items-center ${getColors.getThemeString("bg-dark-greon", appTheme)}`}
          onPress={handeleRegisteringUser}>
          <Text
            className={`text-3xl rounded-xl px-2 py-2 ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
            Register
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

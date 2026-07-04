import { useContext, useState } from "react";
import { Pressable, Text, TextInput, View, KeyboardAvoidingView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ThemeContext } from "../../context/Context";
import GetColors from "../../helpers/getColors";
import { AuthContext } from "../../context/AuthProvider";
import { useTranslation } from "react-i18next";

/**
 *
 * @returns Login screen
 */
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const Navigation = useNavigation();
  const [appTheme, setAppTheme] = useContext(ThemeContext);
  const getColors = GetColors;
  const { user, setUser, loginUser, errorMessage, setErrorMessage } = useContext(AuthContext);

  const handleLoginForm = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Function to login user
   */
  const login = () => {
    if (formData.email === "" || formData.password === "") {
      return setErrorMessage(t("auth.missingFields"));
    }

    loginUser(formData.email, formData.password);
  };

  /**
   * Function to navigate to the register screen
   */
  const goToRegisterScreen = () => {
    Navigation.navigate("Register");
  };

  /**
   * Function to navigate to the register screen
   */
  const goToForgotPasswordScreen = () => {
    Navigation.navigate("forgot_password");
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      className={`flex flex-1 gap-5 px-5 py-2 ${getColors.getThemeString("bg-dark-background", appTheme)}`}>
      <View
        className={`${getColors.getThemeString("bg-dark-card", appTheme)} w-{90%} shadow-sm rounded-lg py-8 px-4 flex gap-4`}>
        <Text
          className={`self-center text-4xl py-2 ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
          {t("auth.login")}
        </Text>

        <TextInput
          className={`h-10 p-2 ${getColors.getThemeString("bg-dark-standard-text border", appTheme)}`}
          onChangeText={(value) => handleLoginForm("email", value)}
          value={formData.email}
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholder="text@example.com"
          autoCapitalize="none"
        />

        <TextInput
          className={`p-2 h-10 ${getColors.getThemeString("bg-dark-standard-text border", appTheme)}`}
          onChangeText={(value) => handleLoginForm("password", value)}
          value={formData.password}
          secureTextEntry={true}
          placeholder={t("auth.password")}
          autoCapitalize="none"
        />

        <View className="flex gap-4">
          <Pressable
            className={`${getColors.getThemeString("bg-dark-greon", appTheme)} w-48 self-center rounded-xl flex justify-center items-center`}
            onPress={login}>
            <Text
              className={`text-3xl srounded-xl px-2 py-2 ${getColors.getThemeString("text-dark-standard-text", appTheme)}`}>
              {t("auth.login")}
            </Text>
          </Pressable>
          <>
            {errorMessage ? <Text className="text-red-600 self-center">{errorMessage}</Text> : null}
          </>
          <Text
            className={`self-center ${getColors.getThemeString("text-dark-neutral-text", appTheme)}`}>
            {t("auth.noAccount")}
            <Text
              onPress={goToRegisterScreen}
              className={`${getColors.getThemeString("text-dark-greon", appTheme)}`}>
              &nbsp;{t("auth.register")}&nbsp;
            </Text>
            {t("auth.now")}.
          </Text>
          <Text
            onPress={goToForgotPasswordScreen}
            className={`self-center ${getColors.getThemeString("text-dark-greon", appTheme)}`}>
            {t("auth.forgotPassword")}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

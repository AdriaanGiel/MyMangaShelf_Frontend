import { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AxiosInstance } from "../helpers/AxiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [listChange, setListChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const logoutUser = async () => {
    setIsLoading(true);

    try {
      AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

      const response = await AxiosInstance.post("/logout");

      setUser(null);
      SecureStore.deleteItemAsync("user");
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setIsLoading(true);
    // TODO CREATE LOGIN HELPER WTITH TRY CATCH
    try {
      const response = await AxiosInstance.post("/login", { email, password });

      const userData = {
        token: response.data.token,
        id: response.data.user.id,
        email: response.data.user.email,
        name: response.data.user.name,
      };

      setUser(userData);
      setErrorMessage(null);
      SecureStore.setItemAsync("user", JSON.stringify(userData));
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  const registerUser = async (formData, callback = null) => {
    setIsLoading(true);
    try {
      const response = await AxiosInstance.post("/register", { ...formData });

      if (callback) {
        callback(response.data.user);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginUser,
        logoutUser,
        registerUser,
        listChange,
        setListChange,
        errorMessage,
        setErrorMessage,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

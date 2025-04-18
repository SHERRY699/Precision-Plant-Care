import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Authentication } from "@/components/authentication/Authentication";
import Toast from "react-native-toast-message";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadUserFromStorage } from "@/redux/features/authSlice";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppInitializer />
        <Authentication />
        <Toast />
      </QueryClientProvider>
    </Provider>
  );
};

const AppInitializer = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
  
      if (storedUser) {
        router.replace("/home");
      } else {
        setIsChecking(false); // Stay on login, but stop checking
      }
    };
  
    if (isChecking) {
      loadUser();
    }
  }, [isChecking]);
  
  return null;
};


export default App;

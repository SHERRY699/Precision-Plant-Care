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
import AppInitializer from "@/components/AppInitializer";

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



export default App;

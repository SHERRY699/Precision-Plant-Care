import React, { useEffect, useState } from "react";
import { useRouter, Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

const AppInitializer = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setIsLoggedIn(true);
      }
      setIsChecking(false);
    };

    loadUser();
  }, []);

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ✅ Use Redirect instead of replace — cleaner
  if (isLoggedIn) {
    return <Redirect href="/home" />;
  }

  // Not logged in → show login
  return null; // this lets <Authentication /> render
};

export default AppInitializer;

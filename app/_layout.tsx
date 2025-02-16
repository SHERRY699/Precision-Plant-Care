import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Colors } from "@/assets/Colors";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    robotto: require("../assets/fonts/Roboto-Black.ttf"),
    robottoregular: require("../assets/fonts/Roboto-Regular.ttf"),
    robottomedium: require("../assets/fonts/Roboto-Medium.ttf"),
    robottobold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="settings/index"
        options={{
          headerShown: true,
          title: "Settings",
          headerStyle: { backgroundColor: "#F1EDE2" },
          headerTintColor: "#000",
        }}
      />
      <Stack.Screen
        name="contact-social/index"
        options={{
          headerShown: true,
          title: "Contact And Social",
          headerStyle: { backgroundColor: "#F1EDE2" },
          headerTintColor: "#000",
        }}
      />
    </Stack>
  );
}

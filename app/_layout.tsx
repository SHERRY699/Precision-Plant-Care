import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    robotto: require("../assets/fonts/Roboto-Black.ttf"),
    robottoregular: require("../assets/fonts/Roboto-Regular.ttf"),
    robottomedium: require("../assets/fonts/Roboto-Medium.ttf"),
    robottobold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}

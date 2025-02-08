import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    robotto: require("../assets/fonts/Roboto-Black.ttf"),
    robottoregular: require("../assets/fonts/Roboto-Regular.ttf"),
    robottomedium: require("../assets/fonts/Roboto-Medium.ttf"),
    robottobold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) return null; 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}

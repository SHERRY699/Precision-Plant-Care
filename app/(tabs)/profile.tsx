import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/assets/Colors";
import { useRouter } from "expo-router";

export default function Home(): JSX.Element | null {
  const router = useRouter();

  const handleNavigation = (path: any) => {
    router.push(path);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F1EDE2" style="dark" />

      <View style={styles.profile}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          <Image
            source={require("../../assets/images/profile.png")}
            width={107}
            height={107}
            alt="Image.svg"
          />
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Text style={{ fontFamily: "robotto", fontSize: 18 }}>Sherry</Text>
            <TouchableOpacity
              onPress={() => handleNavigation("/")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 140,
                height: 26,
                backgroundColor: Colors.btn,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "white" }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "90%", height: 1, backgroundColor: "grey" }} />
      </View>

      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => handleNavigation("/settings")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 40,
            backgroundColor: Colors.secondary,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white" }}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleNavigation("/contact-social")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 40,
            backgroundColor: Colors.secondary,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white" }}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1EDE2",
  },
  profile: {
    width: "100%",
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  options: {
    width: "100%",
    height: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  btn: {
    width: 300,
    height: 40,
  },
});

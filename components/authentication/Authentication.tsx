import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Login } from "@/components/login/Login";
import { Signup } from "../signup/SignUp";

export const Authentication = (): JSX.Element | null => {
  const [modal, setModal] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F1EDE2" style="dark" />
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logo.png")}
          width={151}
          height={131}
          alt="Image.svg"
        />
        {modal ? <Login onToggle={setModal} /> : <Signup onToggle={setModal} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1EDE2",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1EDE2",
    gap: 20,
  },
});

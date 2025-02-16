import { Colors } from "@/assets/Colors";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";

export default function Settings(): JSX.Element | null {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F1EDE2" style="dark" />
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text
            style={{
              fontFamily: "robotto",
              color: Colors.headings,
              fontSize: 18,
            }}
          >
            Socials
          </Text>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/facebook-social.png")}
              width={42}
              height={42}
              alt="facebook.png"
            />
            <Text style={{ fontFamily: "robottoregular", fontSize: 14 }}>
              Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/instragram.png")}
              width={42}
              height={42}
              alt="facebook.png"
            />
            <Text style={{ fontFamily: "robottoregular", fontSize: 14 }}>
              Instagram
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            paddingLeft: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "robotto",
              color: Colors.headings,
              fontSize: 18,
            }}
          >
            Contacts
          </Text>
          <Text>sherry@neduet.edu.pk</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1EDE2",
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    gap: 2,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 5,
    gap: 10,
    height: 200,
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderColor: "grey",
  },
});

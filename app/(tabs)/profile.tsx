import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/assets/Colors";

export default function Home(): JSX.Element | null {
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F1EDE2" style="dark" />
      {/* <Image
        source={require("../../assets/images/logo-image.png")}
        width={10}
        height={10}
        alt="Image.svg"
      /> */}
      <View style={styles.profile}>
        <View>
        <Image
        source={require("../../assets/images/logo-image.png")}
        width={10}
        height={10}
        alt="Image.svg"
      /> 
      <Text>
        Sherry
      </Text>
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
  profile: {
    width: "100%",
    height: 300,
    backgroundColor: "red",
  },
});

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
//@ts-ignore
import logo from "../../assets/images/image-1.png";
//@ts-ignore
import logo1 from "../../assets/images/image-2.png";
//@ts-ignore
import logo2 from "../../assets/images/image-3.png";
import { Colors } from "@/assets/Colors";

export default function Home(): JSX.Element | null {
  const data = [
    {
      imageUrl: logo,
    },
    {
      imageUrl: logo1,
    },
    {
      imageUrl: logo2,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F1EDE2" style="dark" />
      {/* <Image
        source={require("../../assets/images/logo-image.png")}
        width={5}
        height={5}
        alt="Image.svg"
      /> */}
      <View style={styles.container}>
        <View style={styles.info}>
          <View>
            <Text
              style={{
                fontFamily: "robottomedium",
                fontSize: 14,
              }}
            >
              Karachi , 24 JAN
            </Text>
            <Text
              style={{
                fontFamily: "robottomedium",
                fontSize: 14,
              }}
            >
              Foggy 17°C / 25°C
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "robotto",
              color: "grey",
              fontSize: 17,
            }}
          >
            18°C
          </Text>
        </View>
        <Text style={{ fontFamily: "robotto", fontSize: 17 }}>
          Heal Your Crop
        </Text>
        <View style={styles.imageContainer}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <View>
                <Image
                  style={{ borderRadius: 15, marginRight: 20, marginLeft: 20 }}
                  source={item?.imageUrl}
                />
              </View>
            )}
          />
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text
            style={{
              fontFamily: "robottoregular",
              color: "white",
            }}
          >
            Scan Your Plant
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.btn1}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/track.png")}
                width={56}
                height={50}
              />
              <Text
                style={{
                  fontFamily: "robottoregular",
                  color: "#00000080",
                  fontSize: 20,
                }}
              >
                Track Your Plant
              </Text>
            </View>
            <Image
              source={require("../../assets/images/arrow.png")}
              width={6}
              height={10}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn1}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/cultivation.png")}
                width={56}
                height={50}
              />
              <Text
                style={{
                  fontFamily: "robottoregular",
                  color: "#00000080",
                  fontSize: 20,
                }}
              >
                Cultivation Tips
              </Text>
            </View>
            <Image
              source={require("../../assets/images/arrow.png")}
              width={6}
              height={10}
            />
          </TouchableOpacity>
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
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    marginTop: 8,
  },
  info: {
    width: "80%",
    backgroundColor: "white",
    height: 78,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  imageContainer: {
    width: "100%",

    height: 247,
    borderRadius: 20,
  },
  btn: {
    width: "80%",
    height: 50,
    backgroundColor: Colors.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btn1: {
    width: "80%",
    height: 84,
    backgroundColor: Colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    flexDirection: "row",
  },
});

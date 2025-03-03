import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import { Colors } from "@/assets/Colors";
import { useState } from "react";

//@ts-ignore
import logo from "../../assets/images/image-1.png";
//@ts-ignore
import logo1 from "../../assets/images/image-2.png";
//@ts-ignore
import logo2 from "../../assets/images/image-3.png";

export default function Home(): JSX.Element | null {
  const router = useRouter();
  const data = [logo, logo1, logo2];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRoute = (path: any) => {
    router.push(path);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.info}>
          <View>
            <Text style={styles.text}>Karachi, 24 JAN</Text>
            <Text style={styles.text}>Foggy 17°C / 25°C</Text>
          </View>
          <Text style={styles.tempText}>18°C</Text>
        </View>
        <Text style={styles.title}>Heal Your Crop</Text>

        <View style={styles.carouselContainer}>
          <Carousel
            loop
            autoPlay
            autoPlayInterval={3000}
            width={300}
            height={200}
            data={data}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <Image source={item} style={styles.image} />
            )}
          />
          <View style={styles.dotsContainer}>
            {data.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Scan Your Plant</Text>
        </TouchableOpacity>

        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => handleRoute("/track-plant")} style={styles.btn1}>
            <Image source={require("../../assets/images/track.png")} style={styles.icon} />
            <Text style={styles.optionText}>Track Your Plant</Text>
            <Image source={require("../../assets/images/arrow.png")} style={styles.arrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleRoute("/cultivation-tips")} style={styles.btn1}>
            <Image source={require("../../assets/images/cultivation.png")} style={styles.icon} />
            <Text style={styles.optionText}>Cultivation Tips</Text>
            <Image source={require("../../assets/images/arrow.png")} style={styles.arrowIcon} />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    fontFamily: "robottomedium",
    fontSize: 14,
  },
  tempText: {
    fontFamily: "robotto",
    color: "grey",
    fontSize: 17,
  },
  title: {
    fontFamily: "robotto",
    fontSize: 17,
  },
  carouselContainer: {
    width: 300,
    height: 220,
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  btn: {
    width: "80%",
    height: 50,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnText: {
    fontFamily: "robottoregular",
    color: "white",
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  btn1: {
    width: "80%",
    height: 84,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  icon: {
    width: 56,
    height: 50,
  },
  arrowIcon: {
    width: 6,
    height: 10,
  },
  optionText: {
    fontFamily: "robottoregular",
    color: "#00000080",
    fontSize: 20,
  },
});

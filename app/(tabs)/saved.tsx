import { useFetchData } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

export default function Saved(): JSX.Element | null {
  const [userData, setUserData] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        const parsed = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUserData(parsed);
      } catch (e) {
        console.log("Error reading user from storage", e);
      }
    };
    getData();
  }, []);

  const { data, isLoading, refetch } = useFetchData(`/auth/${userData?.user?._id}`);

  // Trigger refetch whenever the tab is focused
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleImagePress = (image: any) => {
    if (image.class !== "not_lemon") {
      setSelectedImage(image);
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar backgroundColor="#F1EDE2" style="dark" />

        <Text style={styles.heading}>Your Saved Diagnoses</Text>

        {isLoading || !data ? (
          <ActivityIndicator size="large" color="#377E61" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.grid}>
            {data.images?.map((img: any) => (
              <TouchableOpacity
                key={img._id}
                onPress={() => handleImagePress(img)}
                style={styles.card}
              >
                <Image source={{ uri: img.url }} style={styles.image} />
                <Text style={styles.label}>{img.class}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedImage?.class}</Text>
              <Image
                source={{ uri: selectedImage?.url }}
                style={styles.enlargedImage}
              />
              <Text style={styles.tipTitle}>Tips & Preventions:</Text>
              <Text style={styles.tipText}>
                {selectedImage?.class === "BlackSpots"
                  ? "Avoid overwatering. Remove infected leaves. Use fungicides."
                  : selectedImage?.class === "LeafCurl"
                  ? "Prune infected parts. Control aphids. Use disease-resistant varieties."
                  : "General prevention tip."}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1EDE2",
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    margin: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 140,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    textTransform: "capitalize",
    color: "#555",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  enlargedImage: {
    width: 250,
    height: 250,
    marginBottom: 10,
    borderRadius: 10,
  },
  tipTitle: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  tipText: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
    color: "#444",
  },
  closeBtn: {
    backgroundColor: "#377E61",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
});

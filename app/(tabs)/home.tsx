import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import { Colors } from "@/assets/Colors";
import { useEffect, useState } from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

//@ts-ignore
import logo from "../../assets/images/image-1.png";
//@ts-ignore
import logo1 from "../../assets/images/image-2.png";
//@ts-ignore
import logo2 from "../../assets/images/image-3.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { ApiError } from "@/utils/type";

interface PredictionResponse {
  all_predictions: {
    BlackSpots: number;
    Healthy: number;
    LeafCurl: number;
  };
  class: string;
  confidence: number;
}

export default function Home(): JSX.Element | null {
  const router = useRouter();
  const data = [logo, logo1, logo2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState<PredictionResponse | null>(
    null
  );
  const [saving, setSaving] = useState(false); // Loader state

  const [userData, setUserData] = useState<any>(null); // Store user data
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      const parsed = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserData(parsed);
    } catch (e) {
      console.log("Error reading user from storage", e);
    }
  };


  useEffect(() => {
    getData(); // Fetch on mount
  }, []);

  const handleRoute = (path: any) => {
    router.push(path);
  };

  const pickImage = async () => {
    Alert.alert("Upload Image", "Choose an option", [
      { text: "Camera", onPress: () => openCamera() },
      { text: "Gallery", onPress: () => openGallery() },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const openCamera = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to enable camera permissions."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to enable gallery permissions."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (imageUri: string) => {
    setModalVisible(true);
    setLoading(true);
    setSelectedImageUri(imageUri); // Save for later use in Save API call
  
    let fileName = imageUri.split("/").pop();
    let fileType = fileName?.split(".").pop();
  
    let formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: fileName || "photo.jpg",
      type: `image/${fileType}`,
    } as any);
  
    try {
      const response = await fetch("https://lemon-ai.tech/predict", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
  
      const result: PredictionResponse = await response.json();
      setResponseData(result);
    } catch (error) {
      console.error("Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedImageUri || !responseData || !userData?.user?._id) {
      Toast.show({
        type: 'error',
        text1: 'Missing image or user data',
      });
      return;
    }
  
    setSaving(true); // Start loading
    try {
      const fileName = selectedImageUri.split("/").pop();
      const fileType = fileName?.split(".").pop();
  
      const saveFormData = new FormData();
      saveFormData.append("image", {
        uri: selectedImageUri,
        name: fileName || "photo.jpg",
        type: `image/${fileType}`,
      } as any);
  
      saveFormData.append("BlackSpots", responseData.all_predictions.BlackSpots.toString());
      saveFormData.append("Healthy", responseData.all_predictions.Healthy.toString());
      saveFormData.append("LeafCurl", responseData.all_predictions.LeafCurl.toString());
      saveFormData.append("class", responseData.class);
      saveFormData.append("confidence", responseData.confidence.toString());
  
      const saveRes = await fetch(
        `https://precision-plant-care-backend-production.up.railway.app/auth/upload/${userData.user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: saveFormData,
        }
      );
  
      const saveResult = await saveRes.json();
      console.log("✅ Saved to backend:", saveResult);
  
      // Show success message via Toast
      Toast.show({
        type: 'success',
        text1: 'Data saved successfully!',
        text2: `${saveResult?.message || ''}`, // Optionally show any success message from the backend
      });
  
      setModalVisible(false);
    } catch (error) {
      console.error("❌ Save Error:", error);
  
      // Show error message via Toast
      Toast.show({
        type: 'error',
        text1: 'Failed to save data!',
      });
    } finally {
      setSaving(false);
    }
  };
  
  

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.info}>
              <View>
                <Text style={styles.text}>Karachi, 18 April</Text>
                <Text style={styles.text}>Foggy 17°C / 25°C</Text>
              </View>
              <Text style={styles.tempText}>18°C</Text>
            </View>
            <Text style={styles.title}>Heal Your Crop</Text>

            <View style={styles.carouselContainer}>
              {data.length > 0 && (
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
              )}
              <View style={styles.dotsContainer}>
                {data.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      currentIndex === index && styles.activeDot,
                    ]}
                  />
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.btn} onPress={pickImage}>
              <Text style={styles.btnText}>Scan Your Plant</Text>
            </TouchableOpacity>

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                // onPress={() => handleRoute("/track-plant")}
                style={styles.btn1}
              >
                <Image
                  source={require("../../assets/images/track.png")}
                  style={styles.icon}
                />
                <Text style={styles.optionText}>Track Your Plant</Text>
                <Image
                  source={require("../../assets/images/arrow.png")}
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleRoute("/cultivation-tips")}
                style={styles.btn1}
              >
                <Image
                  source={require("../../assets/images/cultivation.png")}
                  style={styles.icon}
                />
                <Text style={styles.optionText}>Cultivation Tips</Text>
                <Image
                  source={require("../../assets/images/arrow.png")}
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Modal transparent visible={modalVisible} animationType="fade">
              <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#377E61" style={{
                      marginLeft:'40%'
                    }} />
                  ) : (
                    <>
                      <View style={styles.modal}>
                        <Text style={styles.title1}>Detection Result</Text>

                        <View style={styles.resultItem}>
                          <Text style={styles.label}>Black Spots:</Text>
                          <Text style={styles.value}>
                            {(responseData?.all_predictions?.BlackSpots ?? 0 * 100).toFixed(2)} %

                          </Text>
                        </View>

                        <View style={styles.resultItem}>
                          <Text style={styles.label}>Healthy:</Text>
                          <Text style={styles.value}>
                            {((responseData?.all_predictions?.Healthy ?? 0) * 100).toFixed(2)} %

                          </Text>
                        </View>

                        <View style={styles.resultItem}>
                          <Text style={styles.label}>Leaf Curls:</Text>
                          <Text style={styles.value}>
                            {((responseData?.all_predictions?.LeafCurl ?? 0) * 100).toFixed(2)} %

                          </Text>
                        </View>

                        <View style={styles.resultItem}>
                          <Text style={styles.label}>Class:</Text>
                          <Text style={styles.value}>
                            {responseData?.class}
                          </Text>
                        </View>

                        <View style={styles.resultItem}>
                          <Text style={styles.label}>Confidence:</Text>
                          <Text style={styles.value}>
                            {((responseData?.confidence ?? 0) * 100).toFixed(2)} %

                          </Text>
                        </View>
<View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',width:'100%'}}>
<TouchableOpacity
                          style={styles.closeButton}
                          onPress={() => setModalVisible(false)}
                        >
                          <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={handleSave}
                          style={styles.closeButton}
                        >
                           {saving ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.closeButtonText}>Save</Text>
  )}
                        </TouchableOpacity>
</View>
                       
                      </View>
                    </>
                  )}
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
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
    paddingBottom: 20,
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

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  responseText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  modal: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 20,
  },
  title1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // primary
    marginBottom: 10,
  },
  resultItem: {
    flexDirection: "row",
      },
  label: {
    fontWeight: "600",
    color: "#555", // secondary
    width: 120,
  },
  value: {
    fontWeight: "400",
    color: "#000",
  },
  closeButton: {
    marginTop: 30,
    backgroundColor: "#007bff", // primary button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

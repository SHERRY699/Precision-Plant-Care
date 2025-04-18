import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/assets/Colors";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useLogout } from "@/utils/api";
import { ApiError } from "@/utils/type";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";

export default function Home(): JSX.Element | null {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null); // Store user data

  const { mutate: Logout } = useLogout(`/auth/logout`, userData?.token);

  const handleNavigation = (path: any) => {
    router.push(path);
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      const parsed = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserData(parsed);
    } catch (e) {
      console.log("Error reading user from storage", e);
    }
  };

  const dispatch = useDispatch()

  useEffect(() => {
    getData(); // Fetch on mount
  }, []);

  const handleLogOut = () => {
    Logout(undefined, {
      onSuccess: (data) => {
        dispatch(logout())
        router.push("/");
      },
      onError: (error: ApiError) => {
        const errorMessage =
          error?.response?.data?.message || "Something went wrong";

        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      },
    });
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
            width={100}
            height={102}
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
            <Text style={{ fontFamily: "robotto", fontSize: 18 }}>
              {userData?.user?.name}
            </Text>
            <TouchableOpacity
              onPress={handleLogOut}
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

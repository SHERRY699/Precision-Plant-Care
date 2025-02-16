import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Colors } from "@/assets/Colors";
import { ModalProps } from "@/utils/type";
import { useRouter } from "expo-router";

export const Login = ({ onToggle }: ModalProps): JSX.Element | null => {
  const [showEye, setShowEye] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();

  // Handle SignUp
  const handleSignUp = () => {
    onToggle(false);
  };

  //Handle Home
  const handleHome = () => {
    router.push("/(tabs)/home");
  };

  //Handle Eye
  const handleEye = () => {
    setShowEye(!showEye);
  };

  // Handle Remember Me
  const handleRemember = () => {
    setRememberMe(!rememberMe);
  };
  return (
    <View style={styles.signindiv}>
      <TextInput style={styles.input} placeholder="Enter Your Username" />
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextInput
          style={[styles.input, styles.positions]}
          placeholder="Enter Your Password"
          secureTextEntry={showEye ? false : true}
        />
        <TouchableOpacity
          onPress={handleEye}
          style={{ position: "absolute", top: 10, right: 48 }}
        >
          {showEye ? (
            <FontAwesome5 name="eye-slash" size={20} color="black" />
          ) : (
            <FontAwesome5 name="eye" size={20} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <TouchableOpacity
            onPress={handleRemember}
            style={{
              width: 18,
              height: 18,
              backgroundColor: `${rememberMe ? "#377E61" : "white"}`,
              borderRadius: 200,
            }}
          />
          <Text style={{ fontFamily: "robottoregular" }}>Remember me </Text>
        </View>
        <Text style={{ fontFamily: "robottoregular", color: "#377E61" }}>
          Forget Password?
        </Text>
      </View>
      <Text
        style={{
          fontFamily: "robottomedium",
          paddingHorizontal: 40,
          marginTop: 10,
        }}
      >
        By continuing you agree to our{" "}
        <Text style={{ color: Colors.text }}>Terms of Services</Text> and
        <Text style={{ color: Colors.text }}> Privacy Policy .</Text>
      </Text>
      <TouchableOpacity onPress={handleHome} style={styles.btn}>
        <Text style={{ color: "white", fontFamily: "robotto" }}>Login</Text>
      </TouchableOpacity>
      <View style={{ width: 300, height: 1, backgroundColor: "grey" }} />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <TouchableOpacity style={styles.btn1}>
          <Image
            source={require("../../assets/images/google.png")}
            style={{ width: 21, height: 21 }}
          />
          <Text style={{ color: "white", fontFamily: "robotto" }}>
            Continue With Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn1}>
          <Image
            source={require("../../assets/images/facebook.png")}
            style={{ width: 21, height: 21 }}
          />
          <Text style={{ color: "white", fontFamily: "robotto" }}>
            Continue With Facebook
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: "flex",
          width: "80%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "robottomedium",
          }}
        >
          Don't Have An Account?
        </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={{ color: Colors.text }}> Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: Colors.text, fontFamily: "robottobold" }}>
        {" "}
        Offline Mode
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  signindiv: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    gap: 30,
    width: "100%",
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: Colors.primary,
  },
  positions: {
    position: "relative",
  },
  btn: {
    width: 213,
    height: 33,
    backgroundColor: Colors.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btn1: {
    width: "80%",
    height: 40,
    backgroundColor: Colors.primary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
});

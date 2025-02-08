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

export const Signup = ({ onToggle }: ModalProps): JSX.Element | null => {
  const [showEye, setShowEye] = useState<boolean>(false);
  const [showEye1, setShowEye1] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  //Handle Eye
  const handleEye = () => {
    setShowEye(!showEye);
  };

  //Handle Eye
  const handleEye1 = () => {
    setShowEye1(!showEye1);
  };

  // Handle Remember Me
  const handleRemember = () => {
    setRememberMe(!rememberMe);
  };

  // Handle SignUp
  const handleSignIn = () => {
    onToggle(true);
  };

  return (
    <View style={styles.signup}>
      <TextInput style={styles.input} placeholder="Enter Your Name" />
      <TextInput style={styles.input} placeholder="Enter Your Username" />
      <TextInput style={styles.input} placeholder="Enter Your Email" />
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
          style={{ position: "absolute", top: 10, right: 40 }}
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
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextInput
          style={[styles.input, styles.positions]}
          placeholder="Confirm Your Password"
          secureTextEntry={showEye1 ? false : true}
        />
        <TouchableOpacity
          onPress={handleEye1}
          style={{ position: "absolute", top: 10, right: 40 }}
        >
          {showEye1 ? (
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
      ></View>

      <TouchableOpacity style={styles.btn}>
        <Text style={{ color: "white", fontFamily: "robotto" }}>Sign Up</Text>
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
      ></View>
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
          Have An Account?
        </Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={{ color: Colors.text }}> Sign In</Text>
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
  signup: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    gap: 20,
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

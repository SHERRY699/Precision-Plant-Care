import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Colors } from "@/assets/Colors";
import { ApiError, ModalProps } from "@/utils/type";
import Toast from "react-native-toast-message";
import { useRegister } from "@/utils/api";

export const Signup = ({ onToggle }: ModalProps): JSX.Element | null => {
  const [showEye, setShowEye] = useState<boolean>(false);
  const [showEye1, setShowEye1] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [items, setItems] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const { mutate: register } = useRegister("/auth/register", items);
  const [loading, setLoading] = useState(false);

  //Handle Eye
  const handleEye = () => {
    setShowEye(!showEye);
  };

  //Handle Eye
  const handleEye1 = () => {
    setShowEye1(!showEye1);
  };

  // Handle SignUp
  const handleSignIn = () => {
    onToggle(true);
  };

  const handleSignUp = () => {
    setLoading(true);
    if (!items?.username || !items?.password || !items?.email || !items?.name) {
      Toast.show({
        type: "info",
        text1: "All Fields Required",
      });
      setLoading(false);
    } else if (items?.password != confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password Should Match",
      });
      setLoading(false);
    } else {
      register(undefined, {
        onSuccess: (data) => {
          Toast.show({
            type: "success",
            text1: `${data?.message}`,
          });
          setItems({
            name: "",
            username: "",
            email: "",
            password: "",
          });
          setConfirmPassword("");
          onToggle(true);
        },
        onError: (error: ApiError) => {
          const errorMessage =
            error?.response?.data?.message || "Something went wrong";

          Toast.show({
            type: "error",
            text1: errorMessage,
          });
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    }
  };

  return (
    <View style={styles.signup}>
      <TextInput
        style={styles.input}
        value={items?.name}
        onChangeText={(text) => setItems((prev) => ({ ...prev, name: text }))}
        placeholder="Enter Your Name"
      />
      <TextInput
        style={styles.input}
        value={items?.username}
        onChangeText={(text) =>
          setItems((prev) => ({ ...prev, username: text }))
        }
        placeholder="Enter Your Username"
      />
      <TextInput
        style={styles.input}
        value={items?.email}
        onChangeText={(text) => setItems((prev) => ({ ...prev, email: text }))}
        placeholder="Enter Your Email"
      />
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextInput
          value={items?.password}
          onChangeText={(text) =>
            setItems((prev) => ({ ...prev, password: text }))
          }
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
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={[styles.input, styles.positions]}
          placeholder="Confirm Your Password"
          secureTextEntry={showEye1 ? false : true}
        />
        <TouchableOpacity
          onPress={handleEye1}
          style={{ position: "absolute", top: 10, right: 48 }}
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

      <TouchableOpacity onPress={handleSignUp} style={styles.btn}>
        {loading ? (
          <ActivityIndicator size="small" color={`${Colors.primary}`} />
        ) : (
          <Text style={{ color: "white", fontFamily: "robotto" }}>Sign Up</Text>
        )}
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
    paddingLeft: 10,
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

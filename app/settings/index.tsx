import { Colors } from "@/assets/Colors";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Settings(): JSX.Element | null {
  const [notifications, setNotifications] = useState<boolean>(false);
  const [english, setEnglish] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  // Handle Notifications
  const handleNotifications = () => {
    setNotifications((prev) => !prev);
  };
  //Handle English
  const handleEnglish = () => {
    setEnglish((prev) => !prev);
  };

  //HnadleModal
  const handleModal = () => {
    setModal((prev) => !prev);
    console.log('pressed')
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F1EDE2" style="dark" />
      <View style={styles.wrapper}>
        <View
          style={{
            width: "100%",
            height: 100,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            borderBottomWidth: 1,
            justifyContent: "space-evenly",
            borderColor: "#00000080",
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
            General
          </Text>
          <Text
            style={{
              fontFamily: "robottoregular",
              color: "#00000080",
              fontSize: 12,
            }}
          >
            Select your app language{" "}
          </Text>
          <TouchableOpacity 
  activeOpacity={0.7} 
  pressRetentionOffset={{ bottom: 10, left: 10, right: 10, top: 10 }} onPress={handleModal}>
            <Text
              style={{
                fontFamily: "robottomedium",
                fontSize: 12,
              }}
            >
              English
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            height: 100,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            borderBottomWidth: 1,
            justifyContent: "space-evenly",
            borderColor: "#00000080",
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
            Notifications
          </Text>
          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "robottoregular",
                color: "#00000080",
                fontSize: 12,
              }}
            >
              Receive Push Notifications
            </Text>
            <Switch
              style={{ marginRight: 10 }}
              trackColor={{ false: "#767577", true: `${Colors.secondary}` }}
              value={notifications}
              onValueChange={handleNotifications}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 100,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            borderBottomWidth: 1,
            justifyContent: "space-evenly",
            borderColor: "#00000080",
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
            Weather
          </Text>
          <Text
            style={{
              fontFamily: "robottoregular",
              color: "#00000080",
              fontSize: 12,
            }}
          >
            Choose your preferred weather temperature unit
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: "robottomedium",
                fontSize: 12,
              }}
            >
              Centigrade
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            height: 100,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            justifyContent: "space-evenly",
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
            Application
          </Text>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Text
              style={{
                fontFamily: "robottomedium",
                fontSize: 12,
              }}
            >
              Version
            </Text>
            <Text
              style={{
                fontFamily: "robottoregular",
                color: "#00000080",
                fontSize: 12,
              }}
            >
              1.0.0 Beta Released
            </Text>
            <Text>{modal ? "Modal is Open" : "Modal is Closed"}</Text>

          </View>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.modalview}>
          <View style={styles.container}>
            <Text>Choose Your App Language</Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={handleEnglish}
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: `${english ? "#377E61" : "white"}`,
                  borderRadius: 200,
                }}
              />
              <Text style={{ fontFamily: "robottoregular" }}>English </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={handleEnglish}
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: `${english ? "#377E61" : "white"}`,
                  borderRadius: 200,
                }}
              />
              <Text style={{ fontFamily: "robottoregular" }}>اردو </Text>
            </View>
            <TouchableOpacity
              onPress={handleModal}
              style={{ position: "absolute", top: -10, right: 4 }}
            >
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1EDE2",
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  modalview: {
    flex:1,
    backgroundColor: "#0000001A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  container: {
    width: "70%",
    height: 200,
    backgroundColor: Colors.bg,
    borderRadius: 20,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 5,
    gap: 8,
    justifyContent: "space-evenly",
  },
});

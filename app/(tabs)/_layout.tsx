import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "@/assets/Colors";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: () => (
            <FontAwesome5 name="home" size={20} color={Colors.secondary} />
          ),
          tabBarActiveTintColor: `${Colors.secondary}`,
          tabBarActiveBackgroundColor: `${Colors.primary}`,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: () => (
            <FontAwesome name="files-o" size={24} color={Colors.secondary} />
          ),
          tabBarActiveTintColor: `${Colors.secondary}`,
          tabBarActiveBackgroundColor: `${Colors.primary}`,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: () => (
            <FontAwesome name="user" size={24} color={Colors.secondary} />
          ),
          tabBarActiveTintColor: `${Colors.secondary}`,
          tabBarActiveBackgroundColor: `${Colors.primary}`,
        }}
      />
    </Tabs>
  );
}

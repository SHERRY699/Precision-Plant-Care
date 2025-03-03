import { Colors } from "@/assets/Colors";
import { StatusBar, StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Cultivation tips data
const cultivationTips = [
  {
    title: "Climate & Location ☀️🌿",
    details: [
      "Temperature: Lemons grow best in warm climates (20-30°C / 68-86°F). Avoid frost exposure.",
      "Sunlight: Requires 6-8 hours of direct sunlight daily.",
      "Protection: If in a cold region, grow in pots and move indoors during winter.",
    ],
  },
  {
    title: "Soil Requirements 🌿",
    details: [
      "Well-draining, sandy loam soil is best.",
      "pH Level: 5.5 to 6.5 (slightly acidic).",
      "Enrich soil with organic compost or well-rotted manure.",
    ],
  },
  {
    title: "Planting Method 🌱",
    details: [
      "From Seeds: Takes 3-6 years to bear fruit.",
      "From Cuttings/Grafting: Fruit production starts within 2-3 years.",
      "Spacing: Keep 10-15 feet (3-4.5m) between trees for proper growth.",
    ],
  },
  {
    title: "Watering Needs 💧",
    details: [
      "Keep soil moist but not soggy.",
      "Water 2-3 times a week (reduce in winter).",
      "Ensure proper drainage to prevent root rot.",
    ],
  },
  {
    title: "Fertilization 🌾",
    details: [
      "Use nitrogen-rich fertilizers (e.g., NPK 10-10-10).",
      "Feed plants every 4-6 weeks during the growing season.",
      "Organic options: Compost, cow manure, banana peels (potassium boost).",
    ],
  },
  {
    title: "Pruning & Maintenance ✂️",
    details: ["Remove dead/diseased branches to promote airflow."],
  },
];

export default function CultivationTips(): JSX.Element | null {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F1EDE2" />
      <FlatList
  data={cultivationTips}
  keyExtractor={(item) => item.title}
  contentContainerStyle={[styles.listContainer, { paddingBottom: 50 }]} // Add padding at bottom
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Text style={styles.heading}>{item.title}</Text>
      {item.details.map((detail, index) => (
        <Text key={index} style={styles.text}>
          • {detail}
        </Text>
      ))}
    </View>
  )}
  ListFooterComponent={<View style={{ height: 60 }} />} 
/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1EDE2",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontFamily: "robottobold",
    color: Colors.secondary,
    fontSize: 20,
    marginBottom: 6,
  },
  text: {
    fontFamily: "robottomedium",
    fontSize: 15,
    paddingHorizontal: 4,
    color: "#333",
  },
});

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const Heading = () => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>Shopping</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    backgroundColor: "#2196F3", // A blue color for the banner
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1000, // Ensure the banner is on top
  },
  bannerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Heading;

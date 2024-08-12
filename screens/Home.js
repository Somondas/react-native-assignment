import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { Component, useEffect, useState } from "react";
import Heading from "../components/Heading";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        const data = await response.json();
        // console.log(data);
        const limitedData = data.slice(0, 20);

        setProducts(limitedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 60 }}>
      <Heading />
      <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 10 }}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Image
                source={{ uri: item.images[0] }}
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>
                  Rs.{item.price.toFixed(2)}
                </Text>
                <View style={styles.productButton}>
                  <Button title="Details" />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  productContainer: {
    width: "100%",
    height: 150,
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
  },
  productDetails: {
    paddingLeft: 10,
    // width: "100%",
  },
  productButton: {
    flex: 1,
    justifyContent: "flex-end",
    width: 90,
  },
  productImage: {
    width: "50%",
    height: "100%",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    width: "55%",
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
});
export default Home;

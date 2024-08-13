import {
  Button,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import Heading from "../components/Heading";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // >> Fetch Product Details__________________________
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

  // -> Modal Functions_____________________________
  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  // >> Pre-Loader___________________________________________
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
                <TouchableOpacity onPress={() => openModal(item)}>
                  <Text style={styles.detailsBtn}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          {selectedProduct && (
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <Text>
                    <Icon name="close" color={"#f23712"} />
                  </Text>
                </TouchableOpacity>
                <Image
                  source={{ uri: selectedProduct.images[0] }}
                  style={{
                    width: "100%",
                    height: 200,
                    marginTop: 2,
                  }}
                />
                <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                <Text style={styles.modalPrice}>
                  Rs.{selectedProduct.price.toFixed(2)}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedProduct.description.slice(0, 100)}...
                </Text>
                <TouchableOpacity style={styles.addToCartButton}>
                  <Text style={styles.addToCartButtonText}>Add To Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      </View>
    </SafeAreaView>
  );
};
// >> StyleSheet____________________________________________
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
  detailsBtn: {
    marginTop: 5,
    fontSize: 18,
    backgroundColor: "#2196F3",
    // width: "",
    color: "#ffff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    textAlign: "center",
    width: 110,
    borderRadius: 3,
  },
  // ? Modal Styles__________________
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255, .8)",
    // padding: 20,
    width: "100%",
    height: "100%",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 8,
    width: "90%",
    height: 410,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    color: "#888",
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addToCartButton: {
    width: "50%",
    borderWidth: 3,
    borderColor: "#2196F3",
    borderRadius: 5,
    padding: 5,
  },
  addToCartButtonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#2196f3",
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    zIndex: 1,
    backgroundColor: "#FFF",
    borderRadius: 19,
    borderWidth: 2,
    borderColor: "#f23712",
    padding: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default Home;

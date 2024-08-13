import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import AddToCart from "./screens/AddToCart.js";
import Home from "./screens/Home";
import store from "./store";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            initialRouteName: "Home",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddToCart" component={AddToCart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

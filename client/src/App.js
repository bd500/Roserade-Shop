import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import UserScreen from "./screens/UserScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UsersListScreen from "./screens/Admin/UsersListScreen";
import EditUserScreen from "./screens/Admin/EditUserScreen";
import ProductListScreen from "./screens/Admin/ProductListScreen";
import CreateProductScreen from "./screens/Admin/CreateProductScreen";
import EditProductScreen from "./screens/Admin/EditProductScreen";
import OrdersListScreen from "./screens/Admin/OrdersListScreen";
import OrderUpdateScreen from "./screens/Admin/OrderUpdate";
import ErrorScreen from "./screens/ErrorScreen";

function App() {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} exact />
                        <Route
                            path="/search/:keyword"
                            element={<HomeScreen />}
                        />
                        <Route
                            path="/page/:pageNumber"
                            element={<HomeScreen />}
                        />
                        <Route
                            path="/search/:keyword/:pageNumber"
                            element={<HomeScreen />}
                        />

                        <Route
                            path="/products/:id"
                            element={<ProductScreen />}
                        />
                        <Route path="/cart/:id?" element={<CartScreen />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/signup" element={<SignupScreen />} />
                        <Route path="/profile" element={<UserScreen />} />
                        <Route path="/shipping" element={<ShippingScreen />} />
                        <Route path="/payment" element={<PaymentScreen />} />
                        <Route
                            path="/placeorder"
                            element={<PlaceOrderScreen />}
                        />
                        <Route path="/order/:id" element={<OrderScreen />} />

                        {/***************  Admin Routes ***************/}
                        {/**** Users */}
                        <Route
                            path="/admin/users"
                            element={<UsersListScreen />}
                        />
                        <Route
                            path="/admin/user/:id"
                            element={<EditUserScreen />}
                        />

                        {/**** Products */}
                        <Route
                            path="/admin/products"
                            element={<ProductListScreen />}
                        />
                        <Route
                            path="/admin/products/:pageNumber"
                            element={<ProductListScreen />}
                        />
                        <Route
                            path="/admin/product/create"
                            element={<CreateProductScreen />}
                        />
                        <Route
                            path="/admin/product/:id"
                            element={<EditProductScreen />}
                        />
                        <Route
                            path="/admin/orders"
                            element={<OrdersListScreen />}
                        />
                        <Route
                            path="/admin/order/:id"
                            element={<OrderUpdateScreen />}
                        />

                        {/**** Error route */}
                        <Route path="*" element={<ErrorScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;

import React, {useEffect, useState} from "react";
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../slices/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
    const dispatch = useDispatch();
    const productsList = useSelector((state) => state.productsList);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            <h2>Latest products</h2>
            <Row>
                {productsList.loading ? (
                    <Loader />
                ) : productsList.error ? (
                    <Message variant="danger">{productsList.error}</Message>
                ) : (
                    productsList.products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
}

export default HomeScreen;

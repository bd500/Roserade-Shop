import React, {useEffect, useState} from "react";
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, fetchTopProducts} from "../slices/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useParams} from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductsCarousel from "../components/ProductsCarousel";

function HomeScreen() {
    const dispatch = useDispatch();
    const productsList = useSelector((state) => state.productsList);

    const {keyword, pageNumber} = useParams();

    useEffect(() => {
        dispatch(fetchProducts({keyword, pageNumber}));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            {!keyword && <ProductsCarousel />}
            <h2 className="mt-3">Latest products</h2>
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
            <Paginate
                page={productsList.page}
                pages={productsList.pages}
                keyword={keyword ? keyword : ""}
            />
        </>
    );
}

export default HomeScreen;

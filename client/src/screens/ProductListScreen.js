import React, {useEffect} from "react";
import {Button, Table, Image, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useNavigate} from "react-router-dom";
import {deleteProduct, fetchProducts} from "../slices/productSlice";

function ProductListScreen() {
    const dispatch = useDispatch();
    const {products, error, loading, deleted} = useSelector(
        (state) => state.productsList
    );

    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(fetchProducts());
        } else {
            navigate("/");
        }
    }, [dispatch, deleted, navigate]);

    function deleteHandler(id) {
        dispatch(deleteProduct(id));
    }

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <LinkContainer to={"/admin/product/create"}>
                        <Button className="my-3" variant="dark">
                            Add new Product
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant={"danger"}>{error}</Message>
            ) : (
                <Table striped bordered responsive>
                    <thead style={{textAlign: "center"}}>
                        <tr>
                            <th>ID</th>
                            <th>IMAGE</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>QUANTITY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fluid
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.countInStock}</td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/product/${product._id}`}
                                    >
                                        <Button
                                            className="btn-sm"
                                            variant="light"
                                        >
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <Button
                                        className="btn-sm"
                                        variant="danger"
                                        onClick={() =>
                                            deleteHandler(product._id)
                                        }
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}

export default ProductListScreen;

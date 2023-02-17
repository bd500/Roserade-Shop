import axios from "axios";
import React, {useEffect, useState} from "react";
import {Form, Button, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {fetchProductById} from "../slices/productSlice";
import {updateProduct} from "../slices/productSlice";

function EditProductScreen() {
    const dispatch = useDispatch();
    const {product, loading, error, updated} = useSelector(
        (state) => state.productsList
    );

    const navigate = useNavigate();
    const {id} = useParams();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [imageUploaded, setImageUploaded] = useState(false);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            if (!product.name || product._id !== id) {
                dispatch(fetchProductById(id));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setDescription(product.description);
                setCountInStock(product.countInStock);
            }
        } else {
            navigate("/");
        }
    }, [dispatch, product, updated]);

    function submitHandler(e) {
        e.preventDefault();
        dispatch(
            updateProduct({
                id,
                name,
                price,
                description,
                image,
                brand,
                category,
                countInStock,
            })
        );
    }

    async function uploadFileHandler(e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setImageUploaded(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const {data} = await axios.post("/api/upload", formData, config);

            setImage(data);
            setImageUploaded(false);
        } catch (error) {
            console.log(error);
            setImageUploaded(false);
        }
    }

    return (
        <>
            <Link to={"/admin/products"} className="btn btn-light my-3">
                <i class="fa-solid fa-arrow-left"></i> Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {updated && (
                    <Message variant={"success"}>Product Updated</Message>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant={"danger"}>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                placeholder="Select Image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control
                                type="file"
                                onChange={uploadFileHandler}
                            />
                        </Form.Group>
                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button type="submit" className="my-3">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
}

export default EditProductScreen;

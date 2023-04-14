import axios from "axios";
import React, {useEffect, useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import FormContainer from "../../../components/FormContainer";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Meta from "../../../components/Meta";
import {createProduct} from "../../../slices/productSlice";

function CreateProductScreen() {
    const dispatch = useDispatch();
    const {loading, error, success} = useSelector(
        (state) => state.productsList
    );

    const navigate = useNavigate();
    // const {id} = useParams();

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
            //do something
        } else {
            navigate("/404");
        }
    }, []);

    function submitHandler(e) {
        e.preventDefault();
        if (imageUploaded)
            dispatch(
                createProduct({
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
            <Meta title="Add New Product" />
            <Link to={"/admin/products"} className="btn btn-light">
                <i class="fa-solid fa-arrow-left"></i> Go back to product
            </Link>
            <FormContainer>
                <h1>Add Product</h1>
                {success && (
                    <Message variant={"success"}>Product Added</Message>
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
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button type="submit" className="my-3">
                            Add
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
}

export default CreateProductScreen;

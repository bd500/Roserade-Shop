import {Link} from "react-router-dom";
import Meta from "../../../components/Meta";
import FormContainer from "../../../components/FormContainer";
import Message from "../../../components/Message";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

const EditCategoryScreen = () => {
    const [name, setName] = useState("");

    const submitHandler = () => {};

    return (
        <>
            <Meta title="Edit Category" />
            <Link to="/admin/brands" className="btn btn-light">
                <i class="fa-solid fa-arrow-left"></i> Go Back To Categories
            </Link>
            <FormContainer>
                <h1>Edit Category</h1>
                <Message variant="success">Edited</Message>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                        />
                    </Form.Group>
                    <Button type="submit" className="mt-3">
                        Save
                    </Button>
                </Form>
            </FormContainer>
        </>
    );
};
export default EditCategoryScreen;

import {Link} from "react-router-dom";
import Meta from "../../../components/Meta";
import FormContainer from "../../../components/FormContainer";
import Message from "../../../components/Message";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

const CreateBrandScreen = () => {
    const [name, setName] = useState("");

    return (
        <>
            <Meta title="Add New Brand"></Meta>
            <Link to="/admin/brands" className="btn btn-light">
                <i class="fa-solid fa-arrow-left"></i> Go back To Brand
            </Link>
            <FormContainer>
                <h1>Add new Brand</h1>
                <Message variant={"success"}>Brand Added </Message>
                {/* <Message variant={"dangerous"}></Message> */}
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter brand name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" className="mt-3">
                        Add
                    </Button>
                </Form>
            </FormContainer>
        </>
    );
};
export default CreateBrandScreen;

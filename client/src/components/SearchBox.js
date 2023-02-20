import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function SearchBox() {
    const [keyword, setKeyword] = useState();
    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate("/");
        }
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Control
                    type="text"
                    name="q"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search product..."
                    className="ms-5 me-2"
                ></Form.Control>
            </Form.Group>
        </Form>
    );
}

export default SearchBox;

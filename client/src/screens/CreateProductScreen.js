import React, {useEffect, useState} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

function CreateProductScreen() {
    return (
        <>
            <Link to={"/admin/products"} className="btn btn-light">
                <i class="fa-solid fa-arrow-left"></i> Go back
            </Link>
            <h1>Create New Product</h1>
        </>
    );
}

export default CreateProductScreen;

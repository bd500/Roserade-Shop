import {Button, Col, Row, Table} from "react-bootstrap";
import Message from "../../../components/Message";
import Meta from "../../../components/Meta";
import {LinkContainer} from "react-router-bootstrap";

const CategoryListScreen = () => {
    return (
        <>
            <Meta title="All Categories" />
            <Row className="align-items-center">
                <Col>
                    <h1>Categories</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <LinkContainer to="/admin/categories/create">
                        <Button className="my-3" variant="dark" type="button">
                            Add New Categories
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
            <Message variant="danger">Error</Message>
            <Table striped bordered responsive>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr>
                        <td>13</td>
                        <td>123</td>
                        <td>
                            <LinkContainer to="/admin/categories/1">
                                <Button className="btn-sm" variant="light">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </Button>
                            </LinkContainer>
                            <Button
                                className="btn-sm"
                                variant="danger"
                                onClick={() => console.log("deleted")}
                            >
                                <i class="fa-solid fa-trash"></i>
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};
export default CategoryListScreen;

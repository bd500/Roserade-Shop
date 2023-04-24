import {useEffect, useState} from "react";
import {Dropdown, Nav} from "react-bootstrap";
import {getAllBrands} from "../slices/brandSlice";
import {getAllCategories} from "../slices/categorySlice";
import {useSelector, useDispatch} from "react-redux";

const MultiLevelDropDown = () => {
    const [show, setShow] = useState(false);
    const [nestedShow, setNestedShow] = useState(false);

    const {brands} = useSelector((state) => state.brands);
    const {categories} = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBrands());
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleShow = () => {
        setShow(true);
    };

    const handleHide = () => {
        setShow(false);
        setNestedShow(false);
    };

    const handleNestedShow = () => {
        setNestedShow(true);
    };

    const handleNestedHide = () => {
        setNestedShow(false);
    };

    return (
        <Nav>
            <Dropdown
                show={show}
                onMouseEnter={handleShow}
                onMouseLeave={handleHide}
            >
                <Dropdown.Toggle as={Nav.Link}>Dropdown Item</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        href="#action/1"
                        onMouseEnter={handleNestedShow}
                        onMouseLeave={handleNestedHide}
                    >
                        Action
                        <Dropdown.Menu show={nestedShow}>
                            <Dropdown.Item href="#action/2">
                                Nested Action 1
                            </Dropdown.Item>
                            <Dropdown.Item href="#action/3">
                                Nested Action 2
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Item>
                    <Dropdown.Item href="#action/4">
                        Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#action/5">
                        Something else here
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
    );
};
export default MultiLevelDropDown;

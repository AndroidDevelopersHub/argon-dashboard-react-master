import React,{useState ,useEffect ,useContext ,useRef} from "react";
// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip, Button, CardBody, FormGroup, Input,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import {deleteData, getTableData, updateData} from "../../../services/commonService";
import {AiFillDelete, FiEdit} from "react-icons/all";

import {ToastContainer , ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination";
import {FormControl ,Form ,Col ,InputGroup} from "react-bootstrap";
import {FaSearch} from "react-icons/all";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";

const Edit = () => {


    const { id } = useParams();
    const [details , setDetails] = useState({})
    const [edit , setEdit] = useState({})


    useEffect( ()=>{

        console.log(id)
        getTableDataX();

    },[])


    const getTableDataX = async () => {
        const result = await getTableData('/users/'+id ,{});
        setDetails(result.items[0])
        console.log(result.items[0])


    };


    const handleOnChnage = (e) =>{
        setEdit(edit => ({
            ...edit, [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit =(e) =>{
        e.preventDefault()
        updateData(`/users/${id}`,{}, edit).then((res) =>{
            if (res.status===1){
                toast.success(res.message)
            }else {
                toast.warning(res.message)
            }
        }).catch((err)=>{
            toast.error(err)
        })
    }


    return (
        <>  <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Col className="order-xl-1" xl="12">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">My account</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={(e) => {
                                                    handleOnSubmit(e) }}
                                                size="sm"
                                            >
                                                Save
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            User information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Name
                                                        </label>
                                                        <Input
                                                            onChange={(e)=>handleOnChnage(e)}
                                                            name={'name'}
                                                            className="form-control-alternative"
                                                            defaultValue={details?.name}
                                                            id="input-username"
                                                            placeholder="Username"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Email address
                                                        </label>
                                                        <Input
                                                            onChange={(e)=>handleOnChnage(e)}
                                                            name={'email'}
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            defaultValue={details?.email}
                                                            type="email"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-first-name"
                                                        >
                                                           Phone
                                                        </label>
                                                        <Input
                                                            onChange={(e)=>handleOnChnage(e)}
                                                            defaultValue={details?.phone}
                                                            name={'phone'}
                                                            className="form-control-alternative"

                                                            id="input-first-name"
                                                            placeholder="First name"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-last-name"
                                                        >
                                                           Wallet
                                                        </label>
                                                        <Input
                                                            onChange={(e)=>handleOnChnage(e)}
                                                            name={'wallet'}
                                                            className="form-control-alternative"
                                                            defaultValue="Jesse"
                                                            id="input-last-name"
                                                            defaultValue={details?.wallet}
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>

                                    {/*    <hr className="my-4" />
                                         Address
                                        <h6 className="heading-small text-muted mb-4">
                                            Contact information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-address"
                                                        >
                                                            Address
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                            id="input-address"
                                                            placeholder="Home Address"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-city"
                                                        >
                                                            City
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue="New York"
                                                            id="input-city"
                                                            placeholder="City"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-country"
                                                        >
                                                            Country
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue="United States"
                                                            id="input-country"
                                                            placeholder="Country"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-country"
                                                        >
                                                            Postal code
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-postal-code"
                                                            placeholder="Postal code"
                                                            type="number"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                         Description
                                        <h6 className="heading-small text-muted mb-4">About me</h6>
                                        <div className="pl-lg-4">
                                            <FormGroup>
                                                <label>About Me</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="A few words about you ..."
                                                    rows="4"
                                                    defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source."
                                                    type="textarea"
                                                />
                                            </FormGroup>
                                        </div>*/}
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>



                    </div>
                </Row>

            </Container>
        </>
    );
};

export default Edit;

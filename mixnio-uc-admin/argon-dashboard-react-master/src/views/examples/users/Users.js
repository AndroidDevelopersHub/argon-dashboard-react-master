import React,{useState ,useEffect ,useContext ,useRef} from "react";
import { useHistory } from 'react-router-dom'

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
    UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import {deleteData, getTableData} from "../../../services/commonService";
import {AiFillDelete, FiEdit} from "react-icons/all";

import {ToastContainer , ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination";
import {FormControl ,Form ,Col ,InputGroup} from "react-bootstrap";
import {FaSearch} from "react-icons/all";

const Users = () => {
    const history = useHistory()
    const [tableList , setTableList] = useState(null)
    const [pagination, setPagination] = useState({});
    const [queryParams, setQueryParams] = useState({
        limit: 7,
        page: 1,
        search_string: null
    });


    useEffect( ()=>{

        getTableDataX();

    },[])


    const getTableDataX = async () => {
        const result = await getTableData('/users' ,queryParams);
        console.log(result)
        setTableList(result.items)
        setPagination({ ...pagination, ...result.pagination});

    };



    const handlePageChange = async (pageNumber) => {
        console.log(pageNumber)
        const params = { ...queryParams, page: pageNumber };
        setQueryParams(params);

        const result = await getTableData('/users',params);
        setTableList(result.items);
        setPagination({ ...pagination, ...result.pagination });
    };
    const handleOnDelete = (e,id)=>{
        e.preventDefault()
        deleteData('/users/'+id).then((res)=>{
            console.log(res)
            if (res.status === 1){
                toast.success(res.message)
                getTableDataX()
            }else if (res.status === 2){
                toast.warning(res.message)
            }

        }).catch((err) =>{
            toast.error(err)
        })
    }


    const handleOnChnage = (e) =>{

        const params = { ...queryParams, search_string: e.target.value };
        setQueryParams(params);


    }

    const renderTableList = () => {
      return(
          tableList &&
          tableList.map((data, index) => {
              return (
                  <tbody>
                  <tr>
                      <td>
                          {index+1}
                      </td>
                      <th scope="row">
                          <span className="mb-0 text-sm">{data?.name}</span>
                      </th>
                      <td>
                          {data?.phone}
                      </td>
                      <td>
                          {data?.email}
                      </td>
                      <td>
                          ৳ {data?.wallet}
                      </td>

                      <td className="text-right">
                          <UncontrolledDropdown>
                              <DropdownToggle
                                  className="btn-icon-only text-light"
                                  href="#pablo"
                                  role="button"
                                  size="sm"
                                  color=""
                                  onClick={(e) => e.preventDefault()}
                              >
                                  <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                  <DropdownItem
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                  >
                                      View
                                  </DropdownItem>
                                  <DropdownItem
                                     /* href="/admin/edit"*/
                                      onClick={(e) => {
                                       history.push('/admin/edit/'+data.id)  }}
                                  >
                                      Edit
                                  </DropdownItem>
                                  <DropdownItem
                                      onClick={(e) => {handleOnDelete(e,data.id)} }>
                                      Delete
                                  </DropdownItem>
                              </DropdownMenu>
                          </UncontrolledDropdown>
                      </td>

                  </tr>
                  </tbody>
              )
          })
      )
    }


    return (
        <>  <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Users List</h3>
                                <div>
                                    <Form.Row style={{marginRight: '75%', marginTop: '1%'}}>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>
                                                        <FaSearch/>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    onChange={ (e)=> {
                                                        handleOnChnage(e)
                                                    }}
                                                    onKeyDown={(e)=>{
                                                        if(e.keyCode === 13){
                                                            console.log(queryParams)
                                                            getTableDataX()
                                                        }
                                                    }}
                                                    type="text"
                                                    placeholder="Search here.."
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                </div>

                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">#ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">PHONE</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">WALLET</th>
                                    <th scope="col" />
                                </tr>
                                </thead>
                                {renderTableList()}

                            </Table>

                            <CardFooter className="py-4">
                                <nav aria-label="...">

                                    <Pagination
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activePage={pagination?.page}
                                        itemsCountPerPage={pagination?.limit}
                                        totalItemsCount={pagination?.totalDocs}
                                        pageRangeDisplayed={10}
                                        onChange={handlePageChange}
                                    />

                                   {/* <Pagination
                                        className="pagination justify-content-end mb-0"
                                        listClassName="justify-content-end mb-0"
                                    >
                                        <PaginationItem className="disabled">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                                tabIndex="-1"
                                            >
                                                <i className="fas fa-angle-left" />
                                                <span className="sr-only">Previous</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="active">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                2 <span className="sr-only">(current)</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                3
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}>
                                                <i className="fas fa-angle-right" />
                                                <span className="sr-only">Next</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>*/}
                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>

            </Container>
        </>
    );
};

export default Users;

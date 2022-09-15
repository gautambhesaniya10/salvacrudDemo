import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Button,
    InputGroup,
    Input,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';


const Homepage = () => {

    const [serachbox, setSerachbox] = useState("");
    const [state, setstate] = useState(false);
    const navigate = useNavigate();

    const getData = JSON.parse(localStorage.getItem("formdata"));

    if (getData === null) {
        localStorage.setItem("formdata", JSON.stringify([{
            id: Math.random(),
            Name: "gautam",
            Age: "23",
            Phone: "9429914508",
            Gender: "Male",
            Hobby: "cricket"
        }]))
    }

    const filterData = getData && getData?.filter((el, index) => {
        if (serachbox === "") {
            return el;
        } else if (serachbox !== "") {
            let fullName = `${el.Name}`;
            let res = fullName.toLowerCase();
            return res.match(serachbox.toLowerCase());
        }
    });

    const deleteUser = (deluser) => {
        const remaingData = filterData && filterData.filter(item => item.id !== deluser.id);
        console.log("remaingData",remaingData);
        localStorage.setItem("formdata", JSON.stringify(remaingData));
        setstate(true)
        message.success("User Deleted Sucessfully")
    }

    const editUser = (edituser) => {
        navigate(`/edituser/${edituser.id}` , {state : edituser})
    }

    const columns = [
        {
            dataField: "Index",
            formatter: (cell, row, index) => {
                return index + 1;
            },
            text: "Sr.No",
            headerStyle: () => {
                return { width: "50px", fontSize: "14px" };
            },
        },
        {
            dataField: "Name",
            text: "Name",
            sort: true,
            headerStyle: () => {
                return { width: "105px", fontSize: "14px" };
            },
        },
        {
            dataField: "Age",
            text: "Age",
            sort: true,
            headerStyle: () => {
                return { width: "110px", fontSize: "14px" };
            },
        },
        {
            dataField: "Phone",
            text: "Phone",
            sort: true,
            headerStyle: () => {
                return { width: "105px", fontSize: "14px" };
            },
        },
        {
            dataField: "Gender",
            text: "Gender",
            headerStyle: () => {
                return { width: "75px", fontSize: "14px" };
            },
        },
        {
            dataField: "Hobby",
            text: "Hobby",
            headerStyle: () => {
                return { width: "110px", fontSize: "14px" };
            },
        },
        {
            dataField: "link",
            text: "Profile",
            headerStyle: () => {
                return { width: "80px", fontSize: "14px" };
            },
            formatter: (rowContent, row) => {
                return (
                    <>
                        {/* <button name="viewbtn" className="profile-btn" outline size="sm">
                            Edit
                        </button> */}

                        {filterData?.map((item, index) => {
                            if (item.id == row.id) {
                                return (
                                    <>
                                    <button onClick={() => deleteUser(item)} type="submit" size="sm">
                                        Delete
                                    </button>
                                    <button onClick={() => editUser(item)} type="submit" size="sm">
                                        Edit
                                    </button>
                                </>
                                );
                            }
                        })}
                    </>
                );
            },
        },
    ];

    const options = {
        sizePerPageList: [
            {
                text: "5",
                value: 5,
            },
            {
                text: "10",
                value: 10,
            },
            {
                text: "All",
                value: filterData.length
            }
        ],
    };

    const adduserHandler = () => {
        navigate("/adduser")
    }

    return (
        <>
            <div>
                <Card>
                    <CardHeader
                    >
                        <CardTitle tag="h4">User Table</CardTitle>
                        <InputGroup className="no-border">
                            <Input
                                name="Name"
                                value={serachbox}
                                onChange={(e) => setSerachbox(e.target.value)}
                                placeholder="Search user..."
                            />
                        </InputGroup>
                    </CardHeader>
                    <CardBody>
                        <BootstrapTable
                            responsive
                            bootstrap4
                            keyField="id"
                            data={filterData}
                            columns={columns}
                            hover={true}
                            pagination={paginationFactory(options)}
                            striped
                        />
                    </CardBody>
                </Card>
                <div style={{ marginTop: "5%" }}>
                    <Button onClick={() => adduserHandler()}>Add User</Button>
                </div>
            </div>
        </>
    )
}

export default Homepage
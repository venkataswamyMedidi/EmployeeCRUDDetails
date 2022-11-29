
import * as React from 'react';
import { useState } from "react";
import axios from "axios";
import './index.css';
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EmployeeNavBar from '../NavBar/EmployeeNavBar'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        "& .MuiTableCell-root": {
            borderBottom: 0,
            padding: "8px 16px",
            fontSize: 15
        },
        '&.MuiTableCell - paddingCheckbox': {
            backgroundColor: 'red'
        },
        // "& .MUIDataTableBodyCell": {
        //     root: {
        //         backgroundColor: "#FF0000",
        //     },
        // },
        // "& MuiTableRow-root": {
        //     backgroundColor: "red"
        // }
    },
});

function EmployeeDetails() {
    const classes = useStyles();
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [country, setCountry] = useState("")
    const [position, setPosition] = useState("")
    const [wage, setWage] = useState(0)
    const [employeeList, SetEmployeeList] = useState([]);
    const [newWage, setnewWage] = useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const columns = [
        {
            name: "name",
            options: {
                sortOrder: "asc"
            }
        },
        // {
        //   name: "Title"
        // },
        {
            name: "age"
        },
        {
            name: "country"
        },
        {
            name: "position"
        },
        {
            name: "wage"
        },
        // {
        //     name: "Action",
        //     options: {
        //         filter: false,
        //         sort: false,
        //         empty: true,
        //         customBodyRender: (val) => {
        //             return (
        //                 <>
        //                     <input type="text" className="" placeholder="2000..."
        //                         onChange={(event) => setnewWage(event.target.value)} />
        //                     <button
        //                         // onClick={(e) => {
        //                         //     e.stopPropagation();
        //                         //     window.alert("EDIT");
        //                         // }}
        //                         onClick={(val) => { updateEmployeeWage(val.id) }}
        //                     >
        //                         Edit
        //                     </button>
        //                     <button
        //                         // onClick={(e) => {
        //                         //     const { data } = this.state;
        //                         //     data.shift();
        //                         //     this.setState({ data });
        //                         // }}
        //                         onClick={(val) => { SetEmployeeList(DeleteEmployee(val.id)) }}
        //                     >
        //                         Delete
        //                     </button>
        //                 </>
        //             );
        //         }
        //     }
        // }

    ];

    const options = {
        // responsive: "scrollMaxHeight" "standard","vertical","verticalAlways","simple
        //responsive: "standard | vertical"
        filterType: "checkbox",
        responsive: "standard",
        rowsPerPage: [3],
        rowsPerPageOptions: [4, 8, 16],
        draggable: "true",
        // customBodyRender: (value, tableMeta, updateEmployeeWage) => {
        //     return (
        //         <input
        //             value={value}
        //             index={tableMeta.columnIndex}
        //             change={value => updateEmployeeWage(value.id)}
        //         />
        //         // <button onClick={(val) => { updateEmployeeWage(val.id) }}>Update</button>
        //     );
        //     // <button onClick={(val) => { updateEmployeeWage(val.id) }}>Update</button>
        // },
    }

    const getMuiTheme = () =>
        createTheme({
            overrides: {
                MUIDataTableBodyCell: {
                    root: {
                        backgroundColor: "red",
                    },
                },
                MUIDataTablePagination: {
                    root: {
                        backgroundColor: "blue",
                        color: "#fff",
                    },
                },
                "& MuiTableRow-root": {
                    backgroundColor: "red"
                }
            },
        });

    const addEmployee = () => {
        axios.post("http://localhost:3001/create", {
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage
        })
        //.then((response) => { console.log(response) })
        SetEmployeeList([...employeeList, { // add newvalues to an array
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage
        }])
            .catch(function (error) { console.log(error); })
    }

    const getEmployee = () => {
        axios.get("http://localhost:3001/employees").then((response) => {
            console.log("response", response)
            SetEmployeeList(response.data);
        })
    }

    const updateEmployeeWage = (id) => {
        axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then((response) => {
            SetEmployeeList(employeeList.map((val) => { // want to update the list directly(when you click on update button it will update the list)
                console.log("Updateresponse", response)
                return val.id === id ? {
                    id: val.id,
                    name: val.name,
                    age: val.age,
                    country: val.country,
                    position: val.position,
                    wage: val.newWage
                } : val

            }))
        })
    }

    const DeleteEmployee = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            console.log("Deleteresponse", response)
            SetEmployeeList(employeeList.filter(val => val.id !== id))
        })
    }

    return (
        <>
            <EmployeeNavBar />
            <div className="App">
                <div className="information">
                    <label>Name:</label>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required FullName"
                        defaultValue=""
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => {
                            setName(event.target.value)
                        }}
                    />
                    <label>Age:</label>
                    <TextField
                        required
                        id="outlined-number"
                        label="Age"
                        type="number"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => {
                            setAge(event.target.value)
                        }}
                    />
                    <label>Country:</label>
                    <TextField
                        required
                        id="outlined-required"
                        label="Require Country"
                        defaultValue=""
                        size="small"
                        onChange={(event) => {
                            setCountry(event.target.value)
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <label>Position:</label>
                    <TextField
                        required
                        id="outlined-required"
                        label="Require Position"
                        defaultValue=""
                        size="small"
                        onChange={(event) => {
                            setPosition(event.target.value)
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <label>Wage(year):</label>
                    <TextField
                        required
                        id="outlined-number"
                        label="Wage"
                        type="number"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => {
                            setWage(event.target.value)
                        }}
                    />
                    <Button onClick={addEmployee} variant="contained" color="success">
                        Add Employee </Button>
                </div>
            </div>

            <div>
                <Button onClick={handleOpen} variant="contained" style={{ fontFamily: 'ui-monospace', margin: '20px 6px 6px 638px' }} >Employee Data</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box>
                        <div className="employees">
                            <h2>Show Employees Data</h2>
                            <MuiThemeProvider theme={getMuiTheme}>
                                <button onClick={getEmployee}>Display Records</button>
                                <MUIDataTable
                                    className={classes.table}
                                    title={"Employee list"}
                                    data={employeeList}
                                    columns={columns}
                                    options={options}
                                />
                            </MuiThemeProvider>
                            <div className='employeeMap'>
                                {/* <h5>Wage:</h5> */}
                                <input type="text" className="" placeholder="2000..."
                                    onChange={(event) => setnewWage(event.target.value)} />
                                <button onClick={(val) => { updateEmployeeWage(val.id) }}>Update</button>
                                <button onClick={(val) => { DeleteEmployee(val.id) }}>Delete</button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default EmployeeDetails;
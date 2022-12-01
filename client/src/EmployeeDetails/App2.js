
import './App.css';
import { useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      borderBottom: 0,
      padding: "8px 16px"
    }
  }
});

function App() {
  const classes = useStyles();
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState("")
  const [position, setPosition] = useState("")
  const [wage, setWage] = useState(0)

  const [employeeList, SetEmployeeList] = useState([]);

  const [newWage, setnewWage] = useState(0);

  // const displayInfo =() =>{
  //   console.log(name + age + country + position + wages)
  // }

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
      
      SetEmployeeList(employeeList.filter(val => val.id !== id))
    })
  }


  return (
    <>
      <div className="App">
        <div className="information">
          <label>Name:</label>
          <input type="text" onChange={(event) => {
            setName(event.target.value)
          }} />
          <label>Age:</label>
          <input type="number" onChange={(event) => {
            setAge(event.target.value)
          }} />
          <label>Country:</label>
          <input type="text" onChange={(event) => {
            setCountry(event.target.value)
          }} />
          <label>Position:</label>
          <input type="text" onChange={(event) => {
            setPosition(event.target.value)
          }} />
          <label>Wage(year):</label>
          <input type="number" onChange={(event) => {
            setWage(event.target.value)
          }} />
          <button onClick={addEmployee}> Add Employee</button>
        </div>
        {/* </div> */}


        <div className="employees">
          <h2>Show Employees Data</h2>
          <button onClick={getEmployee}>Show Employees</button>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table" >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Age</TableCell>
                  <TableCell align="right">Country</TableCell>
                  <TableCell align="right">Position</TableCell>
                  <TableCell align="right">Wage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeList.map((val) => (
                  <TableRow key={val.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {val.name}
                    </TableCell>
                    <TableCell align="right">{val.age}</TableCell>
                    <TableCell align="right">
                      {val.country}
                    </TableCell>
                    <TableCell align="right">{val.position}</TableCell>
                    <TableCell align="right">{val.wage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div>
              <input type="text" className="" placeholder="2000..."
                onChange={(event) => setnewWage(event.target.value)} />
              <button onClick={(val) => { updateEmployeeWage(val.id) }}>Update</button>
              <button onClick={(val) => { DeleteEmployee(val.id) }}>Delete</button>
            </div>
          </TableContainer>


          {/* <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">Position</TableCell>
                <TableCell align="right">Wage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeList.map((val, key) => (
                <TableRow key={val.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{val.name}</TableCell>
                  <TableCell align="right">{val.age}</TableCell>
                  <TableCell align="right">{val.country}</TableCell>
                  <TableCell align="right">{val.position}</TableCell>
                  <TableCell align="right">{val.wage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <div>
              <input type="text" className="" placeholder="2000..."
                onChange={(event) => setnewWage(event.target.value)} />
              <button onClick={(val) => { updateEmployeeWage(val.id) }}>Update</button>
              <button onClick={(val) => { DeleteEmployee(val.id) }}>Delete</button>
            </div>
          </Table>
        </TableContainer>
 */}

          {/* {employeeList.map((val, key) => {
          return (<div className='employeeMap'>
            <div>
              <h2>Name:{val.name}</h2>
              <h2>Age:{val.age}</h2>
              <h2>Country:{val.country}</h2>
              <h2>Position:{val.position}</h2>
              <h2>wage:{val.wage}</h2>
            </div>
            <div>
              <input type="text" className="" placeholder="2000..."
                onChange={(event) => setnewWage(event.target.value)} />
              <button onClick={() => { updateEmployeeWage(val.id) }}>Update</button>
              <button onClick={() => { DeleteEmployee(val.id) }}>Delete</button>
            </div>
          </div>
          )
        })} */}
        </div>
      </div>
    </>
  );
}

export default App;
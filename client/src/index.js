import React from 'react';
import ReactDOM from 'react-dom/client';
import EmployeeDetails from './EmployeeDetails/EmployeeDetails';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home/home';
// import Layout from './Layout';
import RegisterForm from './RegisterForm/SignUp';
import Admin from './Home/admin';
import LoginForm from './LoginForm/signIn';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <App />
        </Route> */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/app" element={<EmployeeDetails />} />
        <Route path="/signIn" element={<LoginForm />} />
        <Route path="/signUp" element={<RegisterForm />} />
        <Route path="/admin" element={<Admin />} />
        {/* <App />
        </Route> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

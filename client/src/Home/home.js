// import { Link } from "react-router-dom";
// // import { useState } from "react";
// // import axios from "axios";

// function home() {

//     return (
//         <div>
//             <h3>Home Page! Please Login or Register</h3>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/app">App</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </div>

//     )
// }

// export default home;
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./footer";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh"
    },
    image: {
        // backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundImage: "url(https://dev.lidac.com/images/2-individual_employee_login.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 700
    },
    text: {
        marginTop: "1rem",
        display: 'flex',
        justifyContent: "center",
        fontSize: 25,
        paddingTop: 80,
        color: "#161212",
        fontfamily: "ui-monospace"
    },
    ptag: {
        // marginTop: "1rem",
        display: 'flex',
        justifyContent: "center",
        fontFamily: "fantasy",
        paddingTop: 340
    },
    link: {
        display: 'flex',
        justifyContent: "center",
        fontSize: 22,
        fontFamily: "ui-monospace",
        lineHeight: "180%",
        //textdecoration: "none"
    }
}));

function Home(props) {
    const classes = useStyles();

    return (
        <div className={classes.image}>
            {/* <h1  style={{ marginTop: "1rem" }}>Hello,</h1> */}
            {/* <p> */}

            <span className={classes.text}>
                Welcome to this Employees retrive website
            </span>{" "}
            <br /> <h3 className={classes.ptag}>please select one of the options:</h3>
            {/* </p> */}
            <div className={classes.link}>
                <Link
                    className="btn btn-dark"
                    to="/signIn"
                    style={{ marginRight: "1rem", color: "darkblue", textDecoration: "none", fontVariant: "petite-caps" }}
                >
                    Login User
                </Link>
                <Link
                    className="btn btn-dark"
                    to="/signUp"
                    style={{ marginRight: "1rem", color: "darkblue", textDecoration: "none", fontVariant: "petite-caps" }}
                >
                    Registered User
                </Link>
                <Link className="btn btn-dark" to="/search" style={{ marginRight: "1rem", color: "darkblue", textDecoration: "none", fontVariant: "petite-caps" }}>
                    Search Users
                </Link>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;

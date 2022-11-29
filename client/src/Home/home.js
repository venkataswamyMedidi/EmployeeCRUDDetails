import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/footer";
import { homeStyle } from './homeStyle';

function Home() {
    const classes = homeStyle();

    return (
        <div className={classes.image}>
            <span className={classes.text}>
                Welcome to this Employees retrive website
            </span>{" "}
            <br /> <h3 className={classes.ptag}>please select one of the options:</h3>
            <div className={classes.link}>
                <Link to="/signIn" className={[classes.linkText, "btn btn-dark"]} >
                    Login User
                </Link>
                <Link
                    className={[classes.linkText, "btn btn-dark"]} to="/signUp" >
                    Registered User
                </Link>
                <Link className={[classes.linkText, "btn btn-dark"]} to="/search" >
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

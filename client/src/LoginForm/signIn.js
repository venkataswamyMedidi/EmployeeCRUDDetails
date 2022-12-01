import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { loginStyle } from './loginStyle';
// import Admin from "../Home/admin";


const MadeWithLove = () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {"Built with love by the "}
        <Link color="inherit" href="https://material-ui.com/">
            Material-UI
        </Link>
        {" team."}
    </Typography>
);


const LoginForm = () => {
    const classes = loginStyle();
    const navigate = useNavigate();
    // const historyRoute = useHistory();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    // const [authenticated, setauthenticated] = useState(false)
    // localStorage.getItem(localStorage.getItem("authenticated") || false)

    // const accessType = JSON.parse(localStorage.getItem('authenticated')) || false;
    // const locationPath = window.location.pathname;
    // console.log("location.....", { l: locationPath, i: accessType })

    // let currentDate = new Date();
    // const token = localStorage.getItem('token');
    // const decodedToken = token;
    // const isLocalHost = (('localhost')); //ignoring autologout for local development
    // const isExpired = (token && decodedToken && decodedToken.exp && (decodedToken.exp * 1000 < currentDate.getTime()));

    // console.log("token.......", { a: token, b: isLocalHost, c: isExpired, e: currentDate })

    axios.defaults.withCredentials = true;

    const loginEmployeeForm = (event, credentials) => {
        event.preventDefault()
        axios.post("http://localhost:3001/login", {
            // withCredentials: true,
            credentials: 'include',
            email: email,
            password: password
        }).then(response => {
            console.log("login", { d: response.data }, { R: response })
            if (!response.data.auth) {
                setLoginStatus(false)

                //setLoginStatus(response.data.message)
                navigate("/signIn"); // first approach without authenticate, no message
            } else {
                console.log("inner...", response)
                localStorage.setItem("token", response.data.token)
                setLoginStatus(true)
                navigate("/app");
                // setLoginStatus(response.data[0].email) 
            }
        })
    }

    const userAuthenticate = () => {
        axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log({ "responseAuth": response })
            // if ('auth' === true) {  // second apparoch with authenticate, !button 
            //     navigate("/admin");
            // } else {
            //     navigate("/login");
            // }
        })
    }

    useEffect(() => { // running everytime when we refresh the page, when refresh it will display the email
        axios.get("http://localhost:3001/login").then((response) => {
            console.log("useffect:", response)
            if (response.data.loggedIn === true) {
                console.log("useffect222:", response)
                //setLoginStatus(response.data.user[0].email);
                setLoginStatus(true)
                navigate("/admin");
            } else {
                console.log("useffecterr", response)
            }
        });
    });

    return (
        <>
            <Grid container component="main" className={classes.image}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={4} className={""} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.formtext}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            {/* <LockOutlinedIcon /> */}
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={loginEmployeeForm}
                            >
                                Sign In
                            </Button>
                            <div>
                                <h3 className={classes.wrongText}>
                                    {loginStatus && (
                                        <button onClick={userAuthenticate}>check if Authenticate
                                            {/* {loginStatus === "admin" && <Admin />} */}
                                        </button>
                                    )
                                    }
                                </h3>
                            </div>

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <MadeWithLove />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default LoginForm;

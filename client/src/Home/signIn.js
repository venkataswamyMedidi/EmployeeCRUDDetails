import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom"
// import { useNavigate } from 'react-router-dom';
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
import { makeStyles } from "@material-ui/core/styles";

const MadeWithLove = () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {"Built with love by the "}
        <Link color="inherit" href="https://material-ui.com/">
            Material-UI
        </Link>
        {" team."}
    </Typography>
);

const useStyles = makeStyles(theme => ({
    //   root: {
    //     height: "100vh"
    //   },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh"
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    formtext: {
        height: 600,
        marginTop: 150
    },
    wrongText: {
        display: "flex",
        justifyContent: "center",
        fontfamily: "ui-monospace",
    }
}));

const LoginForm = () => {
    const classes = useStyles();
    // const navigate = useNavigate();
    // const historyRoute = useHistory();
    // const [firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginStatus, setLoginStatus] = useState("")
    // const [authenticated, setauthenticated] = useState(false)
    // localStorage.getItem(localStorage.getItem("authenticated") || false));

    // const accessType = JSON.parse(localStorage.getItem('authenticated'))|| false;
    // const locationPath = window.location.pathname;
    // console.log("location.....",locationPath, {i:accessType})

    // let currentDate = new Date();
    // const token = localStorage.getItem('token');
    // const decodedToken=token;
    // const isLocalHost = (('localhost')); //ignoring autologout for local development
    // const isExpired = (token && decodedToken && decodedToken.exp && (decodedToken.exp * 1000 < currentDate.getTime()));

    // console.log("token.......", token, isLocalHost, isExpired)

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
            if (response.data.message) {
                setLoginStatus(response.data.message)
                // navigate.push("/app");
            } else {
                console.log("inner...", response)
                setLoginStatus(response.data[0].email)
            }
        })
    }

    useEffect(() => {
        axios.get("http://localhost:3001/login").then((response) => {
            console.log("useffect:", response)
            if (response.data.loggedIn === true) {
                console.log("useffect222:", response)
                setLoginStatus(response.data.user[0].email);
            } else {
                console.log("useffecterr")
            }
        });
    }, []);

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
                                    {loginStatus}

                                    {/* {loginStatus.map(loginStatus => <div>{loginStatus.email}</div>)} */}
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

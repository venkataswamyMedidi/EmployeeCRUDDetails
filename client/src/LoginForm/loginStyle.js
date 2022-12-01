import { makeStyles } from '@material-ui/core'

export const loginStyle = makeStyles(theme => ({
    // root: {
    //     height: "100vh"
    // },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        paddingRight: 90
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

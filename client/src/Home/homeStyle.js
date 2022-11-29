import { makeStyles } from '@material-ui/core'

export const homeStyle = makeStyles(theme => ({
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
        gridColumnGap: 20,
        //textdecoration: "none"
    },
    linkText: {
        marginRight: "1rem",
        color: "darkblue",
        textDecoration: "none",
        fontVariant: "petite-caps",
    }
}));
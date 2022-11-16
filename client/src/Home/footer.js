import React from 'react';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({

  footerStyles: {
    color: 'white',
    background: '#9badc0',
  },
  linkContainer: {
    display: 'flex',
    justifyContent:"center",
  
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    paddingTop: '1%',  
  },
  aStyles: {
    color:'white',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    },
    lineHeight: '180%'
  },
  bottom: {
    textAlign: 'center',
    padding: '1%'
  }
})

export default function Footer() {

  const classes = useStyles();

  return (
    <footer className={classes.footerStyles}>
      <div className={classes.linkContainer}>
        <div className={classes.links}>
          <h3>Company</h3>
          <a href='#!' className={classes.aStyles}>About Us</a>
          <a href='#!' className={classes.aStyles}>Expansion Plan</a>
          <a href='#!' className={classes.aStyles}>Careers</a>
        </div>
        <div className={classes.links}>
          <h4>Support</h4>
          <a href='#!' className={classes.aStyles}>FAQs</a>
          <a href='#!' className={classes.aStyles}>Email Us</a>
          <a href='#!' className={classes.aStyles}>Refund Policy</a>
        </div>
        <div className={classes.links}>
          <h4>Partnerships</h4>
          <a href='#!' className={classes.aStyles}>Become a Partner</a>
          <a href='#!' className={classes.aStyles}>Check Status</a>
        </div>
      </div>
      <h5 className={classes.bottom}>© 2022 Copyright:Iglobal Company</h5>
    </footer>
  );
}

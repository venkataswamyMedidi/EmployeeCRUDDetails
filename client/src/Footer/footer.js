import React from 'react';
import { footerStyle } from './footerStyle';

export default function Footer() {

  const classes = footerStyle();

  return (
    <footer className={classes.footerBox}>
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


import { makeStyles } from '@material-ui/core'

export const footerStyle = makeStyles({
  footerBox: {
    color: 'white',
    background: '#9badc0',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: "center",

  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    paddingTop: '1%',
  },
  aStyles: {
    color: 'white',
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
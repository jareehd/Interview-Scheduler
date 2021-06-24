import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar , Toolbar ,Typography ,Button } from '@material-ui/core'
import { Link  } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
      padding:10    
    },
  }));

const Header = () =>{
    const classes = useStyles();
    return (
    <AppBar position="static" color="secondary">
    <Toolbar variant="dense">
    <Typography align ="left" variant="h4" color="inherit" className={classes.title}>
      Interview Bytes
    </Typography>
    
    <div > 
     
     <Button color="inherit"> 
      <Link to="/" style={{ textDecoration: "none", color:'white', width: "100%" }} >
                   Create Interviews
       </Link> 
     </Button>
     <Button color="inherit"> 
      <Link to="/view" style={{ textDecoration: "none", color:'white', width: "100%" }} >
                   View Interviews
       </Link>
     </Button>
    </div>
  </Toolbar>
</AppBar>
    )
}

export default Header;
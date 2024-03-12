import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import myContext from './context/contextConfig';
import { useNavigate } from 'react-router-dom';



export default function Navbar(props) {

  const ContextData = useContext(myContext)
  const navigate = useNavigate();

  const LoginnHandler = ()=>{
    navigate("/login")
  }

  const RegisterHandler = ()=>{
    navigate("/register")
  }

  const LogoutHandler = ()=>{
    ContextData.setContext(prevContext => ({
        ...prevContext,
        loggedIn: false,
        userToken: null // Assuming this is how userToken is received in the response
    }));
    navigate("/login")
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          {(!ContextData.context.loggedIn)?<Button color="inherit" onClick={RegisterHandler}>Register</Button>:null}
          {(!ContextData.context.loggedIn)?<Button color="inherit" onClick={LoginnHandler}>Login</Button>:null}
          {(ContextData.context.loggedIn)?<Button color="inherit" onClick={LogoutHandler}>Logout</Button>:null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
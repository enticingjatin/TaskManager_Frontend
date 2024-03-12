import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, TextField } from '@mui/material';
import myContext from './context/contextConfig';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';







export default function Login() {

    const navigate = useNavigate();


    const ContextData = useContext(myContext);
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")




    const loginHandler = async () =>{
        await axios.post("http://localhost:5000/api/auth/signin", {
            "username": username,
            "password": password
        }).then(res=>{
            toast.success(res.data.message)
            ContextData.setContext(prevContext => ({
                ...prevContext,
                loggedIn: true,
                userToken: res.data.accessToken // Assuming this is how userToken is received in the response
            }));
            navigate("/");
        }).catch(err=>{
            toast.error(err.response.data.message)
        })
    }


  return (
    <>
    <Navbar />

    {/* Conatiner */}
    <React.Fragment maxWidth="sm">
      <CssBaseline />
      <Container maxWidth="sm" style={{paddingTop:"50px"}}>
        <h3>Login</h3> <br />
      <TextField id="outlined-basic" label="Username" value={username} onChange={e=>setUsername(e.target.value)} variant="outlined" style={{width:"100%"}}/>
      <TextField id="outlined-basic" label="Password" value={password} onChange={e=>setPassword(e.target.value)} type='password' variant="outlined" style={{width:"100%", marginTop:"50px"}}/>
      <Button variant="contained" onClick={loginHandler} style={{width:"100%", marginTop:"50px"}}>Login</Button>

      </Container>
    </React.Fragment>
    <ToastContainer />
    </>
  )
}

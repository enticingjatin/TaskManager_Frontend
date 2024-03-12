import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import myContext from './context/contextConfig';


export default function Register() {

  const navigate = useNavigate();


    const ContextData = useContext(myContext);
    
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const loginHandler = async () =>{
      await axios.post("https://task-manager-frontend-modo.onrender.com/api/auth/signup", {
          "username": username,
          "password": password,
          "mobile": mobile,
          "name": name
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
        <h3>User Registration</h3> <br />
      <TextField id="outlined-basic" value={name} onChange={e=>setName(e.target.value)} label="Full name" variant="outlined" style={{width:"100%"}}/>
      <TextField id="outlined-basic" value={username} onChange={e=>setUsername(e.target.value)} label="Username" variant="outlined" style={{width:"100%", marginTop:"20px"}}/>
      <TextField id="outlined-basic" type='number' value={mobile} onChange={e=>setMobile(e.target.value)} label="Contact Number" variant="outlined" style={{width:"100%", marginTop:"20px"}}/>
      <TextField id="outlined-basic" value={password} onChange={e=>setPassword(e.target.value)} label="Password" type='text' variant="outlined" style={{width:"100%", marginTop:"20px"}}/>
      <Button onClick={loginHandler} variant="contained" style={{width:"100%", marginTop:"50px"}}>Register</Button>

      </Container>
    </React.Fragment>
    <ToastContainer />

    </>
  )
}

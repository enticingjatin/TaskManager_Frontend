import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, IconButton, Modal, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import DeleteIcon from '@mui/icons-material/Delete';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import TaskIcon from '@mui/icons-material/Task';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import myContext from "./components/context/contextConfig";
import BasicModal from "./components/Modal";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const ContextData = useContext(myContext)
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [sdata, setSData] = useState({});
  const [edata, setEData] = useState({});
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleOpen = (edit) => {
    setEdit(edit)
    setOpen(true);
    if(!edit){
      setDescription("");
      setTitle("");
    }
  }

  const handleEdit = (data)=>{
    handleOpen(true)
    setEData(data);
    setTitle(data.title);
    setDescription(data.description);
  }
  
  const handleClose = () => setOpen(false);

  const getData = async () => {
    await axios.get("http://localhost:5000/api/task/get", {
      "headers": {
        "user-token": ContextData.context.userToken
      }
    }).then((res) => {
      setSData(res.data.data)
    })
  }


  const handleDelete = async (id) => {
    await axios.post("http://localhost:5000/api/task/delete/"+id, {
      
    }, {
      "headers": {
        "user-token": ContextData.context.userToken
      }
    }).then((res) => {
      toast.success(res.data.message)
      getData()
    }).catch(err=>{
      toast.error(err.response.data.message)
    })
  }

  useEffect(() => {
    if (!ContextData.context.loggedIn) {
      navigate("/login")
    } else {
      getData()
    }
  }, [])


  return (
    <>
      <Navbar />

      {/* Conatiner */}
      <React.Fragment maxWidth="sm">
        <CssBaseline />
        <Container style={{ paddingTop: "50px" }}>
          {/* Grid */}
          <div className="row m-0 p-0">
            <div className="col-10 m-0 p-0" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
              <h3 className="p-0 m-0"><strong>Tasks</strong></h3>
            </div>
            <div className="col-2 m-0 p-0" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button variant="contained" onClick={e=>handleOpen(false)} style={{ width: "100%" }}>Add Task</Button>
            </div>
          </div>

          {/* List */}
          <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }} style={{ marginTop: "30px" }}>
            {(sdata.length > 0) && sdata.map((val, ind) =>
              <ListItem key={ind} secondaryAction={
                <>
                  <IconButton edge="end" aria-label="delete" onClick={e=>handleEdit(val)}>
                    <EditIcon />
                  </IconButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <IconButton edge="end" aria-label="delete" onClick={e=>handleDelete(val._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }>
                <ListItemAvatar>
                  <Avatar>
                    <TaskIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={val.title} secondary={val.description} />
              </ListItem>
            )}
          </List>

        </Container>
      </React.Fragment>


      {/* Modal */}
      <BasicModal open={open} handleClose={handleClose} handleOpen={handleOpen} edit={edit} edata={edata} getData={getData} title={title} description={description} setDescription={setDescription} setTitle={setTitle} />
    </>
  );
}

export default App;

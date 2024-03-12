import React, {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import myContext from './context/contextConfig';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal(props) {

    const ContextData = useContext(myContext)

    const handleSubmit = async () => {

        await axios.post((!props.edit)?"https://task-manager-frontend-modo.onrender.com/api/task/create":"https://task-manager-frontend-modo.onrender.com/api/task/update/"+props.edata._id, {
            "title": props.title,
            "description": props.description
        },{
            "headers":{
                "user-token": ContextData.context.userToken
            }
        }).then(res=>{
            props.getData()
            toast.success(res.data.message)
            props.setTitle("")
            props.setDescription("")
            props.handleClose()
        }).catch(err=>{
            toast.error(err.response.data.message)
        })
    }
    

    return (
        <>
            <div>
                {/* <Button onClick={props.}>Open modal</Button> */}
                <Modal
                    open={props.open}
                    onClose={props.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h3 >{(props.edit)?"Update Task":"New Task"}</h3>
                        <br />
                        <TextField id="outlined-basic" value={props.title} onChange={e => props.setTitle(e.target.value)} label="Title" variant="outlined" style={{ width: "100%" }} />
                        <TextField id="outlined-basic" value={props.description} onChange={e => props.setDescription(e.target.value)} label="Description" variant="outlined" style={{ marginTop: "30px", width: "100%" }} />
                        <Button variant="contained" onClick={handleSubmit} style={{ width: "100%", marginTop: "30px" }}>{(props.edit)?"Update Task":"New Task"}</Button>
                    </Box>
                </Modal>
            </div>

            <ToastContainer />
        </>

    );
}

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Issue() {
    const[name, setName]= useState('')
    const[time, setTime]= useState('')
    const[reason, setReason]= useState('')

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick=(e)=>{
        e.preventDefault()
        const time={name, time, reason}
        console.log(issue)
        fetch("http://localhost:8000/time/add",
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(issue)
        }).then(() => {
            alert("New time logged.")
        })
    }


  return (
    <Container>
      <Button variant="contained" size="small" onClick={handleOpen}>Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper elevation={12}>
        
    <Box
      component="form"
      sx={
        style
      }
      noValidate
      autoComplete="off"
      m={5} pt={2} pb={2}
    >
      <h3>Log Time</h3>
      <TextField id="outlined-basic" label="Name" variant="outlined"
      value={name}
      onChange={(e)=>setName(e.target.value)}
    />
      <TextField id="outlined-basic" label="Time" variant="outlined"
      value={time}
      onChange={(e)=>setTime(e.target.value)}/>
      <TextField id="outlined-basic" label="Reason" variant="outlined"
      value={reason}
      onChange={(e)=>setReason(e.target.value)}/>
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Submit
      </Button>
    </Box>
    </Paper>
    
    </Modal>
    </Container>
)}

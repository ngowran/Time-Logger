import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { UserAuth } from '../hocs/Auth';

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
    const[time, setTime]= useState('')
    const[reason, setReason]= useState('')
    const {user} = UserAuth();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick=(e)=>{
      const name = user.displayName;
      const photoURL = user.photoURL;
      if (!!time && !!reason && !isNaN(+time)) {
        e.preventDefault()
        const timelog={name, time, reason, photoURL}
        console.log(timelog)
        fetch("/api",
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(timelog)
        }).then((res) => {
            handleClose();
            console.log(res.data);
            alert("New time logged.");
        })
    } else {
        alert("Missing required fields or input is wrong!");
    }
      }



  return (
    <Container>
      {user && <>
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
      m={5} pt={3} pb={2}
    >
      <h3>Log Time</h3>
      <TextField required id="outlined-basic" label="Time in minutes" variant="outlined"
      value={time}
      onChange={(e)=>setTime(e.target.value)}/>

      <InputLabel required id="outlined-basic" label="Activity" variant="outlined"
      value={reason}
      onChange={(e)=>setTime(e.target.value)}/>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={reason}
          label="Age"
          onChange={(e)=>setReason(e.target.value)}
        >
          <MenuItem value={"Meeting"}>Meeting</MenuItem>
          <MenuItem value={"Research"}>Research</MenuItem>
          <MenuItem value={"Development"}>Development</MenuItem>
          <MenuItem value={"Event"}>Event</MenuItem>
        </Select>


      <Button sx={{m:1}} variant="contained" color="secondary" onClick={handleClick}>
        Submit
      </Button>

    </Box>
    </Paper>
    </Modal>
    </>}
    {!user && <>
    You must be signed in to add a time.
    </>}
    </Container>
)}

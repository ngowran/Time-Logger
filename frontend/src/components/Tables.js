import React, { useEffect, useState } from 'react';
import { Paper, Box, Container } from '@mui/material';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import images from '../assets/avatars';

function randomColor() {
  let hex = Math.floor(Math.random() * 0xFFFFFF);
  let color = "#" + hex.toString(16);

  return color;
}


export default function Tables() {
    const[timeLogs, setLogs]= useState([])
    const[total, setTotal]= useState("")

    function getTotal() {
        axios
        .get('https://time-logger-2.niamhgowran.repl.co/total')
        .then(res => {
            setTotal(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }    

    function getLogs() {
        axios
        .get('https://time-logger-2.niamhgowran.repl.co/api')
        .then(res => {
            setLogs(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

        useEffect(() => {
            getLogs();
            getTotal();
            const interval = setInterval(() => {
                getLogs();
                getTotal();
            }, 10000);
            return () => clearInterval(interval);
          }, []);


    return (
        <Container sx={{pt:5, pb:10}}>
    <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'center',
    }}>
       <Box m={2} pt={2}>
    <h1>{total}</h1>
    <h2>Times Logged</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead sx={{backgroundColor: '#f6bd33'}}>
        <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Activity</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Finished At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          timeLogs.map((val, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {val.date}
              </TableCell>
              <TableCell align="right">
              <Tooltip title={val.name}>
              <Avatar style={{backgroundColor: randomColor()}}alt={val.name} src={ images[`${val.name}`]}>{val.name}</Avatar>
              </Tooltip>
              </TableCell>
              <TableCell align="right">{val.reason}</TableCell>
              <TableCell align="right">{val.time}</TableCell>
              <TableCell align="right">{val.hour}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    </Box>
      
    </Box>
    </Container>

    
)}
import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";

const columns = [
  { field: "date", headerName: "Date", width: 150 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    sortable: false,
    renderCell: (params) => {
        console.log(params);
        return (
          <>
            <Tooltip title={params.row.name}>
            <Avatar src={params.row.photoURL} />
            </Tooltip>
            {params.value.name}
            
          </>
        );
      }
  },
  {
    field: "reason",
    headerName: "Reason",
    width: 150,
    editable: true,
  },
  {
    field: "time",
    headerName: "Time Spent",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "hour",
    headerName: "Finished At",
    sortable: false,
    width: 160,
  },
];

export default function DataGridDemo() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState("");

  function getTotal() {
    axios
      .get("/total")
      .then((res) => {
        setTotal(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getLogs() {
    axios
      .get("/api")
      .then((res) => {
        setRows(res.data);
        console.log(rows.length)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getLogs();
    getTotal();
    const interval = setInterval(() => {
      getLogs();
      getTotal();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-auto" style={{ height: 400}}>
      <h1 className="text-3xl font-bold py-3">{total}</h1>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>

      <DataGrid
        rows={rows}
        getRowId={() => Math.floor(Math.random() * 100000000)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
    </div>
    </div>
  );
}

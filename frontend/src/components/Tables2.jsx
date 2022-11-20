import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";

const columns = [
  {
    field: "date",
    headerName: "Date",
    flex: 0.5,
    minWidth: 100,
    sortable: false,
    headerClassName: "bg-amber-400",
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "bg-amber-400",
    flex: 0.25,
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Tooltip title={params.row.name}>
            <Avatar src={params.row.photoURL} />
          </Tooltip>
          {params.value.name}
        </>
      );
    },
  },
  {
    field: "reason",
    headerName: "Reason",
    headerClassName: "bg-amber-400",
    flex: 0.5,
    width: 150,
    editable: true,
  },
  {
    field: "time",
    headerName: "Time Spent",
    headerClassName: "bg-amber-400",
    type: "number",
    flex: 0.5,
    width: 110,
    editable: true,
  },
  {
    field: "hour",
    headerName: "Finished At",
    headerClassName: "bg-amber-400",
    sortable: false,
    width: 160,
  },
];

export default function DataGridTable() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState("");

  const [pageSize, setPageSize] = useState(5);

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
    <div className="justify-center items-center mx-auto py-10 w-[75%] md:w-[50%]">
      <h1 className="text-2xl md:text-3xl font-bold py-3">{total}</h1>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            autoHeight
            rows={rows}
            getRowId={() => Math.floor(Math.random() * 100000000)}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 15]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            sx={{
              boxShadow: 2,
              border: 0,
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            className="bg-white"
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";

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
    flex: 1,
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
    flex: 1,
    width: 160,
  },
];

export default function DataGridTable() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState("");

  const reasons = {};
  rows.forEach((d) => {
    // if the reason == "Work" dont add it
    if (d.reason === "Work") return;

    if (!reasons[d.reason]) reasons[d.reason] = 0;
    // convert d.time to hours and add to reasons[d.reason]
    reasons[d.reason] += d.time / 60;
  });


  const chartData = {
    labels: Object.keys(reasons),
    datasets: [
      {
        label: "Hours Spent",
        data: Object.values(reasons),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  // make a reasons version to be a percentage of total hours
  const reasons2 = {};
  rows.forEach((d) => {
    // if the reason == "Work" dont add it
    if (d.reason === "Work") return;

    if (!reasons2[d.reason]) reasons2[d.reason] = 0;
    // convert d.time to hours and add to reasons[d.reason]
    reasons2[d.reason] += d.time / 60;
  });
  

  // rewrite chartData to have a different color for each reason
   const chartData2 = {
     labels: Object.keys(reasons),
     datasets: [
       {
         label: "Hours Spent",
         data: Object.values(reasons),
         backgroundColor: [
           "rgba(255, 99, 132, 0.2)",
           "rgba(54, 162, 235, 0.2)",
           "rgba(255, 206, 86, 0.2)",
           "rgba(75, 192, 192, 0.2)",
           "rgba(153, 102, 255, 0.2)",
           "rgba(255, 159, 64, 0.2)",
         ],
         borderWidth: 1,
       },
     ],
   };

  const dateTotals2 = rows.reduce((acc, curr) => {
    const date = curr.date.split(":");
    const month = parseInt(date[1]);
    // convert month to a human readable month
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[month - 1];
    const year = date[2];
    const key = `${year}-${monthName}`;
    if (acc[key]) {
      acc[key] += parseInt(curr.time) / 60;
    } else {
      acc[key] = parseInt(curr.time) / 60;
    }

    return acc;
  }, {});

  const lineChartData = {
    labels: Object.keys(dateTotals2),
    datasets: [
      {
        label: "Hours Spent",
        data: Object.values(dateTotals2),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };


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
    <div className="justify-center items-center mx-auto py-10 w-[99%] md:w-[50%]">
      <h1 className="text-2xl md:text-3xl py-3">
        <span className="font-bold tracking-tight">Total:</span> <br />
        {total}
      </h1>
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
      <div className="mt-10 lg:mt-64">
        <BarChart chartData={chartData2} />
        <LineChart chartData={lineChartData} /> 
      </div>
    </div>
  );
}

import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

const BarChart = ({ chartData }) => {
  const options = {
      plugins: {
          title: {
              display: true,
              text: 'Hours Spent By Reason'
          }
        },
    scales: {
      y: {
        beginAtZero: true,
        scaleLabel: {
          display: true,
          labelString: "Minutes",
        },
      },
      x: {
        scaleLabel: {
          display: true,
          labelString: "Reasons",
        },
      },
      
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;

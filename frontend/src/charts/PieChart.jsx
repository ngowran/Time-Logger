import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as Chartjs } from 'chart.js/auto';

const PieChart = ({chartData}) => {
  return (
    <div className='pt-4'>
        <Pie
            data={chartData}
            options={{
                plugins: {
                
                    title: {
                        display: true,
                        text: 'Chart.js Pie Chart'
                    }
                }
            }}
        />
    </div>
  )
}

export default PieChart
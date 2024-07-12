import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

export default function CustomerGraph({ customer, transactions }) {
  const data = {
    labels: transactions.map(trans => trans.date),
    datasets: [
      {
        label: 'Total Transaction Amount',
        data: transactions.map(trans => trans.amount),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount'
        }
      }
    }
  };

  return (
    <div>
      <h3>{customer?.name} - Transaction Graph</h3>
      <Line data={data} options={options} />
    </div>
  );
}

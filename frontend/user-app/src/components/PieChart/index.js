import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PieChart = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy previous chart instance
      }

      const labels = Object.keys(data);
      const values = Object.values(data);

      const ctx = chartContainer.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Experiment Results',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }, [data]);

  return <canvas ref={chartContainer} />;
};

export default PieChart;

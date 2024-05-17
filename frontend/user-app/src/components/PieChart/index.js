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
              'rgba(255, 0, 0, 0.6)', // Red
              'rgba(0, 255, 0, 0.6)'   // Green
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

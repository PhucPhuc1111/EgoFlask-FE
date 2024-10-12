import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend
);

const IncomeBarChart: React.FC = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Income",
        data: [
          15000, // January
          20000, // February
          18000, // March
          22000, // April
          25000, // May
          27000, // June
          30000, // July
          32000, // August
          35000, // September
          37000, // October
          39000, // November
          42000, // December
        ],
        backgroundColor: "#0055c3", 
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20000, 
          callback: (value: number) => `${value / 1000}M`,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-md  ">
      <h2 className="text-lg font-bold mb-2">Monthly Income</h2>
      <Bar className="p-5" data={data} options={options} />
    </div>
  );
};

export default IncomeBarChart;

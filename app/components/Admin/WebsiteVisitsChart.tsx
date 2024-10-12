import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface WebsiteVisitsChartProps {
  websiteData: number; 
}

const WebsiteVisitsChart: React.FC<WebsiteVisitsChartProps> = ({ websiteData }) => {
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
        label: "Website Visits",
        data: [
          websiteData,
          30000, // February
          25000, // March
          40000, // April
          35000, // May
          50000, // June
          45000, // July
          60000, // August
          70000, // September
          80000, // October
          65000, // November
          75000, // December
        ],
        fill: false,
        backgroundColor: "#104e9e",
        borderColor: "#0055C3",
        tension: 0.1,
        pointRadius: 4, 
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
          callback: (value: number) => `${value / 1000}K`, 
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Website Visits</h2>
      <Line className="p-5" data={data} options={options} />
    </div>
  );
};

export default WebsiteVisitsChart;

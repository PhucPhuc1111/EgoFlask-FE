// Updated IncomeBarChart.tsx

import React, { useMemo, useState } from "react";
import { useGetMonthlyIncomeData } from "~/data/admin";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { formatMoney } from "../utils";
import { useGetProfile } from "~/data";

ChartJS.register(LinearScale, CategoryScale, BarElement, Tooltip, Legend);

interface IncomeBarChartProps {}

const IncomeBarChart: React.FC<IncomeBarChartProps> = ({}) => {
  const profile = useGetProfile();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Gọi hook để lấy dữ liệu
  const { data, isLoading, error } = useGetMonthlyIncomeData(
    profile.data?.user?.token || "",
    selectedYear
  );

  // Sử dụng useMemo để tính toán chartData luôn, bất kể trạng thái loading hoặc error
  const chartData = useMemo(() => {
    const allMonths = [
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
    ];

    const dataMap = new Map<string, any>();
    if (data && Array.isArray(data)) {
      data.forEach((item) => {
        dataMap.set(item.month, item);
      });
    }

    const completeData = allMonths.map((month) => {
      const monthData = dataMap.get(month);
      if (monthData) {
        return monthData;
      } else {
        return {
          month,
          totalIncome: 0,
          weeklyIncomes: [],
        };
      }
    });

    return {
      labels: allMonths,
      datasets: [
        {
          label: "Doanh thu",
          data: completeData.map((item) => item.totalIncome),
          backgroundColor: "#0055c3",
        },
      ],
      weeklyData: completeData.map((item) => item.weeklyIncomes),
    };
  }, [data, selectedYear]);

  // Sử dụng useMemo để tính toán options luôn, bất kể trạng thái loading hoặc error
  const options = useMemo(
    () => ({
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1000000,
            callback: (value: number) => formatMoney(value),
          },
        },
      },
      plugins: {
        legend: {
          position: "top" as const,
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const index = context.dataIndex;
              const month = context.label;
              const monthData = context.parsed.y;
              const weeklyIncomes = chartData.weeklyData[index] || [];

              const lines = [`${month}: ${formatMoney(monthData)}`];
              weeklyIncomes.forEach((week: any) => {
                lines.push(
                  `Tuần ${week.weekNumber}: ${formatMoney(week.income)}`
                );
              });
              return lines;
            },
          },
        },
      },
    }),
    [chartData]
  );

  return (
    <div className="p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Thu nhập hàng tháng</h2>
      <div className="mb-4">
        <label htmlFor="year-select" className="mr-2 font-medium">
          Chọn năm:
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="border w-32 border-gray-300 rounded p-2"
        >
          {Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading data.</div>
      ) : (
        <Bar className="p-5" data={chartData} options={options} />
      )}
    </div>
  );
};

export default IncomeBarChart;

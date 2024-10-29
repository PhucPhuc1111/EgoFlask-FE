import React from "react";

interface IncomeData {
  income: number;
  lastPeriod: number;
}

const incomeData: { [key: string]: IncomeData & { lastPeriod: number } } = {
  "Tháng này": { income: 100478392, lastPeriod: 97525931 },
  "Năm này": { income: 1205478392, lastPeriod: 1152259311 },
  "Ngày này": { income: 25478392, lastPeriod: 25725931 },
};

interface IncomeDisplayProps {
  income?: number;
  lastincome?: number;
  isLoading?: boolean;
  select?: string;
}

const IncomeDisplay: React.FC<IncomeDisplayProps> = ({
  income,
  lastincome,
  select,
  isLoading,
}) => {
  const selectedTimeframe = select;

  const displayIncome = income ?? 0;
  const lastPeriodIncome = lastincome ?? 0;

  const incomeDifference = displayIncome - lastPeriodIncome;
  const incomePercentageChange =
    displayIncome === lastPeriodIncome
      ? "Bằng nhau"
      : lastPeriodIncome !== 0
      ? `${((incomeDifference / lastPeriodIncome) * 100).toFixed(2)}%`
      : "0%";

  const isIncrease = incomeDifference > 0;

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Doanh thu nhận được </div>
        <span
          className={`text-sm font-semibold ${
            displayIncome === lastPeriodIncome
              ? "text-gray-600"
              : isIncrease
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {displayIncome === lastPeriodIncome
            ? "Bằng nhau"
            : isIncrease
            ? `Tăng ${incomePercentageChange}`
            : `Giảm ${incomePercentageChange}`}
        </span>
      </div>

      <div className="text-3xl text-blue-600 font-bold">
        {isLoading ? "Loading..." : `${displayIncome.toLocaleString()} đ`}
      </div>
      <div className="text-black">
        {selectedTimeframe === "Month"
          ? `Tháng trước: ${lastPeriodIncome.toLocaleString()} đ`
          : selectedTimeframe === "Year"
          ? `Năm trước: ${lastPeriodIncome.toLocaleString()} đ`
          : selectedTimeframe === "Day"
          ? `Hôm qua: ${lastPeriodIncome.toLocaleString()} đ`
          : selectedTimeframe === "Week"
          ? `Tuần trước: ${lastPeriodIncome.toLocaleString()} đ`
          : `Toàn bộ: ${lastPeriodIncome.toLocaleString()} đ`}
      </div>
    </div>
  );
};

export default IncomeDisplay;

import React, { useState } from "react";

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
  isLoading?: boolean;
}

const IncomeDisplay: React.FC<IncomeDisplayProps> = ({ income, isLoading }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Tháng này");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

  const displayIncome = income ?? incomeData[selectedTimeframe].income;
  const lastPeriodIncome = incomeData[selectedTimeframe].lastPeriod;

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Doanh thu nhận được </div>
        <select
          value={selectedTimeframe}
          onChange={handleChange}
          className="bg-[#f7f7f7] border-none ring-0 focus:ring-0 focus:outline-none  "
        >
          <option value="Ngày này">Ngày này</option>
          <option value="Tháng này">Tháng này</option>
          <option value="Năm này">Năm này</option>
        </select>
      </div>

      <div className="text-3xl text-blue-600 font-bold">
        {isLoading ? "Loading..." : `${displayIncome.toLocaleString()} đ`}
      </div>
      <div className="text-black">
        {selectedTimeframe === "Tháng này"
          ? `Tháng trước: ${lastPeriodIncome.toLocaleString()} đ`
          : selectedTimeframe === "Năm này"
          ? `Năm trước: ${lastPeriodIncome.toLocaleString()} đ`
          : `Hôm qua: ${lastPeriodIncome.toLocaleString()} đ`}
      </div>
    </div>
  );
};

export default IncomeDisplay;

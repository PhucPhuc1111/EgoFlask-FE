import React, { useState } from "react";

interface CommissionData {
  commission: number;
  lastPeriod: number; 
}

const commissionData: { [key: string]: CommissionData & { lastPeriod: number } } = {
  "Tháng này": { commission: 153826, lastPeriod: 100784 }, 
  "Năm này": { commission: 1205478392, lastPeriod: 1152259311 },
  "Ngày này": { commission: 25478392, lastPeriod: 25725931 }, 
};

interface CommissionDisplayProps {
  commission?: number;
  isLoading?: boolean;
}

const CommissionDisplay: React.FC<CommissionDisplayProps> = ({ commission, isLoading }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Tháng này");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

  const displayCommission = commission ?? commissionData[selectedTimeframe].commission;
  const lastPeriodCommission = commissionData[selectedTimeframe].lastPeriod;

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className=" text-black font-semibold">Hoa hồng nhận được</div>
        <select
          value={selectedTimeframe}
          onChange={handleChange}
          className="bg-[#f7f7f7] border-none ring-0 focus:ring-0 focus:outline-none relative"
        >
          <option value="Ngày này">Ngày này</option>
          <option value="Tháng này">Tháng này</option>
          <option value="Năm này">Năm này</option>
        </select>
      </div>

      <div className="text-3xl text-blue-600 font-bold">
        {isLoading ? "Loading..." : `${displayCommission.toLocaleString()}`}
      </div>
      <div className="text-black">
        {selectedTimeframe === "Tháng này"
          ? `Tháng trước: ${lastPeriodCommission.toLocaleString()} % `
          : selectedTimeframe === "Năm này"
          ? `Năm trước: ${lastPeriodCommission.toLocaleString()} % `
          : `Hôm qua: ${lastPeriodCommission.toLocaleString()} % `}
      </div>
    </div>
  );
};

export default CommissionDisplay;

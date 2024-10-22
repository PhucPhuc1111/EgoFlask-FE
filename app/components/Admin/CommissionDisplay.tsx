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
  commissionYesterday?: number;
  isLoading?: boolean;
  select?: string;
}

const CommissionDisplay: React.FC<CommissionDisplayProps> = ({ commission, commissionYesterday, isLoading, select }) => {
  const selectedTimeframe = select ?? "Tháng này";

  const displayCommission = commission ?? 0;
  const lastPeriodCommission = commissionYesterday ?? 0;

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className=" text-black font-semibold">Hoa hồng nhận được</div>
      </div>

      <div className="text-3xl text-blue-600 font-bold">
        {isLoading ? "Loading..." : `${displayCommission.toLocaleString()}`}
      </div>
      <div className="text-black">
        {selectedTimeframe === "Month"
          ? `Tháng trước: ${lastPeriodCommission.toLocaleString()}  `
          : selectedTimeframe === "Year"
          ? `Năm trước: ${lastPeriodCommission.toLocaleString()}  `
          : selectedTimeframe === "Day" 
          ? `Hôm qua: ${lastPeriodCommission.toLocaleString()} ` : `Toàn bộ: ${lastPeriodCommission.toLocaleString()} `}
      </div>
    </div>
  );
};

export default CommissionDisplay;

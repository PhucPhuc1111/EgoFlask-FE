import React from "react";

interface CommissionData {
  commission: number;
  lastPeriod: number;
}

const commissionData: {
  [key: string]: CommissionData & { lastPeriod: number };
} = {
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

const CommissionDisplay: React.FC<CommissionDisplayProps> = ({
  commission,
  commissionYesterday,
  isLoading,
  select,
}) => {
  // Ensuring that the selected timeframe exists in the commissionData object
  const selectedTimeframe = select;

  const displayCommission = commission ?? 0;
  const lastPeriodCommission = commissionYesterday ?? 0;

  if (displayCommission === undefined || lastPeriodCommission === undefined) {
    console.error(
      "Invalid timeframe selected or data is missing:",
      selectedTimeframe
    );
    return <div>Invalid data</div>; // Handling cases where data is not available
  }

  const commissionDifference = displayCommission - lastPeriodCommission;
  const commissionPercentageChange =
    lastPeriodCommission !== 0
      ? `${((commissionDifference / lastPeriodCommission) * 100).toFixed(2)}%`
      : "0%"; // Handling the case when lastPeriodCommission is zero to avoid division by zero.

  const isIncrease = commissionDifference > 0;

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Hoa hồng nhận được</div>
        <span
          className={`text-sm font-semibold ${
            displayCommission === lastPeriodCommission
              ? "text-gray-600"
              : isIncrease
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {displayCommission === lastPeriodCommission
            ? "Bằng nhau"
            : isIncrease
            ? `Tăng ${commissionPercentageChange}`
            : `Giảm ${commissionPercentageChange}`}
        </span>
      </div>

      <div className="text-3xl text-blue-600 font-bold">
        {isLoading ? "Loading..." : `${displayCommission.toLocaleString()} đ`}
      </div>
      <div className="text-black">
        {selectedTimeframe === "Month"
          ? `Tháng trước: ${lastPeriodCommission.toLocaleString()} đ`
          : selectedTimeframe === "Year"
          ? `Năm trước: ${lastPeriodCommission.toLocaleString()} đ`
          : selectedTimeframe === "Day"
          ? `Hôm qua: ${lastPeriodCommission.toLocaleString()} đ`
          : selectedTimeframe === "Week"
          ? `Tuần trước: ${lastPeriodCommission.toLocaleString()} đ`
          : `Toàn bộ: ${lastPeriodCommission.toLocaleString()} đ`}
      </div>
    </div>
  );
};

export default CommissionDisplay;

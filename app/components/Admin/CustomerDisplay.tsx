import React from "react";

interface CustomerDisplayProps {
  totalCustomers?: number;
  totalCustomersYesterday?: number;
  isLoading?: boolean;
  select?: string;
}

const CustomerDisplay: React.FC<CustomerDisplayProps> = ({
  totalCustomers,
  totalCustomersYesterday,
  isLoading,
  select,
}) => {
  const selectedTimeframe = select;
  const displayCustomers = totalCustomers ?? 0;
  const lastPeriodCustomers = totalCustomersYesterday ?? 0;

  const customersDifference = displayCustomers - lastPeriodCustomers;
  const customersPercentageChange =
    displayCustomers === lastPeriodCustomers
      ? "Bằng nhau"
      : lastPeriodCustomers !== 0
      ? `${((customersDifference / lastPeriodCustomers) * 100).toFixed(2)}%`
      : "0%"; // Handles the case when lastPeriodCustomers is zero to avoid division by zero.

  const isIncrease = customersDifference > 0;

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Khách hàng</div>
        <span
          className={`text-sm font-semibold ${
            displayCustomers === lastPeriodCustomers
              ? "text-gray-600"
              : isIncrease
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {displayCustomers === lastPeriodCustomers
            ? "Bằng nhau"
            : isIncrease
            ? `Tăng ${customersPercentageChange}`
            : `Giảm ${customersPercentageChange}`}
        </span>
      </div>

      <div className="text-3xl text-blue-600 font-bold">
        {isLoading ? "Loading..." : `${displayCustomers.toLocaleString()} `}
      </div>
      <div className="text-black">
        {selectedTimeframe === "Month"
          ? `Tháng trước: ${totalCustomersYesterday?.toLocaleString()}`
          : selectedTimeframe === "Year"
          ? `Năm trước: ${totalCustomersYesterday?.toLocaleString()}`
          : selectedTimeframe === "Day"
          ? `Hôm qua: ${totalCustomersYesterday?.toLocaleString()}`
          : selectedTimeframe === "Week"
          ? `Tuần trước: ${totalCustomersYesterday?.toLocaleString()}`
          : `Toàn bộ: ${totalCustomersYesterday?.toLocaleString()}`}
      </div>
    </div>
  );
};

export default CustomerDisplay;

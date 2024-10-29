import React, { useState } from "react";

interface CustomerData {
  customer: number;
  lastPeriod: number;
}

const customerData: { [key: string]: CustomerData & { lastPeriod: number } } = {
  "Tháng này": { customer: 9, lastPeriod: 9 },
  "Năm này": { customer: 9, lastPeriod: 9 },
  "Ngày này": { customer: 9, lastPeriod: 9 },
};

interface CustomerDisplayProps {
  totalCustomers?: number;
  isLoading?: boolean;
}

const CustomerDisplay: React.FC<CustomerDisplayProps> = ({
  totalCustomers,
  isLoading,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<string>("Tháng này");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

  // This needs to use different properties for current and last period
  const displayCustomers =
    totalCustomers ?? customerData[selectedTimeframe].customer;
  const lastPeriodCustomers = customerData[selectedTimeframe].lastPeriod;

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
        Tháng trước: {lastPeriodCustomers.toLocaleString()}
      </div>
    </div>
  );
};

export default CustomerDisplay;

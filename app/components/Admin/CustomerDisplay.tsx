import React, { useState } from "react";

interface CustomerData {
  customer: number;
  lastPeriod: number; 
}

const customerData: { [key: string]: CustomerData & { lastPeriod: number } } = {
  "Tháng này": { customer: 9, lastPeriod: 9 }, 
  "Năm này": { customer: 9, lastPeriod: 9 }, 
  "Ngày này": { customer: 9, lastPeriod: 9}, 
};

interface CustomerDisplayProps {
  totalCustomers?: number;
  isLoading?: boolean;
}

const CustomerDisplay: React.FC<CustomerDisplayProps> = ({ totalCustomers, isLoading }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Tháng này");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

  const displayCustomers = totalCustomers ?? customerData[selectedTimeframe].customer;
  const lastPeriodCustomers = customerData[selectedTimeframe].lastPeriod;

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Khách hàng</div>
      </div>

      <div className="text-3xl text-blue-600 font-bold">
        {isLoading ? "Loading..." : `${displayCustomers.toLocaleString()} `}
      </div>
      <div className="text-black">
        {selectedTimeframe === "Month"
          ? `Tháng trước: ${lastPeriodCustomers.toLocaleString()} `
          : selectedTimeframe === "Year"
          ? `Năm trước: ${lastPeriodCustomers.toLocaleString()} `
          : selectedTimeframe === "Day"
          ? `Hôm qua: ${lastPeriodCustomers.toLocaleString()} `
          : `Toàn bộ: ${lastPeriodCustomers.toLocaleString()} `}
      </div>
    </div>
  );
};

export default CustomerDisplay;

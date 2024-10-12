import React, { useState } from "react";

interface CustomerData {
  customer: number;
  lastPeriod: number; 
}

const customerData: { [key: string]: CustomerData & { lastPeriod: number } } = {
  "Tháng này": { customer: 204351, lastPeriod: 97525931 }, 
  "Năm này": { customer: 1205478392, lastPeriod: 1152259311 }, 
  "Ngày này": { customer: 25478392, lastPeriod: 25725931 }, 
};

const CustomerDisplay: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Tháng này");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Khách hàng</div>
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
        {customerData[selectedTimeframe].customer.toLocaleString()} 
      </div>
      <div className="text-black">
        {selectedTimeframe === "Tháng này"
          ? `Tháng trước: ${customerData["Tháng này"].lastPeriod.toLocaleString()} đ`
          : selectedTimeframe === "Năm này"
          ? `Năm trước: ${customerData["Năm này"].lastPeriod.toLocaleString()} đ`
          : `Hôm qua: ${customerData["Ngày này"].lastPeriod.toLocaleString()} đ`}
      </div>
    </div>
  );
};

export default CustomerDisplay;

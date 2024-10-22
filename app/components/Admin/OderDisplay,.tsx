import React, { useState } from "react";

interface OrderData {
  order: number;
  lastPeriod: number; 
}

const orderData: { [key: string]: OrderData & { lastPeriod: number } } = {
  "Tháng này": { order: 153826, lastPeriod: 100784 }, 
  "Năm này": { order: 1205478392, lastPeriod: 1152259311 }, 
  "Ngày này": { order: 25478392, lastPeriod: 25725931 }, 
};

interface OrderDisplayProps {
  totalOrders?: number;
  isLoading?: boolean;
}

const OrderDisplay: React.FC<OrderDisplayProps> = ({ totalOrders, isLoading }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Tháng này");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

  const displayOrders = totalOrders ?? orderData[selectedTimeframe].order;
  const lastPeriodOrders = orderData[selectedTimeframe].lastPeriod;

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Đơn hàng</div>
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
        {isLoading ? "Loading..." : `${displayOrders.toLocaleString()}`}
      </div>
      <div className="text-black">
        {selectedTimeframe === "Tháng này"
          ? `Tháng trước: ${lastPeriodOrders.toLocaleString()}`
          : selectedTimeframe === "Năm này"
          ? `Năm trước: ${lastPeriodOrders.toLocaleString()}`
          : `Hôm qua: ${lastPeriodOrders.toLocaleString()}`}
      </div>
    </div>
  );
};

export default OrderDisplay;

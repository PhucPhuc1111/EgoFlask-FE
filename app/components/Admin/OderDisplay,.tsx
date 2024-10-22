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
  totalOrdersyesterday?: number;
  isLoading?: boolean;
  select?: string;
}

const OrderDisplay: React.FC<OrderDisplayProps> = ({ totalOrders, totalOrdersyesterday, isLoading, select }) => {
  const selectedTimeframe = select ?? "Tháng này";

  const displayOrders = totalOrders ?? 0;
  const lastPeriodOrders = totalOrdersyesterday ?? 0;

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Đơn hàng</div>
      </div>

      <div className="text-3xl text-blue-600 font-bold">
        {isLoading ? "Loading..." : `${displayOrders.toLocaleString()}`}
      </div>
      <div className="text-black">
        {selectedTimeframe === "Month"
          ? `Tháng trước: ${lastPeriodOrders.toLocaleString()}`
          : selectedTimeframe === "Year"
          ? `Năm trước: ${lastPeriodOrders.toLocaleString()}`
          : selectedTimeframe === "Day" ? `Hôm qua: ${lastPeriodOrders.toLocaleString()}` : `Toàn bộ: ${lastPeriodOrders.toLocaleString()}`}
      </div>
    </div>
  );
};

export default OrderDisplay;

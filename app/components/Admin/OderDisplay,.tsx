import React, { useState } from "react";

interface OrderData {
  order: number;
  lastPeriod: number; // Đổi tên thuộc tính này thành lastPeriod
}

const orderData: { [key: string]: OrderData & { lastPeriod: number } } = {
  "Tháng này": { order: 153826, lastPeriod: 100784 }, // lastPeriod là tháng trước
  "Năm này": { order: 1205478392, lastPeriod: 1152259311 }, // lastPeriod là năm trước
  "Ngày này": { order: 25478392, lastPeriod: 25725931 }, // lastPeriod là hôm qua
};

const OrderDisplay: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Tháng này");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

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
        {orderData[selectedTimeframe].order.toLocaleString()} 
      </div>
      <div className="text-black">
        {selectedTimeframe === "Tháng này"
          ? `Tháng trước: ${orderData["Tháng này"].lastPeriod.toLocaleString()} đ`
          : selectedTimeframe === "Năm này"
          ? `Năm trước: ${orderData["Năm này"].lastPeriod.toLocaleString()} đ`
          : `Hôm qua: ${orderData["Ngày này"].lastPeriod.toLocaleString()} đ`}
      </div>
    </div>
  );
};

export default OrderDisplay;

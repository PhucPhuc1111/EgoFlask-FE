import React, { useState } from "react";

interface ProductData {
  product: number;
  lastPeriod: number; 
}

const productData: { [key: string]: ProductData & { lastPeriod: number } } = {
  "Tháng này": { product: 204351, lastPeriod: 97525931 }, 
  "Năm này": { product: 1205478392, lastPeriod: 1152259311 }, 
  "Ngày này": { product: 25478392, lastPeriod: 25725931 }, 
};

const ProductDisplay: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Tháng này");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Sản phẩm bán ra</div>
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
        {productData[selectedTimeframe].product.toLocaleString()} 
      </div>
      <div className="text-black">
        {selectedTimeframe === "Tháng này"
          ? `Tháng trước: ${productData["Tháng này"].lastPeriod.toLocaleString()} `
          : selectedTimeframe === "Năm này"
          ? `Năm trước: ${productData["Năm này"].lastPeriod.toLocaleString()} `
          : `Hôm qua: ${productData["Ngày này"].lastPeriod.toLocaleString()} `}
      </div>
    </div>
  );
};

export default ProductDisplay;

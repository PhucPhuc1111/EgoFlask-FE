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

interface ProductDisplayProps {
  totalProductsSold?: number;
  totalProductsSoldYesterday?: number;
  isLoading?: boolean;
  select?: string;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({
  totalProductsSold,
  totalProductsSoldYesterday,
  isLoading,
  select,
}) => {
  // Ensure that the selected timeframe exists in the productData object
  const selectedTimeframe = select;

  const displayProducts = totalProductsSold ?? 0;
  const lastPeriodProducts = totalProductsSoldYesterday ?? 0;

  const productsDifference = displayProducts - lastPeriodProducts;
  const productsPercentageChange =
    lastPeriodProducts !== 0
      ? `${((productsDifference / lastPeriodProducts) * 100).toFixed(2)}%`
      : "0%"; // Handling the case when lastPeriodProducts is zero to avoid division by zero.

  const isIncrease = productsDifference > 0;

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Sản phẩm bán ra</div>
        <span
          className={`text-sm font-semibold ${
            displayProducts === lastPeriodProducts
              ? "text-gray-600"
              : isIncrease
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {displayProducts === lastPeriodProducts
            ? "Bằng nhau"
            : isIncrease
            ? `Tăng ${productsPercentageChange}`
            : `Giảm ${productsPercentageChange}`}
        </span>
      </div>

      <div className="text-3xl text-blue-600 font-bold">
        {isLoading ? "Loading..." : `${displayProducts.toLocaleString()}`}
      </div>
      <div className="text-black">
        {selectedTimeframe === "Month"
          ? `Tháng trước: ${lastPeriodProducts.toLocaleString()}`
          : selectedTimeframe === "Year"
          ? `Năm trước: ${lastPeriodProducts.toLocaleString()}`
          : selectedTimeframe === "Day"
          ? `Hôm qua: ${lastPeriodProducts.toLocaleString()}`
          : selectedTimeframe === "Week"
          ? `Tuần trước: ${lastPeriodProducts.toLocaleString()}`
          : `Toàn bộ: ${lastPeriodProducts.toLocaleString()} `}
      </div>
    </div>
  );
};

export default ProductDisplay;

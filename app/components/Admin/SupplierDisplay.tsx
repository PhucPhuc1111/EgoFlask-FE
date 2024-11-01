import React from "react";

interface SupplierDisplay {
  totalSupliers?: number;
  isLoading: boolean;
}

const SupplierDisplay: React.FC<SupplierDisplay> = ({
  totalSupliers,
  isLoading,
}) => {
  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Nhà cung cấp</div>
      </div>

      <div className="text-3xl text-blue-600 font-bold">
        {isLoading ? "Loading..." : `${totalSupliers?.toLocaleString()}`}
      </div>
    </div>
  );
};

export default SupplierDisplay;

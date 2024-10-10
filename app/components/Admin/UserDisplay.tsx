import React, { useState } from "react";

interface UserData {
  user: number;
  lastPeriod: number; // Đổi tên thuộc tính này thành lastPeriod
}

const userData: { [key: string]: UserData & { lastPeriod: number } } = {
  "Tháng này": { user: 153826, lastPeriod: 100784 }, // lastPeriod là tháng trước
  "Năm này": { user: 1205478392, lastPeriod: 1152259311 }, // lastPeriod là năm trước
  "Ngày này": { user: 25478392, lastPeriod: 25725931 }, // lastPeriod là hôm qua
};

const UserDisplay: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Tháng này");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className=" text-black font-semibold">Người dùng</div>
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
        {userData[selectedTimeframe].user.toLocaleString()}
      </div>
      <div className="text-black">
        {selectedTimeframe === "Tháng này"
          ? `Tháng trước: ${userData["Tháng này"].lastPeriod.toLocaleString()} đ`
          : selectedTimeframe === "Năm này"
          ? `Năm trước: ${userData["Năm này"].lastPeriod.toLocaleString()} đ`
          : `Hôm qua: ${userData["Ngày này"].lastPeriod.toLocaleString()} đ`}
      </div>
    </div>
  );
};

export default UserDisplay;

import React, { useState } from "react";

interface WebsiteData {
  website: number;
  lastPeriod: number; 
}

const websiteData: { [key: string]: WebsiteData & { lastPeriod: number } } = {
  "Tháng này": { website: 89320, lastPeriod: 97525931 }, 
  "Năm này": { website: 1205478392, lastPeriod: 1152259311 }, 
  "Ngày này": { website: 25478392, lastPeriod: 25725931 }, 
};

interface WebsiteDisplayProps {
  onWebsiteDataChange: (data: number) => void; 
  visitors?: number;
  isLoading?: boolean;
}

const WebsiteDisplay: React.FC<WebsiteDisplayProps> = ({ onWebsiteDataChange, visitors, isLoading }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Tháng này");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
    onWebsiteDataChange(websiteData[e.target.value].website);
  };

  const displayWebsiteVisits = visitors ?? websiteData[selectedTimeframe].website;
  const lastPeriodVisits = websiteData[selectedTimeframe].lastPeriod;

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Website visits</div>
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
        {isLoading ? "Loading..." : `${displayWebsiteVisits.toLocaleString()}`}
      </div>
      <div className="text-black">
        {selectedTimeframe === "Tháng này"
          ? `Tháng trước: ${lastPeriodVisits.toLocaleString()}`
          : selectedTimeframe === "Năm này"
          ? `Năm trước: ${lastPeriodVisits.toLocaleString()}`
          : `Hôm qua: ${lastPeriodVisits.toLocaleString()}`}
      </div>
    </div>
  );
};

export default WebsiteDisplay;

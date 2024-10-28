import React, { useState } from "react";

interface WebsiteData {
  website: number;
  lastPeriod: number;
}

const websiteData: { [key: string]: WebsiteData & { lastPeriod: number } } = {
  "Tháng này": { website: 50, lastPeriod: 36 },
  "Năm này": { website: 125, lastPeriod: 0 },
  "Ngày này": { website: 5, lastPeriod: 20 },
};

interface WebsiteDisplayProps {
  onWebsiteDataChange: (data: number) => void;
  visitors?: number;
  isLoading?: boolean;
}

const WebsiteDisplay: React.FC<WebsiteDisplayProps> = ({
  onWebsiteDataChange,
  visitors,
  isLoading,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<string>("Tháng này");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
    onWebsiteDataChange(websiteData[e.target.value].website);
  };

  const displayWebsiteVisits =
    visitors ?? websiteData[selectedTimeframe].website;
  const lastPeriodVisits =
    visitors ?? websiteData[selectedTimeframe].lastPeriod;

  return (
    <div className="p-4 font-sans border-2 rounded-2xl bg-[#f7f7f7] space-y-3 w-72 h-40 ">
      <div className="flex items-center justify-between ">
        <div className="text-black font-semibold">Website visits</div>
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

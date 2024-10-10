import { useState } from "react";
import IncomeBarChart from "~/components/Admin/IncomeBarChart";
import IncomeDisplay from "~/components/Admin/IncomeDisplay";
import OrderDisplay from "~/components/Admin/OderDisplay,";
import ProductDisplay from "~/components/Admin/ProductDisplay";
import UserDisplay from "~/components/Admin/UserDisplay";
import WebsiteDisplay from "~/components/Admin/WebsiteDisplay";
import WebsiteVisitsChart from "~/components/Admin/WebsiteVisitsChart";

export const handle = {
  hideHeader: true,
  hideFooter: true,
};

export default function AdminDashboard() {
  const [websiteData, setWebsiteData] = useState<number>(89320); 
  return (
    <main className="flex-1 pt-32 pb-10 max-h-screen overflow-auto ">
      
      <div className="flex space-x-3 px-2">
        <div className="w-1/2  ">
        <p className="text-black text-lg font-bold p-3">Tổng quan</p>
          <div className="flex ">
            <div>
            <div className="p-2">
              <IncomeDisplay />
            </div>
            <div className="p-2">
              <OrderDisplay />
            </div>
            <div className="p-2">
            <WebsiteDisplay onWebsiteDataChange={setWebsiteData} /> 
            </div></div>
          

          <div>
          <div className="p-2">
              <UserDisplay />
            </div>
            <div className="p-2">
              <ProductDisplay />
            </div>
          </div>
          </div>
        </div>
        <div className="w-1/2 ">
        <div className="py-2">
        <WebsiteVisitsChart websiteData={websiteData} />
        </div>
        <div className="">
             <IncomeBarChart/>  
        </div>
   
        </div>
      </div>
    </main>
  );
}

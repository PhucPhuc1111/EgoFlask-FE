import { useState } from "react";
import { useGetDashboardData } from "../data/admin";
import { useGetProfile } from "~/data";
import CustomerDisplay from "~/components/Admin/CustomerDisplay";
import IncomeBarChart from "~/components/Admin/IncomeBarChart";
import IncomeDisplay from "~/components/Admin/IncomeDisplay";
import OrderDisplay from "~/components/Admin/OderDisplay,";
import WebsiteDisplay from "~/components/Admin/WebsiteDisplay";
import CommissionDisplay from "~/components/Admin/CommissionDisplay";
import SupplierDisplay from "~/components/Admin/SupplierDisplay";

export const handle = {
  hideHeader: true,
  hideFooter: true,
};

export default function AdminDashboard() {
  const { data: profile, isLoading: profileLoading, isError } = useGetProfile();
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Day");
  const token = profile?.user?.token;
  const { data: dashboardData, isLoading } = useGetDashboardData(
    token || "",
    selectedTimeframe
  );

  const handleTimeframeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

  return (
    <main className="flex-1 pt-32 pb-10 max-h-screen overflow-auto ">
      <div className="flex max-2xl:flex-col space-x-3 px-2">
        <div className="w-1/2">
          <p className="text-black text-lg font-bold p-3">Tổng quan</p>
          <select
            value={selectedTimeframe}
            onChange={handleTimeframeChange}
            className="bg-[#f7f7f7] border-none ring-0 focus:ring-0 focus:outline-none ml-2"
          >
            <option value="Day">Hôm nay</option>
            <option value="Week">Tuần này</option>
            <option value="Month">Tháng này</option>
            <option value="Year">Năm nay</option>
            <option value="AllTime">Toàn bộ</option>
          </select>
          <div className="flex ">
            <div>
              <div className="p-2">
                <IncomeDisplay
                  income={dashboardData?.revenue}
                  lastincome={dashboardData?.revenueYesterday}
                  select={selectedTimeframe}
                  isLoading={isLoading}
                />
              </div>
              <div className="p-2">
                <OrderDisplay
                  totalOrders={dashboardData?.totalOrders}
                  totalOrdersyesterday={dashboardData?.totalOrdersYesterday}
                  select={selectedTimeframe}
                  isLoading={isLoading}
                />
              </div>
              <div className="p-2">
                <WebsiteDisplay
                  visitors={dashboardData?.visiter}
                  isLoading={isLoading}
                />
              </div>
            </div>
            <div>
              <div className="p-2">
                <CommissionDisplay
                  commission={dashboardData?.commission}
                  commissionYesterday={dashboardData?.commissionYesterday}
                  select={selectedTimeframe}
                  isLoading={isLoading}
                />
              </div>
              <div className="p-2">
                <CustomerDisplay
                  totalCustomers={dashboardData?.totalCustomer}
                  totalCustomersYesterday={
                    dashboardData?.totalCustomerYesterday
                  }
                  isLoading={isLoading}
                  select={selectedTimeframe}
                />
              </div>
              <div className="p-2">
                <SupplierDisplay
                  totalSupliers={dashboardData?.totalSupplier}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-auto">
          <div className="py-2 pt-28 w-full h-auto">
            <IncomeBarChart />
          </div>
        </div>
      </div>
    </main>
  );
}

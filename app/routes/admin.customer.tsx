import React, { useEffect, useState } from "react";
import { useGetProfile, getAllAccount, Account } from "~/data";
import { Link } from "@remix-run/react";
import { format } from "date-fns";



export const handle = {
  hideHeader: true,
  hideFooter: true,
};

export default function AdminCustomer() {
  const { data: profile, isLoading, isError } = useGetProfile();
  const [customerList, setCustomerList] = useState<Account[]>([]); 

  useEffect(() => {
    const fetchAccounts = async () => {
      if (profile?.user?.token) {
        try {
          console.log("Token:", profile.user.token);
          const accounts = await getAllAccount(profile.user.token, 1, 10);
          setCustomerList(accounts);
        } catch (error) {
          console.error("Failed to fetch accounts:", error);
        }
      } else {
        console.warn("No token available.");
      }
    };

    if (!isLoading && !isError) {
      fetchAccounts();
    }
  }, [profile, isLoading, isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading profile data.</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };

  return (
    <main className="flex-1 pt-32 pb-10 h-full max-h-screen overflow-auto px-8">
      <div className="my-9">
        <table className="w-full border-2">
          <thead className="bg-[#0055C3] text-white text-center border-2">
            <tr>
              <th className="border-2 border-[#0055C3]">#ID</th>
              <th className="border-2 border-[#0055C3]">Tên</th>
              <th className="border-2 border-[#0055C3]">Email</th>
              <th className="border-2 border-[#0055C3]">Ngày tạo</th>
              <th className="border-2 border-[#0055C3]">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="text-black text-center border-2">
            {customerList.map((customer) => (
              <tr key={customer.accountId}>
                <th className="border-2 border-[#0055C3] py-3">#{customer.accountId}</th>
                <td className="border-2 border-[#0055C3]">{customer.name}</td>
                <td className="border-2 border-[#0055C3]">{customer.email}</td>
                <td className="border-2 border-[#0055C3]">{formatDate(customer.createAt)}</td>
                <td className="border-2 border-[#0055C3]">
                  <Link to={`/admin/customer/${customer.accountId}`}>
                    <button className="border rounded-md w-24 h-8 bg-[#0055C3] text-white hover:bg-white hover:text-[#0055C3]">
                      Chi tiết
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
